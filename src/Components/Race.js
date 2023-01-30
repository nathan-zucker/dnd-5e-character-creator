import React from "react"
import { connect } from "react-redux"
//  import  AbilityHuman from "./AbilityHuman"
//  import SkillHuman from "./SkillHuman"
//  import FeatHuman from "./FeatHuman"
import selectorAudio from './sounds/selector1.wav';
import resetAudio from './sounds/chipsStack3.wav';
import submitAudio from './sounds/chipsStack1.wav';

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
    }

    componentDidUpdate(){
        if(this.state.hidden === false){
            this.bindSounds()
        }
    }

    bindSounds = () => {
        let buttons = document.querySelectorAll(".radioButton")
        let buttonsArray = Array.prototype.slice.call(buttons)
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
        return (
            this.props.resetStore()
        )
    }

    render(){
        if (this.state.hidden === false) {
            return(
                <div>
                    <audio id="radioAudio" src={selectorAudio} preload="auto" ></audio>
                    <audio id="resetAudio" src={resetAudio} preload="auto" ></audio>
                    <audio id="submitAudio" src={submitAudio} preload="auto" ></audio>
                    <h1>Select Race</h1>
                    {this.props.details.finalized === false ?
                    <div id='container'>
                        
                        <div className='radio'>
                            <label>
                                <input className='radioButton' onInput={this.Dwarf} type='radio' name='race'></input>
                                Dwarf
                            </label>
                            {this.state.race === 'Dwarf' ? 
                                <div>
                                    <label>
                                        <input className='radioButton' onInput={this.HillDwarf} type = 'radio' value='hill' name='subRace'></input>
                                        Hill Dwarf
                                    </label>
                                    <label>
                                        <input className='radioButton' onInput={this.MountainDwarf} type = 'radio' value='mountain' name='subRace'></input>
                                        Mountain Dwarf
                                    </label>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input className='radioButton' onInput={this.Elf} type='radio' name='race'></input>
                                Elf
                            </label>
                            {this.state.race === 'Elf' ? 
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.HighElf} type='radio' name='subRace'></input>
                                            High Elf
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.WoodElf} type='radio' name='subRace'></input>
                                            Wood Elf
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input className='radioButton' onInput={this.Halfling} type='radio' name='race'></input>
                                Halfing
                            </label>
                            {this.state.race === 'Halfling' ?
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.LightfootHalfling} type='radio' name='subRace'></input>
                                            Lightfoot
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.StoutHalfling} type='radio' name='subRace'></input>
                                            Stout
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input className='radioButton' onInput={this.Human} type='radio' name='race'></input>
                                Human
                            </label>
                            {this.state.race === 'Human' ?
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.AbilityHuman} type='radio' name='subRace'></input>
                                            Ability Score Increase
                                        </label>
                                        {/*{this.state.subRace === 'Ability' ? <AbilityHuman bonuses={this.state.abilityScoreIncrease}/> : null}*/}
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.SkillHuman} type='radio' name='subRace'></input>
                                            Skill
                                        </label>
                                        {/*{this.state.subRace === 'Skill' ? <SkillHuman/> : null}*/}
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.FeatHuman} type='radio' name='subRace'></input>
                                            Feat
                                        </label>
                                        {/*{this.state.subRace === 'Feat' ? <FeatHuman raceDetails={this.state}/> : null}*/}
                                    </div>
                                </div>
                            : null }
                        </div>
                        <div className='radio'>
                            <label>
                                <input className='radioButton' onInput={this.Dragonborn} type='radio' name='race'></input>
                                Dragonborn
                            </label>
                            {this.state.race === 'Dragonborn' ?
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={()=>this.setState({subRace: 'Black'})} type='radio' name='subRace' ></input>
                                            Black
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={()=>this.setState({subRace: 'Blue'})} type='radio' name='subRace' ></input>
                                            Blue
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={()=>this.setState({subRace: 'Brass'})} type='radio' name='subRace' ></input>
                                            Brass
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={()=>this.setState({subRace: 'Bronze'})} type='radio' name='subRace' ></input>
                                            Bronze
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={()=>this.setState({subRace: 'Copper'})} type='radio' name='subRace' ></input>
                                            Copper
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={()=>this.setState({subRace: 'Gold'})} type='radio' name='subRace' ></input>
                                            Gold
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={()=>this.setState({subRace: 'Green'})} type='radio' name='subRace' ></input>
                                            Green
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={()=>this.setState({subRace: 'Red'})} type='radio' name='subRace' ></input>
                                            Red
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={()=>this.setState({subRace: 'Silver'})} type='radio' name='subRace'></input>
                                            Silver
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={()=>this.setState({subRace: 'White'})} type='radio' name='subRace'></input>
                                            White
                                        </label>
                                    </div>
                                </div>
                            : null}
                            </div>
                        <div className='radio'>
                            <label>
                                <input className='radioButton' onInput={this.Gnome} type='radio' name='race'></input>
                                Gnome
                            </label>
                            {this.state.race === 'Gnome' ? 
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.ForestGnome} type='radio' name='subRace' ></input>
                                            Forest
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.RockGnome} type='radio' name='subRace' ></input>
                                            Rock
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input className='radioButton' onInput={this.HalfElf} type='radio' name='race'></input>
                                Half-Elf
                            </label>
                        </div>
                        <div className='radio'>
                            <label>
                                <input className='radioButton' onInput={this.HalfOrc} type='radio' name='race'></input>
                                Half-Orc
                            </label>
                            {this.state.race === 'Half-Orc' ? 
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.setState({subRace: 'Scarred and Strong'})} type='radio' name='subRace'></input>
                                            Scarred and Strong
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input className='radioButton' onInput={this.setState({subRace: 'The Mark of Gruumsh'})} type='radio' name='subRace' ></input>
                                            The Mark of Gruumsh
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input className='radioButton' onInput={this.Tiefling} type='radio' name='race'></input>
                                Tiefling
                            </label>
                        </div> 
                    </div> : null}
                    
                    <div>
                        <h2>you have selected: {this.state.subRace} {this.state.race}</h2>
                        <h2>Race Bonus (stats): {this.props.details.abilityScoreIncrease}</h2>
                        <h3>features</h3>
                        <button id="resetButton" onClick={this.handleReset}>RESET</button>
                        <button id="submitButton" onClick={this.handleSubmit}>SUBMIT</button>
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