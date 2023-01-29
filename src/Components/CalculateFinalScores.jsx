import { map } from "async";
import React from "react";
import { connect } from "react-redux";
import WeaponCard from "../WeaponCard";
import { weapons, weaponList, allWeapons } from "../reference/equipment-data";
import FinalAbilityScores from "./FinalAbilityScores";

const armorData = {
    "padded": {
        group: "light",
        cost: 5,
        AC: [11, "Dex"],
        stealth: "disadvantage",
        weight: 8
    },
    "leather": {
        group: "light",
        cost: 10,
        AC: [11, "Dex"],
        weight: 10
    },
    "studded leather": {
        group: "light",
        cost: 45,
        AC: [12, "Dex"],
        weight: 13
    },
    "hide": {
        group: "medium",
        cost: 10,
        AC: [12, "Dex", "max 2"],
        weight: 12
    },
    "chain shirt": {
        group: "medium",
        cost: 50,
        AC: [13, "Dex", "max 2"],
        weight: 20
    },
    "scale mail": {
        group: "medium",
        cost: 50,
        AC: [14, "Dex", "max 2"],
        stealth: "disadvantage",
        weight: 45
    },
    "breastplate": {
        group: "medium",
        cost: 400,
        AC: [14, "Dex", "max 2"],
        weight: 20
    },
    "half plate": {
        group: "medium",
        cost: 750,
        AC: [15, "Dex", "max 2"],
        stealth: "disadvantage",
        weight: 40
    },
    "ring mail": {
        group: "heavy",
        cost: 30,
        AC: 14,
        Str: 13,
        stealth: "disadvantage",
        weight: 40
    },
    "chain mail": {
        group: "heavy",
        cost: 74,
        AC: 16,
        Str: 15,
        stealth: "disadvantage",
        weight: 55
    },
    "splint": {
        group: "heavy",
        cost: 200,
        AC: 17,
        Str: 15,
        stealth: "disadvantage",
        weight: 60
    },
    "plate": {
        group: "heavy",
        cost: 1500,
        AC: 18,
        Str: 15,
        stealth: "disadvantage",
        weight: 65
    },
    "shield": {
        group: "shield",
        cost: 10,
        AC: "+2",
        weight: 6
    }
}
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
            equipment: [],
            weapons: [],
            statMods: [],
            proficiencyBonus: undefined,
            armor: undefined,
            weapon1: undefined,
            weapon2: undefined,
            AC: undefined,
            HP: undefined,
            PP: undefined,
        }
    }

    loadComponent = () => {
        this.setState({
            equipment: this.props.state.equipment,
            statMods: this.props.state.baseStats.modifiers[0],
            proficiencyBonus: this.props.state.classDetails.proficiencyBonus
        })
        this.findWeapons()
        
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
        console.log('from equipment: ',weapons)
        this.setState({weapons: weapons})
        this.removeDuplicateWeapons()
    }

    //REMOVE DUPLICATES
    removeDuplicateWeapons = () => {
        let arr1 = [...this.props.weapons, ...this.state.weapons]
        let finalNames = [];
        console.log('arr1', arr1)
        let arr1Names = arr1.map(e=>e.name)

        for (let i=0; i<arr1Names.length; i++) {
            if (!finalNames.includes(arr1Names[i])) {
                finalNames.push(arr1Names[i])
            }
        }
        let final = [];
        for (let i=0; i<finalNames.length; i++) {
            final.push(allWeapons[finalNames[i]])
            console.log(finalNames, allWeapons[finalNames[i]])
        }
        console.log(arr1Names)
        console.log("final: ",final)
        this.props.updateWeapons(final)
    }

    // GENERATE WEAPON CARDS 
    mapWeaponCard = (obj) => {
        let {name, damage, type, properties} = obj;
        return <WeaponCard name={name} baseDamage={damage} type={type} properties={properties} />
    }

    weaponCards = () => {
        let arr = [...this.props.weapons];
        return arr.map((e, i)=>
            <div className="weapon-card" key={i}>
                <WeaponCard name={e.name} baseDamage={e.damage} type={e.type} properties={e.properties} />
            </div>
        )
    }
    
    // GENERATE LIST OF FEATURES
    mapFeatures = () => {
        let arr = [...this.props.features]
        return arr.map((e, i)=><tr key={i}>{e}</tr>)
    }

    mapEquipment = () => {
        let arr = [...this.props.state.equipment];
        return arr.map((e, i)=><tr key={i}>{e}</tr>)
    }

    render(){
        
        return(
            <div>
                <h1>calculate scores!</h1>
                <button onClick={this.loadComponent}>GO</button>

                <h2>{this.state.statMods.concat(this.state.proficiencyBonus).join(', ')}</h2>
                <h2>{this.state.equipment.join(', ')}</h2>

                
                
                <table id="final-results">
                    <thead>
                        <td colSpan={3}>NAME</td>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <table>
                                    <tr><td>proficiency bonus</td></tr>
                                    <tr>
                                        <div className="data-box">+{this.props.state.classDetails.proficiencyBonus}</div>
                                    </tr>
                                    <tr>passive perception</tr>
                                    <tr><div className="data-box">+0</div></tr>
                                </table>
                            </td>
                            <td>
                                <FinalAbilityScores />
                            </td>
                            <td>
                                <table>
                                    <tr>INITIATIVE</tr>
                                    <tr><div className="data-box">+{this.props.state.baseStats.modifiers[0][1]}</div></tr>
                                    <tr>SPEED</tr>
                                    <tr><div className="data-box">{this.props.state.raceDetails.speed}'</div></tr>
                                </table>
                            </td>
                            
                        </tr>
                        <tr>
                            <td>ARMOR CLASS</td>
                            <td>HIT POINTS</td>
                            <td>HIT DICE</td>
                        </tr>
                        <tr>
                        <td><div className="data-box">+0</div></td>
                        <td><div className="data-box">0</div></td>
                        <td><div className="data-box">+0</div></td>
                        </tr>
                        <tr>
                            <td colSpan={1} >
                                <table id="skills-table">
                                    <thead>
                                        <td colSpan={3}>SKILLS</td>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Acrobatics (Dex)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Animal Handling (Wis)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Arcana (Int)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Athletics (Str)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Deception (Cha)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">History (Int)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Insight (Wis)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Intimidation (Cha)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Investigation (Int)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Medicine (Wis)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Nature (Int)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Perception (Wis)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Performance (Cha)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Persuasion (Cha)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Religion (Int)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Sleight of Hand (Dex)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
                                            <td className="underline"></td>
                                            <td className="skill">Stealth (Dex)</td>
                                        </tr>
                                        <tr>
                                            <td><div className="check-box"></div></td>
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
                                        <td colSpan={3}>SAVING THROWS</td>
                                    </thead>
                                    <tr>
                                        <td><div className="check-box"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Strength</td>
                                    </tr>
                                    <tr>
                                        <td><div className="check-box"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Dexterity</td>
                                    </tr>
                                    <tr>
                                        <td><div className="check-box"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Constitution</td>
                                    </tr>
                                    <tr>
                                        <td><div className="check-box"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Intelligence</td>
                                    </tr>
                                    <tr>
                                        <td><div className="check-box"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Wisdom</td>
                                    </tr>
                                    <tr>
                                        <td><div className="check-box"></div></td>
                                        <td className="underline"></td>
                                        <td className="skill">Charisma</td>
                                    </tr>
                                </table>
                                </div>
                                <div id="feature-container">
                                    <table id="feature-table">
                                        <thead>FEATURES</thead>
                                        {this.mapFeatures()}
                                    </table>
                                </div>
                                
                            </td>
                            <td colSpan={2} id="subtable2" className="subtable">
                                
                                <div id="subtable3">
                                    <table id='res-table'>
                                        <thead>RESISTANCES ETC</thead>
                                        <tr>resistance to booba</tr>
                                    </table>
                                </div>
                                <div>
                                    <table id="eq-table">
                                        <thead>EQUIPMENT</thead>
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
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        weapons: state.weapons,
        features: state.features
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (type, payload) => { dispatch({type: type, payload: payload}) },
        dispatchWeapon: (weapon) => { dispatch({type: 'addWeapon', payload: weapon}) },
        updateWeapons: (arr) => { dispatch({type: 'updateWeapons', payload: arr}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculateFinalScores)