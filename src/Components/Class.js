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
            levelInput: 0,
            class: '',
            level: 0,
            multiClass: '',
            multiLevel: 0,
        }
        this.selectClass = this.selectClass.bind(this)
        this.selectLevel = this.selectLevel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        this.props.updateProgress();
    }

    render(){
        return(
            <div id='classSelectors'>
                <h1>Select Class</h1>
                <button className='classSelector' value='barbarian' onClick={()=>{this.selectClass('barbarian')}} >
                    <img src={barbarianImg} alt='' />
                    <h2>Barbarian</h2>
                </button>
                <button className='classSelector' value='bard' onClick={()=>{this.selectClass('bard')}} >
                    <img src={bardImg} alt='' />
                    <h2>Bard</h2>
                </button>
                <button className='classSelector' value='cleric' onClick={()=>{this.selectClass('cleric')}} >
                    <img src={clericImg} alt='' />
                    <h2>Cleric</h2>
                </button>
                <button className='classSelector' value='druid' onClick={()=>{this.selectClass('druid')}} >
                    <img src={druidImg} alt='' />
                    <h2>Druid</h2>
                </button>
                <button className='classSelector' value='fighter' onClick={()=>{this.selectClass('fighter')}} >
                    <img src={fighterImg} alt='' />
                    <h2>Fighter</h2>
                </button>
                <button className='classSelector' value='monk' onClick={()=>{this.selectClass('monk')}} >
                    <img src={monkImg} alt='' />
                    <h2>Monk</h2>
                </button>
                <button className='classSelector' value='paladin' onClick={()=>{this.selectClass('paladin')}} >
                    <img src={paladinImg} alt='' />
                    <h2>Paladin</h2>
                </button>
                <button className='classSelector' value='ranger' onClick={()=>{this.selectClass('ranger')}} >
                    <img src={rangerImg} alt='' />
                    <h2>Ranger</h2>
                </button>
                <button className='classSelector' value='rogue' onClick={()=>{this.selectClass('rogue')}} >
                    <img src={rogueImg} alt='' />
                    <h2>Rogue</h2>
                </button>
                <button className='classSelector' value='sorcerer' onClick={()=>{this.selectClass('sorcerer')}} >
                    <img src={sorcererImg} alt='' />
                    <h2>Sorcerer</h2>
                </button>
                <button className='classSelector' value='warlock' onClick={()=>{this.selectClass('warlock')}} >
                    <img src={warlockImg} alt='' />
                    <h2>Warlock</h2>
                </button>
                <button className='classSelector' value='wizard' onClick={()=>{this.selectClass('wizard')}} >
                    <img src={wizardImg} alt='' />
                    <h2>Wizard</h2>
                </button>
                <h2>class: {this.state.class}</h2>
                {this.state.class !== '' ? 
                    <div id='levels'>
                    <h1>Choose {this.state.class} Level</h1>
                    <label>
                        <input type='number' id='levelInput' onChange={this.handleChange}></input>
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
    }
}

export default connect(null, mapDispatchToProps)(Class)