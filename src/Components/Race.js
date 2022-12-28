import React from "react"
import { connect } from "react-redux"
import  AbilityHuman from "./AbilityHuman"
import SkillHuman from "./SkillHuman"
import FeatHuman from "./FeatHuman"

const defaultState = {
    race: '',
    subRace: '',
    abilityScoreIncrease: undefined,
    age: undefined,
    alignment: undefined,
    size: '',
    speed: 0,
    languages: undefined,
    darkVision: false,
    baseFeatures: undefined,
    features: undefined,
    finalized: false
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
                languages: [],
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
                features: [...state.baseFeatures, 'Dwarven Toughness']
            }
        })
    }

    MountainDwarf() {
        this.setState((state)=>{
            return{
                subRace: 'Mountain',
                abilityScoreIncrease: [2,0,2,0,0,0],
                features: [...state.baseFeatures, 'Dwarven Armor Training']
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
                baseFeatures: ['Keen Senses', 'Fey Ancestry', 'Trance']
            }
        })
    }

    HighElf() {
        this.setState((state)=>{
            return{
                subRace: 'High',
                abilityScoreIncrease: [0,2,0,1,0,0],
                features: [...state.baseFeatures, 'Elf Weapon Training', 'Cantrip', 'Extra Language'],
            }
        })
    }

    WoodElf() {
        this.setState((state)=>{
            return{
                subRace: 'Wood',
                abilityScoreIncrease: [0,2,0,0,1,0],
                features: [...state.baseFeatures, 'Elf Weapon Training', 'Fleet of Foot', 'Mask of the Wild']
            }
        })
    }

    DarkElf() {
        this.setState((state)=>{
            return {
                subRace: 'Dark',
                abilityScoreIncrease: [0,2,0,0,0,1],
                features: [...state.baseFeatures, 'Drow Weapon Training', 'Superior Darkvision', 'Sunlight Sensitivity', 'Drow Magic']
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
            languages: ['Common', 'PICKONE']
        })
    }

    AbilityHuman(){
        this.setState({
            subRace: 'Ability',
            abilityScoreIncrease: undefined,
        })
    }

    SkillHuman(){
        this.setState({
            subRace: 'Skill',
            abilityScoreIncrease: [0,0,0,0,0,0],
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
                features: [...state.baseFeatures, 'Natural Illusionist', 'Speak with Small Beasts']
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
            languages: ['Common', 'Elvish', 'PICKONE'],
            features: ['Fey Ancestry', 'Skill Verstility']
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
            features: ['Menacing', 'Relentless Endurance', 'Savage Attacks']
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
        const state = Object.assign({}, this.state)
        Object.keys(state).forEach(key => state[key] === undefined && delete state[key])
        this.props.submitState(state)
        this.props.updateProgress()
    }

    handleReset(){
        alert('resetting (click handler)')
        return (
            this.props.resetStore()
        )
    }

    render(){
        if (!this.props.progress.includes('race')) {
            return(
                <div>
                    <h1>Select Race</h1>
                    {this.props.details.finalized === false ?
                    <div id='container'>
                        
                        <div className='nestedRadio'>
                            <label>
                                <input onInput={this.Dwarf} type='radio' name='race'></input>
                                Dwarf
                            </label>
                            {this.state.race === 'Dwarf' ? 
                                <div>
                                    <label>
                                        <input onInput={this.HillDwarf} type = 'radio' value='hill' name='subRace'></input>
                                        Hill Dwarf
                                    </label>
                                    <label>
                                        <input onInput={this.MountainDwarf} type = 'radio' value='mountain' name='subRace'></input>
                                        Mountain Dwarf
                                    </label>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onInput={this.Elf} type='radio' name='race'></input>
                                Elf
                            </label>
                            {this.state.race === 'Elf' ? 
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.HighElf} type='radio' name='subRace'></input>
                                            High Elf
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.WoodElf} type='radio' name='subRace'></input>
                                            Wood Elf
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onInput={this.Halfling} type='radio' name='race'></input>
                                Halfing
                            </label>
                            {this.state.race === 'Halfling' ?
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.LightfootHalfling} type='radio' name='subRace'></input>
                                            Lightfoot
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.StoutHalfling} type='radio' name='subRace'></input>
                                            Stout
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onInput={this.Human} type='radio' name='race'></input>
                                Human
                            </label>
                            {this.state.race === 'Human' ?
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.AbilityHuman} type='radio' name='subRace'></input>
                                            Ability Score Increase
                                        </label>
                                        {this.state.subRace === 'Ability' ? <AbilityHuman bonuses={this.state.abilityScoreIncrease}/> : null}
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.SkillHuman} type='radio' name='subRace'></input>
                                            Skill
                                        </label>
                                        {this.state.subRace === 'Skill' ? <SkillHuman/> : null}
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.FeatHuman} type='radio' name='subRace'></input>
                                            Feat
                                        </label>
                                        {this.state.subRace === 'Feat' ? <FeatHuman raceDetails={this.state}/> : null}
                                    </div>
                                </div>
                            : null }
                        </div>
                        <div className='radio'>
                            <label>
                                <input onInput={this.Dragonborn} type='radio' name='race'></input>
                                Dragonborn
                            </label>
                            {this.state.race === 'Dragonborn' ?
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={()=>this.setState({subRace: 'Black'})} type='radio' name='subRace' ></input>
                                            Black
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={()=>this.setState({subRace: 'Blue'})} type='radio' name='subRace' ></input>
                                            Blue
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={()=>this.setState({subRace: 'Brass'})} type='radio' name='subRace' ></input>
                                            Brass
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={()=>this.setState({subRace: 'Bronze'})} type='radio' name='subRace' ></input>
                                            Bronze
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={()=>this.setState({subRace: 'Copper'})} type='radio' name='subRace' ></input>
                                            Copper
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={()=>this.setState({subRace: 'Gold'})} type='radio' name='subRace' ></input>
                                            Gold
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={()=>this.setState({subRace: 'Green'})} type='radio' name='subRace' ></input>
                                            Green
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={()=>this.setState({subRace: 'Red'})} type='radio' name='subRace' ></input>
                                            Red
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={()=>this.setState({subRace: 'Silver'})} type='radio' name='subRace'></input>
                                            Silver
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={()=>this.setState({subRace: 'White'})} type='radio' name='subRace'></input>
                                            White
                                        </label>
                                    </div>
                                </div>
                            : null}
                            </div>
                        <div className='radio'>
                            <label>
                                <input onInput={this.Gnome} type='radio' name='race'></input>
                                Gnome
                            </label>
                            {this.state.race === 'Gnome' ? 
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.ForestGnome} type='radio' name='subRace' ></input>
                                            Forest
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.RockGnome} type='radio' name='subRace' ></input>
                                            Rock
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onInput={this.HalfElf} type='radio' name='race'></input>
                                Half-Elf
                            </label>
                        </div>
                        <div className='radio'>
                            <label>
                                <input onInput={this.HalfOrc} type='radio' name='race'></input>
                                Half-Orc
                            </label>
                            {this.state.race === 'Half-Orc' ? 
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.setState({subRace: 'Scarred and Strong'})} type='radio' name='subRace'></input>
                                            Scarred and Strong
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onInput={this.setState({subRace: 'The Mark of Gruumsh'})} type='radio' name='subRace' ></input>
                                            The Mark of Gruumsh
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onInput={this.Tiefling} type='radio' name='race'></input>
                                Tiefling
                            </label>
                        </div> 
                    </div> : null}
                    {this.state.race !== '' ?
                    <div>
                        <h2>you have selected: {this.state.subRace} {this.state.race}</h2>
                        <h2>Race Bonus (stats): {this.props.details.abilityScoreIncrease}</h2>
                        <h3>features</h3>
                        <button onClick={this.handleReset}>RESET</button>
                        <button onClick={this.handleSubmit}>SUBMIT</button>
                    </div>
                    : null}
                </div>
            )
        } else {
            return (
                <div>
                    <h2>submit bonuses</h2>
                    <button onClick={this.handleReset}>RESET</button>
                    <button onClick={this.handleSubmit}>SUBMIT</button>
                </div>
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
        languages: state.languages,
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
        resetStore: () => { dispatch(clearStore()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Race)

/*
figure out how to calculate for each subrace:
    skill, tool, saving throw? proficiencies, 


*/ 