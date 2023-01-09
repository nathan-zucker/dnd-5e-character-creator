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
import cardFlip from './sounds/cardFlip.wav';
import chipHandle from './sounds/chipsHandle1.wav';
import chipStack from './sounds/chipsStack1.wav';
import barbarian, {
    bard,
    cleric,
    druid,
    fighter,
    monk,
    paladin,
    rogue,
    ranger,
    sorcerer,
    warlock,
    wizard
} from './ClassData.jsx';

class Class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hidden: false,
            level: 1,
        }
        this.selectClass = this.selectClass.bind(this)
        this.inputLevel = this.inputLevel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.bindSounds()
    }

    bindSounds = () => {
        let buttons = document.querySelectorAll(".classSelector")
        let buttonsArray = Array.prototype.slice.call(buttons)
        buttonsArray.forEach((e)=>{
            e.addEventListener(('click'), () => {
                document.getElementById('cardFlip').play()
            })
        })
        document.getElementById('levelInput').addEventListener(('click'), ()=>{
            const e = document.getElementById('chipHandle')
            e.currentTime =0
            e.play()
        })
        document.getElementById("continueButton").addEventListener(('click'), ()=>{
            document.getElementById("chipStack").play()
        })
    }

    selectClass(value) {
        this.setState(Object.assign(this.state, value))
        console.log(this.state)
    }

    inputLevel(event) {
        this.setState({level: event.target.value})
    }

    handleSubmit(){
        setTimeout(()=>this.setState({hidden: true}), 500);
        
        const inputClass = Object.assign({}, this.state)
        delete inputClass.hidden
        delete inputClass.level

        const features = [];
        for(let i=1; i<=this.state.level; i++){
            inputClass[i].hasOwnProperty("features") && features.push(...inputClass[i].features)
        }

        const output = Object.assign({}, inputClass.base, inputClass[this.state.level], {
            features: features
        })
        
        const classDetails = Object.assign({}, output)
        delete classDetails.class
        delete classDetails.features
        delete classDetails.hitDie
        delete classDetails.armor
        delete classDetails.weapons
        delete classDetails.savingThrows

        if (classDetails.hasOwnProperty("spellCasting")){
            this.props.dispatch("updateSpells", classDetails.spellCasting)
        }

        this.props.dispatchFeatures(output.features)
        this.props.dispatchHitDie(output.hitDie)
        this.props.dispatchClassLevel([output.class, this.state.level])
        this.props.dispatchArmor(output.armor)
        this.props.dispatchWeapons(output.weapons)
        this.props.dispatchSave(output.savingThrows)
        this.props.dispatchClassDetails(classDetails)
        this.props.updateProgress()

    }



    render(){
        if(this.state.hidden === true){
            return null
        } else{
        return(
            <div id='classSelectors'>
                <audio id="cardFlip" src={cardFlip} preload="auto"></audio>
                <audio id="chipHandle" src={chipHandle} preload="auto" ></audio>
                <audio id="chipStack" src={chipStack} preload="auto" ></audio>
                <h1>Select Class</h1>
                <button className='classSelector' value='barbarian' onClick={()=>this.selectClass(barbarian)} >
                    <img src={barbarianImg} alt='' />
                    <h2>Barbarian</h2>
                </button>
                <button className='classSelector' value='bard' onClick={()=>this.selectClass(bard)} >
                    <img src={bardImg} alt='' />
                    <h2>Bard</h2>
                </button>
                <button className='classSelector' value='cleric' onClick={()=>this.selectClass(cleric)} >
                    <img src={clericImg} alt='' />
                    <h2>Cleric</h2>
                </button>
                <button className='classSelector' value='druid' onClick={()=>this.selectClass(druid)} >
                    <img src={druidImg} alt='' />
                    <h2>Druid</h2>
                </button>
                <button className='classSelector' value='fighter' onClick={()=>this.selectClass(fighter)} >
                    <img src={fighterImg} alt='' />
                    <h2>Fighter</h2>
                </button>
                <button className='classSelector' value='monk' onClick={()=>this.selectClass(monk)} >
                    <img src={monkImg} alt='' />
                    <h2>Monk</h2>
                </button>
                <button className='classSelector' value='paladin' onClick={()=>this.selectClass(paladin)} >
                    <img src={paladinImg} alt='' />
                    <h2>Paladin</h2>
                </button>
                <button className='classSelector' value='ranger' onClick={()=>this.selectClass(ranger)} >
                    <img src={rangerImg} alt='' />
                    <h2>Ranger</h2>
                </button>
                <button className='classSelector' value='rogue' onClick={()=>this.selectClass(rogue)} >
                    <img src={rogueImg} alt='' />
                    <h2>Rogue</h2>
                </button>
                <button className='classSelector' value='sorcerer' onClick={()=>this.selectClass(sorcerer)} >
                    <img src={sorcererImg} alt='' />
                    <h2>Sorcerer</h2>
                </button>
                <button className='classSelector' value='warlock' onClick={()=>this.selectClass(warlock)} >
                    <img src={warlockImg} alt='' />
                    <h2>Warlock</h2>
                </button>
                <button className='classSelector' value='wizard' onClick={()=>this.selectClass(wizard)} >
                    <img src={wizardImg} alt='' />
                    <h2>Wizard</h2>
                </button>
                <h2>class: {this.state.hasOwnProperty("base") && this.state.base.class}</h2>
                    <div id='levels'>
                    <h1>Choose {this.state.hasOwnProperty("base") && this.state.base.class} Level</h1>
                    <label>
                        <input type='number' id='levelInput' onChange={this.inputLevel} value={this.state.level} min="1" max="5"></input>
                        level (1-5)
                    </label>
                    <h2>{this.state.class} {this.state.level}</h2>
                    <div>
                        <button id="continueButton" onClick={this.handleSubmit}>continue</button>
                    </div> 
                </div>
            </div>
            
        )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProgress: () => { dispatch({type: 'submitClassLevel'}) },
        dispatchClassLevel: (classLevel) => { dispatch({type: 'classLevel', payload: classLevel}) },
        dispatchHitDie: (hitDie) => { dispatch({type: 'hitDie', payload: hitDie}) },
        dispatchSave: (stat) => { dispatch({type: 'saveProficiency', payload: stat}) },
        dispatchArmor: (armor) => { dispatch({type: 'armorProficiency', payload: armor}) },
        dispatchWeapons: (weapons) => { dispatch({type: 'weaponProficiency', payload: weapons}) },
        dispatchFeatures: (features) => { dispatch({type: 'addFeatureArray', payload: features}) },
        dispatchClassDetails: (details) => { dispatch({type: 'classDetails', payload: details}) },
        dispatch: (type, payload) => { dispatch({type: type, payload: payload}) }
    }
}

export default connect(null, mapDispatchToProps)(Class)