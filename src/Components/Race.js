import React from "react"
import { connect } from "react-redux"
//  import  AbilityHuman from "./AbilityHuman"
//  import SkillHuman from "./SkillHuman"
//  import FeatHuman from "./FeatHuman"
import selectorAudio from './sounds/selector1.wav';
import resetAudio from './sounds/chipsStack3.wav';
import submitAudio from './sounds/chipsStack1.wav';
import { select, selectAll } from "d3";


const colorWheel = {
    purple: "#BFABFF",
    yellow: "#ebffab",
    orange: "#ffbfab",
    green: "#abffbf",
}

const defaultState = {
    hidden: false,
    race: '',
    subRace: '',
    abilityScoreIncrease: undefined,
    age: undefined,
    alignment: undefined,
    size: '',
    speed: 0,
    languages: [],
    darkVision: false,
    baseFeatures: undefined,
    features: [],
    finalized: false,
    actions: []
}

class Race extends React.Component {
    constructor(props){
        super(props)
        this.state=defaultState;

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.applyStatBonus = this.applyStatBonus.bind(this)
        this.Dwarf = this.Dwarf.bind(this)
        this.HillDwarf = this.HillDwarf.bind(this)
        this.MountainDwarf = this.MountainDwarf.bind(this)
        this.Elf = this.Elf.bind(this)
        this.WoodElf = this.WoodElf.bind(this)
        this.HighElf = this.HighElf.bind(this)
        this.DarkElf = this.DarkElf.bind(this)
        this.Halfling = this.Halfling.bind(this)
        this.LightfootHalfling = this.LightfootHalfling.bind(this)
        this.StoutHalfling = this.StoutHalfling.bind(this)
        this.Human = this.Human.bind(this)
        this.AbilityHuman = this.AbilityHuman.bind(this)
        this.SkillHuman = this.SkillHuman.bind(this)
        this.FeatHuman = this.FeatHuman.bind(this)
        this.Dragonborn = this.Dragonborn.bind(this)
        this.Gnome = this.Gnome.bind(this)
        this.ForestGnome = this.ForestGnome.bind(this)
        this.RockGnome = this.RockGnome.bind(this)
        this.HalfOrc = this.HalfOrc.bind(this)
        this.HalfElf = this.HalfElf.bind(this)
        this.Tiefling = this.Tiefling.bind(this)
    }

    componentDidMount(){
        this.bindSounds()
        select("#race-prompt")
            .style("text-shadow", "0 0 6px "+colorWheel.green)
    }

    componentDidUpdate(){
        if(this.state.hidden === false){
            console.log("updating")
            this.bindSounds()
            const allButtons = selectAll(".race-button")._groups[0];
            //console.log("button value: ", allButtons[0].value, ", subrace: ", this.state.subRace)
            for (let i=0; i<allButtons.length; i++) {
                if ( this.state.race === allButtons[i].value || this.state.subRace === allButtons[i].value ) {
                    select(allButtons[i])
                        .style("box-shadow", "none")
                        .style("border", "2px solid "+colorWheel.green)
                        .style("box-shadow", "0 0 6px "+colorWheel.green)
                } else {
                    select(allButtons[i])
                        .style("box-shadow", "none")
                        .style("border", "2px solid "+colorWheel.purple)
                        .style("box-shadow", "0 0 6px "+colorWheel.purple)
                }
            }
        
        }
    }

    bindSounds = () => {
        //let buttons = document.querySelectorAll(".radioButton")
        //let buttonsArray = Array.prototype.slice.call(buttons)
        /*
        buttonsArray.forEach((e)=>{
            e.addEventListener(("click"), ()=>{
                document.getElementById("radioAudio").play()
            })
        })
        document.getElementById('resetButton').addEventListener(("click"), ()=>{
            document.getElementById('resetAudio').play()
        })
        document.getElementById('submitButton').addEventListener(("click"), ()=>{
            document.getElementById('submitAudio').play()
        })
        */
    }

    Dwarf() {
        this.setState(defaultState);
        this.setState((state)=>{
            return {
                race: 'Dwarf',
                abilityScoreIncrease: [0,0,2,0,0,0],
                age: 50,
                alignment: ['Lawful', 'Good'],
                size: 'Medium',
                speed: 25,
                languages: ['Common', 'Dwarvish'],
                darkVision: true,
                baseFeatures: ['Dwarven Resilience', 'Dwarven Combat Training', 'Tool Proficiency', 'Stonecunning']
            }
            
        })
    }

    HillDwarf() {
        this.setState((state)=>{
            return {
                subRace: 'Hill',
                abilityScoreIncrease: [0,0,2,0,1,0],
                features: [...state.baseFeatures, 'Dwarven Toughness'],
                actions: [{ //Dwarven Combat Training
                    type: "weaponProficiency",
                    payload: ["battleaxe", "handaxe", "throwing hammer", "warhammer"]  
                    },{ //Dwarven Toughness
                        type: "hitPoints",
                        payload: 1
                    },{
                        type: "HPbonus",
                        payload: 1
                    }
                ]
            }
        })
    }

    MountainDwarf() {
        this.setState((state)=>{
            return{
                subRace: 'Mountain',
                abilityScoreIncrease: [2,0,2,0,0,0],
                features: [...state.baseFeatures, 'Dwarven Armor Training'],
                actions: [{ //Dwarven Armor Training
                    type: "armorProficiency",
                    payload: ["light", "medium"]
                },{
                    type: "weaponProficiency",
                    payload: ["battleaxe", "handaxe", "throwing hammer", "warhammer"]  
                }
            ]
            }
        })
    }

    Elf() {
        this.setState(defaultState);
        this.setState((state)=>{
            return{
                race: 'Elf',
                age: 100,
                alignment: ['chaotic', 'good'],
                size: 'Medium',
                speed: 30,
                darkVision: true,
                languages: ['Common', 'Elvish'],
                baseFeatures: ['Keen Senses', 'Fey Ancestry', 'Trance'],
                actions: [{ //Keen Senses
                    type: 'addSkillProficiency',
                    payload: "Perception (Wis)"
                }]
            }
        })
    }

    HighElf() {
        this.setState((state)=>{
            return{
                subRace: 'High',
                abilityScoreIncrease: [0,2,0,1,0,0],
                features: [...state.baseFeatures, 'Elf Weapon Training', 'Cantrip(wizard)', 'Extra Language'],
                actions: [...state.actions, 
                    { //Elf Weapon Training
                        type: 'weaponProficiency',
                        payload: ['longsword', 'shortsword', 'shortbow', 'longbow']
                    },
                    { //Extra Language
                        type: 'addLanguagePick',
                        payload: 1
                    },
                    {
                        type: 'addSpell',
                        payload: 'Wizard Cantrip'
                    }
                ]
            }
        })
    }

    WoodElf() {
        this.setState((state)=>{
            return{
                subRace: 'Wood',
                abilityScoreIncrease: [0,2,0,0,1,0],
                speed: 35,
                features: [...state.baseFeatures, 'Elf Weapon Training', 'Fleet of Foot', 'Mask of the Wild'],
                actions: [...state.actions, 
                    { //Elf Weapon Training
                        type: 'weaponProficiency',
                        payload: ['longsword', 'shortsword', 'shortbow', 'longbow']
                    }
                ]
            }
        })
    }

    DarkElf() {
        this.setState((state)=>{
            return {
                subRace: 'Dark',
                abilityScoreIncrease: [0,2,0,0,0,1],
                features: [...state.baseFeatures, 'Drow Weapon Training', 'Superior Darkvision', 'Sunlight Sensitivity', 'Drow Magic'],
                actions: [...state.actions, 
                    { //Drow Weapon Training
                        type: "weaponProficiency",
                        payload: ["rapier", "shortsword", "hand crossbow"]
                    }
                ]
            }
        })
    }

    Halfling() {
        this.setState(defaultState);
        this.setState({
            race: 'Halfling',
            abilityScoreIncrease: [0,2,0,0,0,0],
            alignment: ['lawful', 'good'],
            size: 'Small',
            speed: 25,
            languages: ['Common', 'Halfling'],
            baseFeatures: ['Lucky', 'Brave', 'Halfling Nimbleness']
        })
    }
    
    LightfootHalfling(){
        this.setState((state)=>{
            return {
                subRace: 'Lightfoot',
                abilityScoreIncrease: [0,2,0,0,0,1],
                features: [...state.baseFeatures, 'Naturally Stealthy']
            }
        })
    }

    StoutHalfling(){
        this.setState((state)=>{
            return{
                subRace: 'Stout',
                abilityScoreIncrease: [0,2,1,0,0,0],
                features: [...state.baseFeatures, 'Stout Resilience']
            }
        })
    }

    Human(){
        this.setState(defaultState);
        this.setState({
            race: 'Human',
            abilityScoreIncrease: [1,1,1,1,1,1],
            age: 18,
            size: 'Medium',
            speed: 30,
            languages: ['Common'],
            actions: [
                { //Extra Language
                    type: 'addLanguagePick',
                    payload: 1
                }
            ]
        })
    }

    AbilityHuman(){
        this.setState({
            subRace: 'Ability',
            abilityScoreIncrease: [0,0,0,0,0,0],
            actions: [...this.state.actions,
                {
                    type: 'addAbilityScorePick',
                    payload: 2
                }
            ]
        })
    }

    SkillHuman(){
        this.setState({
            subRace: 'Skill',
            abilityScoreIncrease: [0,0,0,0,0,0],
            actions: [...this.state.actions,
                {
                    type: 'addSkillPick',
                    payload: 1
                }
            ]
        })
    }

    FeatHuman(){
        this.setState({
            subRace: 'Feat',
            abilityScoreIncrease: [0,0,0,0,0,0],
        })
    }

    Dragonborn(){
        this.setState(defaultState);
        this.setState({
            race: 'Dragonborn',
            abilityScoreIncrease: [2,0,0,0,0,1],
            age: 15,
            size: 30,
            languagues: ['Common', 'Draconic'],
            features: ['Draconic Ancestry']
        })
    }

    Gnome(){
        this.setState(defaultState);
        this.setState({
            race: 'Gnome',
            abilityScoreIncrease: [0,0,0,2,0,0],
            age: 40,
            size: 'Small',
            speed: 25,
            darkVision: true,
            languages: ['Common', 'Gnomish'],
            baseFeatures: ['Gnome Cunning']
        })
    }

    ForestGnome(){
        this.setState((state)=>{
            return {
                subRace: 'Forest',
                abilityScoreIncrease: [0,1,0,2,0,0],
                features: [...state.baseFeatures, 'Natural Illusionist', 'Speak with Small Beasts'],
                actions: [
                    { //Natural Illusionist
                        type: 'addSpell',
                        payload: 'minor illusion'
                    }
                ]
            }
        })
    }
    RockGnome(){
        this.setState((state)=>{
            return {
                subRace: 'Rock',
                abilityScoreIncrease: [0,0,1,2,0,0],
                features: [...state.baseFeatures, "Artificer's Lore", 'Tinker']
            }
        })
    }

    HalfElf(){
        this.setState(defaultState);
        this.setState({
            race: 'Half Elf',
            abilityScoreIncrease: [0,0,0,0,0,2],
            size: 'Medium',
            speed: 30,
            darkVision: true,
            languages: ['Common', 'Elvish'],
            languagePicks: 1,
            features: ['Fey Ancestry', 'Skill Verstility'],
            actions: [
                { //Skill Versatility
                    type: 'addSkillPick',
                    payload: 2
                },
                { //Ability Score Increase
                    type: 'addAbilityScorePick',
                    payload: 2
                },
                { //Extra Language
                    type: 'addLanguagePick',
                    payload: 1
                }
            ]
        })
    }

    HalfOrc(){
        this.setState(defaultState);
        this.setState({
            race: 'Half Orc',
            abilityScoreIncrease: [2,0,1,0,0,0],
            size: 'Medium',
            speed: 30,
            darkVision: true,
            languages: ['Common', 'Orc'],
            features: ['Menacing', 'Relentless Endurance', 'Savage Attacks'],
            actions: [
                {
                    type: 'addSkillProficiency',
                    payload: 'Intimidation (Cha)'
                }
            ]
        })
    }

    Tiefling(){
        this.setState(defaultState);
        this.setState({
            race: 'Tiefling',
            abilityScoreIncrease: [0,0,0,1,0,2],
            size: 'Medium',
            speed: 30,
            darkVision: true,
            languages: ['Common', 'Infernal'],
            features: ['Hellish Resistance', 'Infernal Legacy']
        })
    }

    applyStatBonus(bonuses){
        this.setState({statBonuses: bonuses})
    }
    
    handleSubmit() {
        setTimeout(()=>this.setState({hidden: true}), 500)
        const state = Object.assign({}, this.state)
        Object.keys(state).forEach(key => state[key] === undefined && delete state[key])
        const actions = this.state.actions.map(e=>e)
        for(let i=0; i<actions.length; i++){
            this.props.dispatch(actions[i].type, actions[i].payload)
        }
        this.props.submitState(state)
        this.props.dispatch('addLanguages', this.state.languages)
        this.props.dispatch('addFeatureArray', this.state.features)

        this.props.updateProgress()
    }

    handleReset(){
        this.props.resetStore()
        this.setState(defaultState)
    }

    render(){
        if (this.state.hidden === false || this.state.hidden === true) {
            return(
                <div id='race-container' className="input-card">
                    <audio id="radioAudio" src={selectorAudio} preload="auto" ></audio>
                    <audio id="resetAudio" src={resetAudio} preload="auto" ></audio>
                    <audio id="submitAudio" src={submitAudio} preload="auto" ></audio>
                    <h1 id="race-prompt">Select Race</h1>
                    {this.props.details.finalized === false ?
                    <div>
                        
                        <div className='race-set'>
                            <button className="race-button"  onClick={this.Dwarf} type='radio' name='race' value='Dwarf' >Dwarf</button>
                            {this.state.race === 'Dwarf' ? 
                                <div>
                                    <button className="race-button subRace" onClick={this.HillDwarf} value='Hill' name='subRace' >Hill Dwarf</button>
                                    <button className="race-button subRace" onClick={this.MountainDwarf} value='Mountain' name='subRace' >Mountain Dwarf</button>
                                </div>
                            : null}
                        </div>
                        
                        <div className='race-set'>
                            <button className="race-button"  onClick={this.Elf} type='radio' name='race' value="Elf" >Elf</button>
                            {this.state.race === 'Elf' ? 
                                <div>
                                    <button className="race-button subRace" onClick={this.HighElf} value='High' name='subRace' >High Elf</button>
                                    <button className="race-button subRace" onClick={this.WoodElf} value='Wood' name='subRace' >Wood Elf</button>
                                </div>
                            : null}
                        </div>
                        
                        <div className='race-set'>
                            <button className="race-button"  onClick={this.Halfling} type='radio' name='race' value="Halfling" >Halfling</button>
                            {this.state.race === 'Halfling' ? 
                                <div>
                                    <button className="race-button subRace" onClick={this.LightfootHalfling} value='Lightfoot' name='subRace' >Lightfoot Halfling</button>
                                    <button className="race-button subRace" onClick={this.StoutHalfling} value='Stout' name='subRace' >Stout Halfling</button>
                                </div>
                            : null}
                        </div>
                        
                        <div className='race-set'>
                            <button className="race-button"  onClick={this.Human} type='radio' name='race' value="Human" >Human</button>
                            {this.state.race === 'Human' ? 
                                <div>
                                    <button className="race-button subRace" onClick={this.AbilityHuman} value='Ability' name='subRace' >Ability Score Increase</button>
                                    <button className="race-button subRace" onClick={this.SkillHuman} value='Skill' name='subRace' >Extra Skill</button>
                                    <button className="race-button subRace" onClick={this.FeatHuman} value='Feat' name='subRace'>FEAT</button>
                                </div>
                            : null}
                        </div>
                        
                        <div className='race-set'>
                            <button className="race-button"  onClick={this.Dragonborn} type='radio' name='race' value="Dragonborn" >Dragonborn</button>
                            {this.state.race === 'Dragonborn' ? 
                                <div>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'Black'})} value='Black' name='subRace' >Black</button>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'Blue'})} value='Blue' name='subRace' >Blue</button>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'Brass'})} value='Brass' name='subRace' >Brass</button>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'Bronze'})} value='Bronze' name='subRace' >Bronze</button>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'Copper'})} value='Copper' name='subRace' >Copper</button>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'Gold'})} value='Gold' name='subRace' >Gold</button>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'Green'})} value='Green' name='subRace' >Green</button>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'Red'})} value='Red' name='subRace' >Red</button>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'Silver'})} value='Silver' name='subRace' >Silver</button>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'White'})} value='White' name='subRace' >White</button>
                                </div>
                            : null}
                        </div>
                        
                        <div className='race-set'>
                            <button className="race-button"  onClick={this.Gnome} type='radio' name='race' value="Gnome" >Gnome</button>
                            {this.state.race === 'Gnome' ? 
                                <div>
                                    <button className="race-button subRace" onClick={this.ForestGnome} value='Forest' name='subRace' >Forest Gnome</button>
                                    <button className="race-button subRace" onClick={this.RockGnome} value='Rock' name='subRace' >Rock Gnome</button>
                                </div>
                            : null}
                        </div>
                        
                        <div className='race-set'>
                            <button className="race-button"  onClick={this.HalfElf} type='radio' name='race' value="Half Elf" >Half-Elf</button>
                        </div>
                        
                        <div className='race-set'>
                            <button className="race-button"  onClick={this.HalfOrc} type='radio' name='race' value="Half Orc" >Half-Orc</button>
                            {this.state.race === 'Half Orc' ? 
                                <div>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'Scarred and Strong'})} name='subRace' value="Scarred and Strong" >Scarred and Strong</button>
                                    <button className="race-button subRace" onClick={()=>this.setState({subRace: 'The Mark of Gruumsh'})} name='subRace' value="The Mark of Gruumsh" >The Mark of Gruumsh</button>
                                </div>
                            : null}
                        </div>
                       
                        <div className='race-set'>
                            <button className="race-button"  onClick={this.Tiefling} type='radio' name='race' value="Tiefling" >Tiefling</button>
                        </div>
                        
                    </div> : null}
                    
                    <div>
                        <h2>you have selected: {this.state.subRace} {this.state.race}</h2>
                        <button id="race-reset-button" className="reset-button" onClick={this.handleReset}>RESET</button>
                        <button id="race-submit-button" className="submit-button" onClick={this.handleSubmit}>SUBMIT</button>
                    </div>
                    
                </div>
            )
        } else {
            return (
                null
            )}
    } 
}

const sendRace = (race) => {
    return ({
        type: 'race',
        payload: race
    })
}

const sendSubRace = (subRace) => {
    return({
        type: 'subRace',
        payload: subRace
    })
}

const updateProgress = () => {
    return({
        type: 'submitRace'
    })
}


const sendStatBonuses = (bonus) => {
    return({
        type: 'statBonus',
        payload: bonus
    })
}

const sendState = (state) => {
    return({
        type: 'RacialBonuses',
        race: state.race,
        subRace: state.subRace,
        abilityScoreIncrease: state.abilityScoreIncrease,
        size: state.size,
        speed: state.speed,
        darkVision: state.darkVision,
        baseFeatures: state.baseFeatures,
        features: state.features
    })
}

const clearStore = () => {
    return({
        type: 'ResetRace',
        payload: defaultState
    })
}

const dispatcher = (type, payload) => {
    return({
        type: type,
        payload: payload
    })
}


const mapStateToProps = state => {
    return{
        details: state.raceDetails,
        progress: state.progress,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        submitRace: (race) => { dispatch(sendRace(race)) },
        submitSubRace: (subRace) => { dispatch(sendSubRace(subRace)) },
        updateProgress: () => { dispatch(updateProgress()) },
        submitStatBonuses: (bonus) => { dispatch(sendStatBonuses(bonus)) },
        submitState: (state) => { dispatch(sendState(state)) },
        dispatch: (type, payload) => { dispatch(dispatcher(type, payload)) },
        resetStore: () => { dispatch(clearStore()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Race)

/*
figure out how to calculate for each subrace:
    skill, tool, saving throw? proficiencies, 


*/ 