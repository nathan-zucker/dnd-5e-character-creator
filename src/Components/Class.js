import React from "react";
import { connect } from "react-redux";
import * as d3 from 'd3'
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
import 'primeicons/primeicons.css';

const colorWheel = {
    purple: "#BFABFF",
    yellow: "#ebffab",
    orange: "#ffbfab",
    green: "#abffbf",
}

class Class extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hidden: false,
            level: 1,
            base: {class: ''}
        }
        this.selectClass = this.selectClass.bind(this)
        this.inputLevel = this.inputLevel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        //this.bindSounds()
        d3.selectAll(".class-button-wrapper")
            .style("box-shadow", "0 0 10px "+colorWheel.purple)

        d3.select("h1")
        .style("text-shadow", "0 0 11px "+colorWheel.green)
        
    }

    /*
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
        
        document.getElementById("continue-button-classlevel").addEventListener(('click'), ()=>{
            document.getElementById("chipStack").play()
        })
    }
    */
    

    selectClass(value) {
        this.setState(Object.assign(this.state, value))
        d3.selectAll(".class-button-wrapper")
            .style("box-shadow", "0 0 10px "+colorWheel.purple)
        d3.select(`#${value.base.class.toLowerCase()}`)
            .style("box-shadow", "0 0 15px "+colorWheel.green)
        //d3.select("h1")
          //  .style("text-shadow", "0 0 11px "+colorWheel.yellow)
        d3.select("#level-section")
            .style("visibility", "visible")
            .transition()
            .style("opacity", 1)
        d3.select("#show-class")
            .style("text-shadow", "0 0 4px "+colorWheel.purple)
        d3.select("#level-prompt")
            .style("text-shadow", "0 0 6px "+colorWheel.green)
        d3.select("#display-final")
            .style("text-shadow", "0 0 6px "+colorWheel.yellow)
        d3.select("#level-input")
            .style("box-shadow", "0 0 7px "+colorWheel.green)
            .style("text-shadow", "0 0 4px "+colorWheel.green)
    }

    inputLevel(event) {
        this.setState({level: event.target.value})
    }

    handleSubmit(){

        d3.selectAll("h1")
            .style("text-shadow", "none")
        d3.select("#display-final")
            .style("text-shadow", "0 0 6px "+colorWheel.green)

        setTimeout(()=>this.setState({hidden: true}), 500);
        
        const inputClass = Object.assign({}, this.state)
        delete inputClass.hidden
        delete inputClass.level

        const features = [];
        for(let i=1; i<=this.state.level; i++){
            inputClass[i].hasOwnProperty("features") && features.push(...inputClass[i].features)
        }

        const output = Object.assign({}, inputClass.base, inputClass[this.state.level], {
            features: features,
            subClasses: inputClass.subClasses,
            subClasses2: inputClass.subClasses2 || null
        })
        
        const classDetails = Object.assign({}, output)
        delete classDetails.class
        delete classDetails.features
        delete classDetails.hitDie
        delete classDetails.armor
        delete classDetails.weapons
        delete classDetails.savingThrows

        if (classDetails.hasOwnProperty("spellCasting")){
            this.props.dispatch("updateSpells", classDetails.spellCasting);
            delete classDetails.spellCasting;
        }
        if (classDetails.hasOwnProperty("equipment")) {
            this.props.dispatch('addEquipmentArray', classDetails.equipment);
            delete classDetails.equipment;
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
                
                <div id="class-button-container" >
                    
                    <div className="class-button-wrapper" id="barbarian">
                        <button className='classSelector' value='barbarian' onClick={()=>this.selectClass(barbarian)} >
                            <img src={barbarianImg} alt='' />
                            <h2>Barbarian</h2>
                        </button>
                    </div>
                
                    <div className="class-button-wrapper" id="bard">
                        <button className='classSelector' value='bard' onClick={()=>this.selectClass(bard)} >
                            <img src={bardImg} alt='' />
                            <h2>Bard</h2>
                        </button>
                    </div>
                    <div className="class-button-wrapper" id="cleric">
                        <button className='classSelector' value='cleric' onClick={()=>this.selectClass(cleric)} >
                            <img src={clericImg} alt='' />
                            <h2>Cleric</h2>
                        </button>
                    </div>
    
                    <div className="class-button-wrapper" id="druid">
                        <button className='classSelector' value='druid' onClick={()=>this.selectClass(druid)} >
                            <img src={druidImg} alt='' />
                            <h2>Druid</h2>
                        </button>
                    </div>
                    
                    <div className="class-button-wrapper" id="fighter">
                        <button className='classSelector' value='fighter' onClick={()=>this.selectClass(fighter)} >
                            <img src={fighterImg} alt='' />
                            <h2>Fighter</h2>
                        </button>
                    </div>
                    
                    <div className="class-button-wrapper" id="monk">
                        <button className='classSelector' value='monk' onClick={()=>this.selectClass(monk)} >
                            <img src={monkImg} alt='' />
                            <h2>Monk</h2>
                        </button>
                    </div>
                    
                    <div className="class-button-wrapper" id="paladin">
                        <button className='classSelector' value='paladin' onClick={()=>this.selectClass(paladin)} >
                            <img src={paladinImg} alt='' />
                            <h2>Paladin</h2>
                        </button>
                    </div>
                    
                    <div className="class-button-wrapper" id="ranger">
                        <button className='classSelector' value='ranger' onClick={()=>this.selectClass(ranger)} >
                            <img src={rangerImg} alt='' />
                            <h2>Ranger</h2>
                        </button>
                    </div>
                    
                    <div className="class-button-wrapper" id="rogue">
                        <button className='classSelector' value='rogue' onClick={()=>this.selectClass(rogue)} >
                            <img src={rogueImg} alt='' />
                            <h2>Rogue</h2>
                        </button>
                    </div>
                    
                    <div className="class-button-wrapper" id="sorcerer">
                        <button className='classSelector' value='sorcerer' onClick={()=>this.selectClass(sorcerer)} >
                            <img src={sorcererImg} alt='' />
                            <h2>Sorcerer</h2>
                        </button>
                    </div>
                    
                    <div className="class-button-wrapper" id="warlock">
                        <button className='classSelector' value='warlock' onClick={()=>this.selectClass(warlock)} >
                            <img src={warlockImg} alt='' />
                            <h2>Warlock</h2>
                        </button>
                    </div>
                    
                    <div className="class-button-wrapper" id="wizard">
                        <button className='classSelector' value='wizard' onClick={()=>this.selectClass(wizard)} >
                            <img src={wizardImg} alt='' />
                            <h2>Wizard</h2>
                        </button>
                    </div>
                
                </div>
                <div id="level-section">
                    <h2 id="show-class">class: {this.state.hasOwnProperty("base") && this.state.base.class}</h2>
                    <div id='levels'>
                        <h1 id="level-prompt">Choose {this.state.hasOwnProperty("base") && this.state.base.class} Level</h1>
                   
                        <label for="level-input">
                            <div id="level-input">
                                <div id="level-input-display"><h1>{this.state.level}</h1></div>
                                <button id="level-input-increment" onClick={()=> this.state.level < 5 && this.setState({level: this.state.level + 1})}><i className="pi pi-caret-up"></i></button>
                                <button id="level-input-decrement" onClick={()=> this.state.level > 1 && this.setState({level: this.state.level - 1})}><i className="pi pi-caret-down"></i></button>
                            </div>
                        </label>
                        <div>
                            { this.state.base.class !== '' ? <button id="continue-button-classlevel" onClick={this.handleSubmit}>continue</button> : null}
                        </div> 
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