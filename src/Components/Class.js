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
        if (window.innerWidth <= 600) {
            //console.log('small screen')
            d3.selectAll(".class-button-wrapper")
             .style("transform", "scale(0.6) translate( -40%, -40% )")
             .style("width", "4em")
             .style("height", "4.5em")
            d3.select("#classSelectors")
            .style("height", "fit-content")
        }
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }

    selectClass(value) {
        //console.log(value.base.class.toLowerCase())
        this.setState(Object.assign(this.state, value))
        d3.selectAll(".classSelector")
            .style("box-shadow", "none")
            .style("filter", "blur(4px)")
            .style("background-color", "gray")
        d3.select(`#${value.base.class.toLowerCase()}`)
            .style("filter", "none")
            .style("background-color", colorWheel.green)
            .style("box-shadow", "0 0 6px "+colorWheel.green)
            .style("box-shadow", "inset 0 0 4px "+colorWheel.green)
            .style("overflow", "show")

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
        
        const scrollDistance = (d3.select("#classSelectors")._groups[0][0].offsetHeight) - 200;

        setTimeout(()=>{
            window.scroll({
                top: scrollDistance,
                behavior: "smooth"
            })
        }, 200)
    
        }

    inputLevel(event) {
        this.setState({level: event.target.value})
    }

    handleSubmit(){
        /*
        d3.selectAll("h1")
            .style("text-shadow", "none")
        d3.select("#display-final")
            .style("text-shadow", "0 0 6px "+colorWheel.green)
        */

        //setTimeout(()=>this.setState({hidden: true}), 1500);
        
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
        return(
            <div id='classSelectors'>
                <audio id="cardFlip" src={cardFlip} preload="auto"></audio>
                <audio id="chipHandle" src={chipHandle} preload="auto" ></audio>
                <audio id="chipStack" src={chipStack} preload="auto" ></audio>
                
                <h1>Select Class</h1>
                
                <div id="class-button-container" >
                    
                        <button id="barbarian" className='classSelector' value='barbarian' onClick={()=>this.selectClass(barbarian)} >
                            <img src={barbarianImg} alt='' />
                            <h2>Barbarian</h2>
                        </button>
                    
                
                        <button id="bard" className='classSelector' value='bard' onClick={()=>this.selectClass(bard)} >
                            <img src={bardImg} alt='' />
                            <h2>Bard</h2>
                        </button>
                    
                        <button id="cleric" className='classSelector' value='cleric' onClick={()=>this.selectClass(cleric)} >
                            <img src={clericImg} alt='' />
                            <h2>Cleric</h2>
                        </button>
    
                        <button id="druid" className='classSelector' value='druid' onClick={()=>this.selectClass(druid)} >
                            <img src={druidImg} alt='' />
                            <h2>Druid</h2>
                        </button>
                    
                        <button id="fighter" className='classSelector' value='fighter' onClick={()=>this.selectClass(fighter)} >
                            <img src={fighterImg} alt='' />
                            <h2>Fighter</h2>
                        </button>
                    
                        <button id="monk" className='classSelector' value='monk' onClick={()=>this.selectClass(monk)} >
                            <img src={monkImg} alt='' />
                            <h2>Monk</h2>
                        </button>
                    
                        <button id="paladin" className='classSelector' value='paladin' onClick={()=>this.selectClass(paladin)} >
                            <img src={paladinImg} alt='' />
                            <h2>Paladin</h2>
                        </button>
                    
                        <button id="ranger" className='classSelector' value='ranger' onClick={()=>this.selectClass(ranger)} >
                            <img src={rangerImg} alt='' />
                            <h2>Ranger</h2>
                        </button>
                    
                        <button id="rogue" className='classSelector' value='rogue' onClick={()=>this.selectClass(rogue)} >
                            <img src={rogueImg} alt='' />
                            <h2>Rogue</h2>
                        </button>
                    
                        <button id="sorcerer" className='classSelector' value='sorcerer' onClick={()=>this.selectClass(sorcerer)} >
                            <img src={sorcererImg} alt='' />
                            <h2>Sorcerer</h2>
                        </button>
                    
                        <button id="warlock" className='classSelector' value='warlock' onClick={()=>this.selectClass(warlock)} >
                            <img src={warlockImg} alt='' />
                            <h2>Warlock</h2>
                        </button>
                    
                        <button id="wizard" className='classSelector' value='wizard' onClick={()=>this.selectClass(wizard)} >
                            <img src={wizardImg} alt='' />
                            <h2>Wizard</h2>
                        </button>
                
                </div>
                <div id="level-section">
                    <h2 id="show-class">class: {this.state.hasOwnProperty("base") && this.state.base.class}</h2>
                    <div id='levels'>
                        <h1 id="level-prompt">Choose {this.state.hasOwnProperty("base") && this.state.base.class} Level</h1>
                   
                        
                            <div id="level-input">
                                <div id="level-input-display"><h1>{this.state.level}</h1></div>
                                <div id="level-increment"><button onClick={()=> this.state.level < 5 && this.setState({level: this.state.level + 1})}><i className="pi pi-caret-up"></i></button></div>
                                <div id="level-decrement"><button onClick={()=> this.state.level > 1 && this.setState({level: this.state.level - 1})}><i className="pi pi-caret-down"></i></button></div>
                            </div>
                        
                        <div>
                            { this.state.base.class !== '' ? <button id="continue-button-classlevel" onClick={this.handleSubmit}>continue</button> : null}
                        </div> 
                    </div>
                </div>
            </div>
            
        )
        
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