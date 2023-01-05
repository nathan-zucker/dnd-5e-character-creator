import React from "react";
import { connect } from "react-redux";
import './Class.css';
import barbarianImg from './images/barbarian.png';
import bardImg from './images/Bard.png';
import clericImg from './images/Cleric.png';
import druidImg from './images/Druid.png';
import fighterImg from './images/Fighter.png';
import monkImg from './images/Monk.png';
import paladinImg from './images/Paladin.png';
import rangerImg from './images/Ranger.png';
import rogueImg from './images/Rogue.png';
import sorcererImg from './images/Sorcerer.png';
import warlockImg from './images/Warlock.png';
import wizardImg from './images/Wizard.png';


class Class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            levelInput: 1,
            class: '',
            level: 0,
            hitDie: 0,
            primaryAbility: [],
            savingThrows: [],
            armor: [],
            weapons: []
        }
        this.selectClass = this.selectClass.bind(this)
        this.selectLevel = this.selectLevel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.Barbarian = this.Barbarian.bind(this)
        this.Bard = this.Bard.bind(this)
        this.Cleric = this.Cleric.bind(this)
        this.Druid = this.Druid.bind(this)
        this.Fighter = this.Fighter.bind(this)
        this.Monk = this.Monk.bind(this)
        this.Paladin = this.Paladin.bind(this)
        this.Ranger = this.Ranger.bind(this)
        this.Rogue = this.Rogue.bind(this)
        this.Sorcerer = this.Sorcerer.bind(this)
        this.Warlock = this.Warlock.bind(this)
        this.Wizard = this.Wizard.bind(this)
    }

    selectClass(value) {
        this.setState({class: value})
    }

    selectLevel(){
        this.setState({level: this.state.levelInput})
    }

    handleChange(event) {
        this.setState({levelInput: event.target.value})
    }

    handleSubmit(){
        this.props.updateClassLevel([this.state.class, this.state.level]);
        this.props.dispatchHitDie(this.state.hitDie)
        for (let i=0; i<this.state.savingThrows.length; i++){
            this.props.dispatchSave(this.state.savingThrows[i])
        }
        this.props.dispatchArmor(this.state.armor)
        this.props.dispatchWeapons(this.state.weapons)
        this.props.updateProgress();
    }

    Barbarian(){
        this.setState({
            class: 'Barbarian',
            hitDie: 12,
            primaryAbility: ['Strength'],
            savingThrows: ['Strength', 'Constitution'],
            armor: ['light', 'medium'],
            weapons: ['simple', 'martial']
        })
    }

    Bard(){
        this.setState({
            class: 'Bard',
            hitDie: 8,
            primaryAbility: ['Charisma'],
            savingThrows: ["Dexterity", 'Charisma'],
            armor: ['light'],
            weapons: ['simple', 'hand crossbow', 'longsword', 'rapier', 'shortsword']
        })
    }

    Cleric(){
        this.setState({
            class: 'Cleric',
            hitDie: 8,
            primaryAbility: ['Wisdom'],
            savingThrows: ['Wisdom', 'Charisma'],
            armor: ['light', 'medium', 'shield', '*non-metal'],
            weapons: ['simple']
        })
    }

    Druid(){
        this.setState({
            class: 'Druid',
            hitDie: 8,
            primaryAbility: ["Wisdom"],
            savingThrows: ["Intelligence", "Wisdom"],
            armor: ['light', 'medium', 'shield'],
            weapons: ['club', 'dagger', 'dart', 'javelin', 'mace', 'quarterstaff', 'scimitar', 'sickle', 'sling', 'spear']
        })
    }

    Fighter(){
        this.setState({
            class: "Fighter",
            hitDie: 10,
            primaryAbility: ['Strength/Dexterity'],
            savingThrows: ["Strength", "Constitution"],
            armor: ['shield', 'light', 'medium', 'heavy'],
            weapons: ['simple', 'martial']
        })
    }

    Monk(){
        this.setState({
            class: 'Monk',
            hitDie: 8,
            primaryAbility: ["Dexterity", "Wisdom"],
            savingThrows: ["Strength", "Dexterity"],
            armor: [],
            weapons: ['simple', 'shortsword']
        })
    }

    Paladin(){
        this.setState({
            class: "Paladin",
            hitDie: 10,
            primaryAbility: ['Strength', 'Charisma'],
            savingThrows: ['Wisdom', 'Charisma'],
            armor: ['shield', 'light', 'medium', 'heavy'],
            weapons: ['simple', 'martial']
        })
    }

    Ranger(){
        this.setState({
            class: "Ranger",
            hitDie: 10,
            primaryAbility: ["Dexterity", "Wisdom"],
            savingThrows: ['Strength', "Dexterity"],
            armor: ['light', 'medium'],
            weapons: ['simple', 'martial']
        })
    }

    Rogue(){
        this.setState({
            class: "Rogue",
            hitDie: 8,
            primaryAbility: ['Dexterity'],
            savingThrows: ["Dexterity", "Intelligence"],
            armor: ['light', 'medium'],
            weapons: ['simple', 'hand crossbow', 'longsword', 'rapier', 'shortsword']
        })
    }

    Sorcerer(){
        this.setState({
            class: "Sorcerer",
            hitDie: 6,
            primaryAbility: ['Charisma'],
            savingThrows: ['Constitution', 'Charisma'],
            armor: [],
            weapons: ['dagger', 'dart', 'sling', 'quarterstaff', 'light crossbow']
        })
    }

    Warlock(){
        this.setState({
            class: "Warlock",
            hitDie: 8,
            primaryAbility: "Charisma",
            savingThrows: ["Wisdom", "Charisma"],
            armor: ["light"],
            weapons: ['simple']
        })
    }

    Wizard(){
        this.setState({
            class: "Wizard",
            hitDie: 6,
            primaryAbility: "Intelligence",
            savingThrows: ["Intelligence", "Wisdom"],
            armor: [],
            weapons: ['dagger', 'dart', 'sling', 'quarterstaff', 'light crossbow']
        })
    }

    render(){
        return(
            <div id='classSelectors'>
                <h1>Select Class</h1>
                <button className='classSelector' value='barbarian' onClick={this.Barbarian} >
                    <img src={barbarianImg} alt='' />
                    <h2>Barbarian</h2>
                </button>
                <button className='classSelector' value='bard' onClick={this.Bard} >
                    <img src={bardImg} alt='' />
                    <h2>Bard</h2>
                </button>
                <button className='classSelector' value='cleric' onClick={this.Cleric} >
                    <img src={clericImg} alt='' />
                    <h2>Cleric</h2>
                </button>
                <button className='classSelector' value='druid' onClick={this.Druid} >
                    <img src={druidImg} alt='' />
                    <h2>Druid</h2>
                </button>
                <button className='classSelector' value='fighter' onClick={this.Fighter} >
                    <img src={fighterImg} alt='' />
                    <h2>Fighter</h2>
                </button>
                <button className='classSelector' value='monk' onClick={this.Monk} >
                    <img src={monkImg} alt='' />
                    <h2>Monk</h2>
                </button>
                <button className='classSelector' value='paladin' onClick={this.Paladin} >
                    <img src={paladinImg} alt='' />
                    <h2>Paladin</h2>
                </button>
                <button className='classSelector' value='ranger' onClick={this.Ranger} >
                    <img src={rangerImg} alt='' />
                    <h2>Ranger</h2>
                </button>
                <button className='classSelector' value='rogue' onClick={this.Rogue} >
                    <img src={rogueImg} alt='' />
                    <h2>Rogue</h2>
                </button>
                <button className='classSelector' value='sorcerer' onClick={this.Sorcerer} >
                    <img src={sorcererImg} alt='' />
                    <h2>Sorcerer</h2>
                </button>
                <button className='classSelector' value='warlock' onClick={this.Warlock} >
                    <img src={warlockImg} alt='' />
                    <h2>Warlock</h2>
                </button>
                <button className='classSelector' value='wizard' onClick={this.Wizard} >
                    <img src={wizardImg} alt='' />
                    <h2>Wizard</h2>
                </button>
                <h2>class: {this.state.class}</h2>
                {this.state.class !== '' ? 
                    <div id='levels'>
                    <h1>Choose {this.state.class} Level</h1>
                    <label>
                        <input type='number' id='levelInput' onChange={this.handleChange} value={this.levelInput}></input>
                        level (1-20)
                    </label>
                    <input type='submit' onClick={()=>this.setState({level: this.state.levelInput})}></input>
                    <h2>{this.state.class} {this.state.level}</h2>
                    <div>
                        <button onClick={this.handleSubmit}>continue</button>
                    </div> 
                </div>: null}
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProgress: () => { dispatch({type: 'submitClassLevel'}) },
        updateClassLevel: (classLevel) => { dispatch({type: 'classLevel', payload: classLevel}) },
        dispatchHitDie: (hitDie) => { dispatch({type: 'hitDie', payload: hitDie}) },
        dispatchSave: (stat) => { dispatch({type: 'saveProficiency', payload: stat}) },
        dispatchArmor: (armor) => { dispatch({type: 'armorProficiency', payload: armor}) },
        dispatchWeapons: (weapons) => { dispatch({type: 'weaponProficiency', payload: weapons}) }
    }
}

export default connect(null, mapDispatchToProps)(Class)