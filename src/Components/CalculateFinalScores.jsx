import { map } from "async";
import React from "react";
import { connect } from "react-redux";
import './CalculateFinalScores.css'
import WeaponCard from "../WeaponCard";
import { weapons, weaponList, allWeapons, armorData } from "../reference/equipment-data";
import FinalAbilityScores from "./FinalAbilityScores";
import FancyAbilityScores from "./FancyAbilityScores";
import { select, selectAll } from "d3";

import { allSkills as skillsBank } from "../Skills";
import { weapons as weaponsData }  from "../reference/equipment-data";


const armorTypes = Object.keys(armorData);

const defaultWeapon = {
    name: "club",
    cost: 0.1,
    baseDamage: "1d4",
    type: "bludgeoning",
    weight: 2,
    properties: ["light"]
}

class CalculateFinalScores extends React.Component {
    constructor(props){
        super(props);
        this.state={
            hidden: false,
            proficiencyBonus: this.props.state.classDetails.proficiencyBonus || 0,
            PP: 0,
            HD: '',
            HP: undefined,
            AC: undefined,
            armor: undefined,
            armorType: 'No armor',
            shield: false,
            statMods: [...this.props.state.baseStats.modifiers[0]] || [],

            equipment: [...this.props.state.equipment] || [],
            weapons: [],
            attacks: [],
            
            
            resistances: this.props.state.resistances,
        }
    }

    componentDidMount(){
        this.loadComponent();
    }

    componentDidUpdate(){
    }

    loadComponent = () => {
        this.findWeapons()
        this.findArmor()
        this.checkSkills()
        this.checkSaves()
        this.calculatePP()
    }
    // FIND WEAPONS IN EQUIPMENT
    findWeapons = () => {
        let allEquipment = this.props.state.equipment;
        let weapons = []
        for (let i=0; i<allEquipment.length; i++) {
            if (weaponList.includes(allEquipment[i])) {
                let obj = allWeapons[allEquipment[i]]
                weapons.push(obj)
            } else if (allEquipment[i].match(/handaxe/)) {
                weapons.push(allWeapons["handaxe"])
            } else if (allEquipment[i].match(/dagger/)) {
                let obj = allWeapons["dagger"];
                weapons.push(obj)
            } else if(allEquipment[i].match(/shortsword/)) {
                weapons.push(allWeapons["shortsword"])
            } else if (allEquipment[i].match(/javelin/)) {
                weapons.push(allWeapons["javelin"])
            } else if (allEquipment[i].match(/longbow/)) {
                weapons.push(allWeapons["longbow"])
            }
        }
        this.setState({weapons: weapons})
        this.removeDuplicateWeapons(weapons)
    }
    //REMOVE DUPLICATES
    removeDuplicateWeapons = (weapons) => {
        let arr1 = [...this.props.weapons, ...weapons]
        let finalNames = [];
        let arr1Names = arr1.map(e=>e.name)

        for (let i=0; i<arr1Names.length; i++) {
            if (!finalNames.includes(arr1Names[i])) {
                finalNames.push(arr1Names[i])
            }
        }
        let final = [];
        for (let i=0; i<finalNames.length; i++) {
            final.push(allWeapons[finalNames[i]])
        }
        this.props.updateWeapons(final)
        this.loadAttacks(final)
    }
    // GET WEAPON STATS
    loadAttacks = (weapons) => {
        const meleeWeapons = Object.keys(weaponsData["simple melee"]).concat(Object.keys(weaponsData["martial melee"]))
        const rangedWeapons = Object.keys(weaponsData["simple ranged"]).concat(Object.keys(weaponsData["martial ranged"]))
        
        //console.log("WEAPONS: ", this.props.weapons)
        let attacks = []
        weapons.forEach(weapon => {

            // range?
            // ability score?
            // NAME, ATTACK BONUS, DAMAGE/TYPE
            let ability = '';
            let abilityMod = 0;
            let range = weapon.properties.join(" ").match(/(range \d+\/\d+)/g) ?? "melee";
            let miscAttackBonus = 0;
            let miscDamageBonus = 0;

            
            if (meleeWeapons.includes(weapon.name)) {
                ability = 'STR'
                abilityMod = this.props.abilityMods[0]
                if (this.props.features.find(feature => feature.name === 'Dueling Fighting Style')) {
                    if (!weapon.properties.includes("two-handed")) {
                        miscDamageBonus = 2;
                    }
                }
                
            } else if (rangedWeapons.includes(weapon.name)) {
                ability = 'DEX'
                abilityMod = this.props.abilityMods[1]
                if (this.props.features.find(feature => feature.name === 'Archery Fighting Style')) {
                    if (!weapon.properties.find(prop => prop.match(/(thrown)/))) {
                        miscAttackBonus = 2;
                    }
                }
            }
            if (weapon.properties.includes("finesse")) {
                ability = 'DEX'
                abilityMod = this.props.abilityMods[1]
            }
            if (this.props.state.class[0][0] === 'Monk') {
                if ( Object.keys(weaponsData["simple melee"]).includes(weapon.name) && !weapon.properties.includes('two-handed') && !weapon.properties.includes('heavy')) {
                    ability = 'DEX';
                    abilityMod = this.props.abilityMods[1];
                }
            }

            let attackBonus = `+${this.props.proficiencyBonus + abilityMod + miscAttackBonus}`
            let damage = weapon.damage + `+${abilityMod + miscDamageBonus}`

            weapon = Object.assign({}, weapon, {
                type: weapon.type,
                ability: ability,
                abilityMod: abilityMod,
                range: range.toString(),
                attackBonus: attackBonus,
                damage: damage,
            })

            attacks.push(weapon)
        })
        this.setState({attacks: attacks})
        //console.log(this.state.attacks, attacks)
        return attacks
    }
    // FIND ARMOR IN EQUIPMENT
    findArmor = () => {
        let arr = [...this.props.state.equipment];
        let armor = [];
        for (let i=0; i<arr.length; i++) {
            if (armorTypes.includes(arr[i])) {
                if (arr[i] === "shield") {
                    this.setState({shield: true})
                } else {
                    armor.push(armorData[arr[i]])
                    this.setState({armorType: arr[i]})
                }
            }
        }
        //console.log("armor",armor)
         // v CHECK IF SHIELD CHANGE THIS V
        this.setState({armor: armor})
        this.props.updateArmor(armor)
        // ^ CHANGE TO CHECK FOR SHIELDS ^
        // UNARMORED DEFENSE
        if ( armor.length === 0 ) { 
            if (this.props.features.includes("Unarmored Defense")) {
                let AC = 10 + this.props.abilityMods[1] + this.props.abilityMods[2];
                //console.log("Unarmored Defense: ", AC)
                this.setState({AC: AC})
            }
            return
        }
        
        //console.log("calculate from",armor, this.props.state.baseStats.stats)
        this.calculateAC(armor, this.props.state.baseStats)
    }
    calculateAC = (armor, stats) => {
        const str = stats.stats[0]
        const dexMod = stats.modifiers[0][1]
        let strReq = 0;
        let maxBonus = 10;
        let shield = 0;
        let AC = 0;
        let base = armor[0]["AC"]["base"];
        let bonus = dexMod;
        let miscBonus = 0;
        //console.log("base",base, "str", str)

        if (this.props.features.find(feature => feature.name === 'Defense Fighting Style')) {
            miscBonus = 1;
        }

        if (armor[0].hasOwnProperty("stealth")) {
            //console.log("disadvantage on stealth")
            this.props.dispatchResistance("disadvantage on stealth")
        }
        if (armor[0]["AC"].hasOwnProperty("strReq")) {
            //console.log("has strength req: ", armor[0]["AC"]["strReq"], "My Strength: ", this.props.abilityMods[0])
            strReq = armor[0]["AC"]["strReq"]
        }
        if (armor[0]["AC"].hasOwnProperty("maxBonus")) {
            //console.log("max dex bonus: ", armor[0]["AC"]["maxBonus"])
            maxBonus = armor[0]["AC"]["maxBonus"]
        }
        if (this.state.shield === true) {
            //console.log("has shield")
            shield = 2;
        }
        if (maxBonus < dexMod) {
            //console.log("maxxed bonus", maxBonus)
            bonus = maxBonus
        }
        if (str >= strReq) {
            AC = base + bonus + miscBonus + shield
        }
        //console.log("ac", AC)
        this.setState({AC: AC})
    }
    calculatePP = () => {
        let base = this.props.state.baseStats.modifiers[0][4];
        let bonus = 0;
        if (this.props.state.skillProficiencies.proficiencies.includes("Perception (Wis)")) {
            bonus = this.props.state.classDetails.proficiencyBonus;
        }
        const PP = base + bonus;
        //console.log("base", base, "bonus", bonus)
        this.setState({PP: PP})
    }
    // GENERATE LIST OF FEATURES
    mapFeatures = () => {
        let arr = [...this.props.features]
        return arr.map((e, i)=><tr key={i}><td>{e}</td></tr>)
    }
    mapEquipment = () => {
        let arr = [...this.props.state.equipment];
        return arr.map((e, i)=><tr key={i}><td>{e}</td></tr>)
    }
    mapResistances = () => {
        let arr = [...this.state.resistances];
        return arr.map((e, i)=><tr key={i}><td>{e}</td></tr>)
    }
    checkSkills = () => {
        let arr = [...this.props.state.skillProficiencies.proficiencies];
        for (let i=0; i<arr.length; i++) {
            document.querySelector(`#radio-${arr[i].match(/(\w+)/)[0]}`)
                .className = "pi pi-check-circle";
        }
        if (this.state.shield === true) {
            document.querySelector("#shield-radio")
                .className = "pi pi-check-circle";
        }
    }

    checkSaves = () => {
        let arr = [...this.props.state.savingThrows.proficient];
        for (let i=0; i<arr.length; i++) {
            document.getElementById("radio-"+arr[i])
                .className = "pi pi-check-circle"
        }
    }
    toggleFeatureDetails = (id) => {
        const details = select(`#details-${id}`);
        //console.log(details)
        let display = details.style("display");
        if (display === 'none' ) {
            console.log("un hiding", details)
            details.style("display", "block")
        }
        else {
            details.style("display", "none")
        }
    }
    render(){
        //console.log("LOCAL STATE CHAR SHEET: ", this.state, "SKILLS BANK: ", skillsBank)
        let icon1 = 'pi pi-eye';
        let icon2 = 'pi pi-tag';
        let stats = [...this.props.baseStats.stats];
        let mods = [...this.props.baseStats.modifiers[1]];
        let level = this.props.state.class[0][1];
        const hitDie = this.props.state.hitPoints["Hit Die"];
        
        return(
            <div>
                <h1>calculate scores!</h1>
                <button onClick={this.loadComponent}>GO</button>

                <div className="char-sheet-container">
                    <div className="char-sheet-header">
                        <h2>Name</h2>
                    </div>
                    <div className="char-sheet-body">
                        <div className="stats-container">
                            <div className="core-stats-container">
                                {(['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']).map((title, i) =>
                                        <div className="base-stat-row" key={i}>
                                            <div className="base-label">{title}</div>
                                            <div className="base-mod">{mods[i]}</div>
                                            <div className="base-stat">{stats[i]}</div>
                                        </div>
                                    )}
                            </div>
                            <div className="skills-etc-container">
                                <div className="proficiency-bonus-container">
                                    <div className="passive-perception">
                                        <span className="bonus-box">{10 + this.state.PP}</span>Passive Perception
                                    </div>
                                    <div className="proficiency-bonus">
                                        <span className="bonus-box">+{this.props.state.classDetails.proficiencyBonus}</span>Proficiency Bonus
                                    </div>
                                </div>
                                <div className="saving-throws-container">
                                    <span className="section-header">Saving Throws</span>
                                    {(["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"]).map((e, i) => {
                                        return (
                                            <div className="saving-throw-row" key={i}>
                                                <i className="pi pi-circle" id={`radio-${e}`} />
                                                <span className='underline'>{mods[i]}</span>
                                                <span className="save-title">{e}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="skills-container">
                                    <span className="section-header">Skills</span>
                                    {skillsBank.map((e, i) => {
                                        //console.log("skill id: ", `radio-${e.match(/(\w+)/)[0]}`)
                                        return (
                                            <div className="skill-row" key={i}>
                                                <i className="pi pi-circle" id={`radio-${e.match(/(\w+)/)[0]}`} />
                                                <span className='underline'>{(()=>{
                                                    let value = ''
                                                    e.match(/(Str)/) ? value = mods[0]:
                                                    e.match(/(Dex)/) ? value = mods[1]:
                                                    e.match(/(Con)/) ? value = mods[2]:
                                                    e.match(/(Int)/) ? value = mods[3]:
                                                    e.match(/(Wis)/) ? value = mods[4]:
                                                    value = mods[5];
                                                    return value;
                                                })()}</span>
                                                <span className="skill-title">{e}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="combat-stats-container">
                                <div className="defense-stats-container">
                                    <div className="cs-initiative"><span className="bonus-box">{this.props.state.baseStats.modifiers[1][1]}</span>Initiative</div>
                                    <div className="cs-speed">
                                        <span className="bonus-box">
                                            {(()=>{
                                                let base = this.props.state.raceDetails.speed;
                                                let speed = base;
                                                this.props.features.forEach((feature, i) => {
                                                    if (typeof feature === 'object') {
                                                        if (feature.hasOwnProperty('speed')) {
                                                            speed += feature.speed;
                                                        }
                                                    }
                                                })

                                                return `${speed}'`;
                                            })()}
                                        </span>
                                        Speed
                                    </div>
                                    <div className="cs-armor-class">
                                        <div className="cs-armor"><span className="section-header">Armor:</span><br/>
                                            <span className="shield"><i className="pi pi-circle" id='shield-radio' />Shield</span>
                                            <br/>
                                            {this.state.armorType === "No armor" ? "No armor" :
                                                <div>
                                                    <br/>{this.state.armorType}<br/>
                                                    type: {this.state.armor[0].group}<br/>
                                                    weight: {this.state.armor[0].weight}lb<br/>
                                                    {this.state.armor[0].stealth ? <span>stealth: {this.state.armor[0].stealth}<br/></span> : null}
                                                    AC: {this.state.armor[0].AC.base} + Dex {this.state.armor[0].AC.hasOwnProperty("maxBonus") ? <span>(max {this.state.armor[0].AC.maxBonus})</span> : null}
                                                </div>
                                            }
                                        </div>
                                        <div className="cs-ac">
                                            <span className="ac-box">
                                                {this.state.AC}
                                                <span className="ac-label">Armor Class</span>
                                            </span>

                                        </div>
                                        <div className="cs-hit-points">
                                            <div className="cs-hit-dice">
                                                <span className="cs-box">{level}d{this.props.state.hitPoints["Hit Die"]}
                                                    <span className="cs-label">Hit Dice</span>
                                                </span>
                                            </div>
                                            <div className="cs-hp">
                                                <span className="cs-box">
                                                    {(()=>{
                                                        let getRoll = () => {
                                                        let max = this.props.state.hitPoints["Hit Die"];
                                                        let min = (max / 2) + 1;
                                                        let con = this.props.abilityMods[2];
                                                        return Math.floor(Math.random() * (max - min)) + min + con;
                                                        }
                                                        let HP = 0;
                                                        for (let i = 1; i <= level; i++) {
                                                            if (i === 1) {
                                                                HP += hitDie + this.props.abilityMods[2];
                                                            }
                                                            else {
                                                                HP += getRoll()
                                                            }
                                                        }
                                                        return HP;
                                                    })()}
                                                    <span className="cs-label">Hit Points</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="attack-stats-container">
                                    <span className="section-header">Attacks:</span>
                                    {this.state.attacks.map((e, i) => {
                                        return (
                                            <div className="attack-row" key={i}>
                                                <div className="attack-name">{e.name.toString()}</div>
                                                <div className="attack-bonus">{e.attackBonus}</div>
                                                <div className="attack-damage">{`${e.damage} ${e.type}`}</div>
                                                <div className="attack-range"><i className={icon1} />{e.range}</div>
                                                <div className="attack-properties">
                                                    {e.properties.map((property, i) => {
                                                        return (
                                                            <div className="attack-property" key={i}><i className={icon2} />{property}</div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="personality-features-container">
                            <div className="personality-container">
                                <div className="personality-traits personality-row">
                                    <textarea name="personality-traits" id="personality-traits" className="cs-personality"></textarea>
                                    <span className="pt-label">personality</span>
                                </div>
                                <div className="ideals personality-row">
                                    <textarea name="ideals" id="ideals" className="cs-personality"></textarea>
                                    <span className="pt-label">ideals</span>
                                </div>
                                <div className="bonds personality-row">
                                    <textarea name="bonds" id="bonds" className="cs-personality"></textarea>
                                    <span className="pt-label">bonds</span>
                                </div>
                                <div className="flaws personality-row">
                                    <textarea name="flaws" id="flaws" className="cs-personality"></textarea>
                                    <span className="pt-label">flaws</span>
                                </div>
                            </div>
                            <div className="features-container">
                                <span className="section-header">Features:</span><br/>
                                {(()=>{
                                    return this.props.features.map((e, i) =>
                                        <div className="feature-item" key={i}>
                                            {typeof e === 'string' ?
                                                <div className="feature-name"><i className="pi pi-tag" />{e}<br/></div>
                                            :
                                            e.hasOwnProperty('details') ?
                                                <div className="feature-row">
                                                    <div className="feature-name" onClick={()=>this.toggleFeatureDetails(e.id)} style={{cursor: "pointer"}}><i className="pi pi-tag" />{e.name}<br/></div>
                                                    <ul className="feature-details">
                                                        {Object.keys(e).map((key, j) => {
                                                            if (key === 'name' || key === 'details' || key === 'id') {return null}
                                                            return (
                                                                <li key={j}>
                                                                    {key}: {e[key]}
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                    {e.hasOwnProperty("details") ? <div className="feature-description" id={`details-${e.id}`} style={{display: "none"}} >{e.details}</div> : null }
                                                </div>
                                            : <div className="feature-name"><i className="pi pi-tag" />{e.name}<br/></div> }
                                        </div>
                                    )
                                })()}
                            </div>
                        </div>
                        <div className="proficiencies-container">
                            <span className="section-header">Other Proficiencies</span><br/>
                            <div className="proficiency-section">
                                <span className="section-header">Armor:</span><br/>
                                {
                                    this.props.state.armor.proficiencies.length === 0 ? null :
                                    <ul className="proficiency-list">
                                        {this.props.state.armor.proficiencies.map((e, i) => {
                                            return <li key={i}>{e}</li>
                                        })}
                                    </ul>
                                }
                            </div>
                            <div className="proficiency-section">
                                <span className="section-header">Weapons:</span><br/>
                                {
                                    this.props.state.weaponProficiencies.proficiencies.length === 0 ? null :
                                    <ul className="proficiency-list">
                                        {
                                            this.props.state.weaponProficiencies.proficiencies.map((e, i) => {
                                                return <li key={i}>{e}</li>
                                            })
                                        }
                                    </ul>
                                }
                            </div>
                            <div className="proficiency-section">
                                <span className="section-header">Tools:</span>
                                {
                                    this.props.state.tools.length === 0 ? null :
                                    <ul className="proficiency-list">
                                        {
                                            this.props.state.tools.map((e, i) => {
                                                return <li key={i}>{e}</li>
                                            })
                                        }
                                    </ul>
                                }
                            </div>
                        </div>
                        <div className="equipment-container">
                            <span className="section-header">Equipment:</span>
                            <ul className="equipment-list">
                                {this.props.state.equipment.map((e, i) => {
                                    return <li key={i}>{e}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
{/*
                <table id="final-results">
                    <thead><tr><td colSpan={3}><h2>NAME</h2></td></tr></thead>
                    <tbody>
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>proficiency bonus</td>
                                    </tr>
                                    <tr>
                                        <td><div className="data-box">+{this.props.state.classDetails.proficiencyBonus}</div></td>
                                    </tr>
                                    <tr>
                                        <td>passive perception</td>
                                    </tr>
                                    <tr>
                                        <td><div className="data-box">+{this.state.PP}</div></td>
                                    </tr>
                                    </tbody>
                                    
                                </table>
                            </td>
                            <td colSpan={2}>
                                <FancyAbilityScores />
                            </td>
                            <td>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>INITIATIVE</td>
                                    </tr>
                                    <tr><td>
                                        <div className="data-box">+{this.props.state.baseStats.modifiers[0][1]}</div>
                                    </td></tr>
                                    <tr>
                                        <td>SPEED</td>
                                    </tr>
                                    <tr><td>
                                        <div className="data-box">{this.props.state.raceDetails.speed}'</div>
                                    </td></tr>
                                    </tbody>
                                    
                                </table>
                            </td>
                            
                        </tr>
                        <tr>
                            <td colSpan={4}>
                            <table id="ACetc-table">
                                <tbody>
                                <tr>
                                    <td>HIT DICE</td>
                                    <td>HIT POINTS</td>
                                    <td>ARMOR CLASS</td>
                                    <td>ARMOR</td>
                                    <td>SHIELD</td>
                                </tr>
                                <tr>
                                    <td><div className="data-box2">xdy</div></td>
                                    <td><div className="data-box2">0</div></td>
                                    <td><div className="data-box2">{this.state.AC}</div></td>
                                    <td><div className="data-box2">none</div></td>
                                    <td><div className="data-box2">{this.state.shield ? +2 : 0}</div></td>
                                </tr>
                                </tbody>
                                
                            </table>
                            </td>
                        </tr>
                        <tr>
                            
                            
                            <td></td>
                        </tr>
                        <tr id="skills-etc">
                            <td colSpan={1} id="skills-section" >
                                <table id="skills-table">
                                    <thead>
                                        <tr>
                                        <td colSpan={3}>SKILLS</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><div className="check-box" id="Acrobatics (Dex)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Acrobatics (Dex)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Animal Handling (Wis)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Animal Handling (Wis)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Arcana (Int)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Arcana (Int)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Athletics (Str)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Athletics (Str)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Deception (Cha)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Deception (Cha)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="History (Int)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">History (Int)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Insight (Wis)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Insight (Wis)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Intimidation (Cha)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Intimidation (Cha)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Investigation (Int)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Investigation (Int)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Medicine (Wis)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Medicine (Wis)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Nature (Int)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Nature (Int)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Perception (Wis)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Perception (Wis)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Performance (Cha)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Performance (Cha)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Persuasion (Cha)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Persuasion (Cha)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Religion (Int)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Religion (Int)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Sleight of Hand (Dex)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Sleight of Hand (Dex)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Stealth (Dex)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Stealth (Dex)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box" id="Survival (Wis)"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Survival (Wis)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="subtable">
                                <div id="saving-container">
                                <table id="saving-table">
                                    <thead>
                                        <tr>
                                        <td colSpan={3}>SAVING THROWS</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><div className="check-box" id="StrengthPro"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Strength</td>
                                    </tr>
                                    <tr>
                                        <td><div className="check-box" id="DexterityPro"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Dexterity</td>
                                    </tr>
                                    <tr>
                                        <td><div className="check-box" id="ConstitutionPro"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Constitution</td>
                                    </tr>
                                    <tr>
                                        <td><div className="check-box" id="IntelligencePro"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Intelligence</td>
                                    </tr>
                                    <tr>
                                        <td><div className="check-box" id="WisdomPro"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Wisdom</td>
                                    </tr>
                                    <tr>
                                        <td><div className="check-box" id="CharismaPro"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Charisma</td>
                                    </tr>
                                    </tbody>
                                    
                                </table>
                                </div>
                                <div id="feature-container">
                                    <table id="feature-table">
                                        <thead>
                                            <tr>
                                                <td>FEATURES</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.mapFeatures()}
                                        </tbody>
                                        
                                    </table>
                                </div>
                                
                            </td>
                            <td colSpan={2} id="subtable2" className="subtable">
                                
                                <div id="subtable3">
                                    <table id='res-table'>
                                        <thead>
                                            <tr>
                                                <td>RESISTANCES ETC</td>
                                            </tr>
                                        </thead>
                                        <tbody>{this.mapResistances()}</tbody>
                                        
                                    </table>
                                </div>
                                <div>
                                    <table id="eq-table">
                                        <thead>
                                            <tr>
                                                <td>EQUIPMENT</td>
                                            </tr>
                                        </thead>
                                        <tbody id="equipment-table-body">
                                            {this.mapEquipment()}
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>{this.weaponCards()}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                            
                            </td>
                            
                            

                        </tr>
                    </tbody>
                </table>
*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        weapons: state.weapons,
        features: state.features,
        baseStats: state.baseStats,
        abilityMods: state.baseStats.modifiers[0],
        proficiencyBonus: state.classDetails.proficiencyBonus,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (type, payload) => { dispatch({type: type, payload: payload}) },
        dispatchWeapon: (weapon) => { dispatch({type: 'addWeapon', payload: weapon}) },
        updateWeapons: (arr) => { dispatch({type: 'updateWeapons', payload: arr}) },
        updateArmor: (armor) => { dispatch({type: "updateArmor", payload: armor}) },
        dispatchResistance: (payload) => { dispatch({ type: "addResistance", payload: payload }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculateFinalScores)