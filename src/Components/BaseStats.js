import React from "react";
import RollCard from "./RollCard";
import BaseStatList from "./BaseStatList";
import { connect } from "react-redux";
import Dice from "./DiceAnimation/Dice";
import dieThrow from './sounds/dieThrow1.wav';
import dieShuffle from './sounds/dieShuffle2.wav';
import resetAudio from './sounds/chipsStack3.wav';
import submitAudio from './sounds/chipsStack1.wav';
import AbilityScordIncrease from "./AbilityScoreIncrease";
import AbilityScores from "./AbilityScores";
import { select, selectAll } from "d3";

const colorWheel = {
  purple: "#BFABFF",
  yellow: "#ebffab",
  orange: "#ffbfab",
  green: "#abffbf",
}

class BaseStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      input: "",
      preRoll: [],
      Rolls: [],
      diceRolls: 0,
      modifiers: undefined,
      rollsAccepted: false,
      submitDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.roll = this.roll.bind(this);
    this.submitRoll = this.submitRoll.bind(this);
    this.resetRolls = this.resetRolls.bind(this);
    this.acceptRolls = this.acceptRolls.bind(this);
    this.standardArray = this.standardArray.bind(this);
  }

  componentDidMount(){
    this.bindSounds()
    select("#rollDice")
      .style("border", "2px solid "+colorWheel.green)
      .style("box-shadow", "0 0 4px "+colorWheel.green)
    
    const scrollTop = select("#enter-rolls")._groups[0][0].clientHeight - 0.75 * (window.innerHeight);    
    setTimeout(()=>{
      window.scroll({
        top: scrollTop,
        behavior: "smooth"
      })
    },0)

  }

  componentDidUpdate(){
    if(this.state.hidden === false && this.props.count < 6){
      this.bindSounds()
    }
    if (this.state.rollsAccepted === true && !this.props.progress.includes("rolls")) {
      this.props.updateProgress("rolls");
    }
    if (this.state.Rolls.length === 6) {
      select("#rollDice")
      .style("border", "2px solid "+colorWheel.orange)
      .style("box-shadow", "none")
      .attr("class", "reset-button")

    }
    if (this.state.Rolls.length == 6 && this.state.submitDisabled === true) {
      this.setState({submitDisabled: false})
    }
  }

  bindSounds = () => {
    /*
    document.getElementById('rollDice').addEventListener(("click"), ()=>{
      
    });
    document.getElementById('resetButton').addEventListener(("click"), ()=>{
      document.getElementById('resetAudio').play()
    })
    document.getElementById('submitButton').addEventListener(("click"), ()=>{
      document.getElementById('submitAudio').play()
  })
    */
  }

  getRandomDieNumber() {
    const min = 1;
    const max = 6;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  standardArray() {
    const array = [15, 14, 13, 12, 10, 8];
    this.setState({
      Rolls: array,
      rollsAccepted: true,
    });
  }

  handleChange(event) {
    this.setState({ input: parseInt(event.target.value) });
  }

  roll() {
    if(this.state.Rolls.length < 6 && this.state.diceRolls < 6){
      
      document.getElementById('dieShuffle').play();
      setTimeout(()=>document.getElementById('dieThrow').play(), 1200);
      
      this.setState({diceRolls: this.state.diceRolls + 1})

      const newPreRoll = [
        this.getRandomDieNumber(),
        this.getRandomDieNumber(),
        this.getRandomDieNumber(),
        this.getRandomDieNumber(),
      ];

      this.setState({
        preRoll: newPreRoll,
      });

      const best3 = newPreRoll
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((a, b) => a + b, 0);
      setTimeout(() => {
        this.setState({
          input: best3,
        });
      }, 1500);

      setTimeout(()=>{this.submitRoll()}, 1600)
      
    } 
   
    else {
      return null
    }
  }

  submitRoll() {
    if (this.state.input === "" || this.state.input === null) {
      return null;
    } else {
      if (this.state.Rolls.length < 6) {
        this.setState({
          Rolls: [...this.state.Rolls, this.state.input],
          input: null,
        });
      }
    }
  }

  resetRolls() {
    this.setState({
      input: null,
      Rolls: [],
      diceRolls: 0,
      rollsAccepted: false,
      submitDisabled: true
    });
    select("#rollDice")
      .style("border", "2px solid "+colorWheel.green)
      .style("box-shadow", "0 0 4px "+colorWheel.green)
      .attr("class", "submit-button")
  }

  acceptRolls() {
    
    this.setState({ rollsAccepted: true});
    //this.props.dispatch("ASmodifiers", mods)
    setTimeout(()=>{
      //this.props.updateProgress("rolls")
      this.setState({hidden: true})
      
      const scrollHeight2 = 0.19 * window.innerHeight;
      window.scroll({
        top: scrollHeight2,
        behavior: "smooth"
      })
    }, 400)
  }

  

  render() {

    const rolls = [...this.state.Rolls];
    //console.log(rolls, this.state.Rolls)
    const rawRolls = rolls.map((i, key) => <li key={key}>{i}</li>);
    const input = this.state.input;
    const rollsAccepted = this.state.rollsAccepted;
    const rollCards = rolls.sort((a, b) => b - a ).map((e, i) => (
      <RollCard value={e} key={i} index={i} />
    ));
    
    
    if (this.props.count === 6 && this.props.progress.includes("baseStats")) {
      console.log('returning')
      return;
    }

    if(this.state.hidden === true){
      return (
        <div id="base-stats-submitted">
          <div id="rollCardContainer">{rollCards}</div>
          <BaseStatList rolls={rolls} stats={this.state.stats}/>
        </div>
      )
    } 
    
    else {
    return (
      <div id="enter-rolls" >
        <audio id="dieShuffle" src={dieShuffle} preload="auto" ></audio>
        <audio id="dieThrow" src={dieThrow} preload="auto" ></audio>
        <audio id="resetAudio" src={resetAudio} preload="auto" ></audio>
        <audio id="submitAudio" src={submitAudio} preload="auto" ></audio>

        <div id="dice-container">
          <Dice numbers={this.state.preRoll} id="dice" />
        </div>
        
        
        <div id="enter-rolls-display" className="input-card" >
          <h1>Ability Scores</h1>
          <h3>Let's Roll!</h3>
          <button id="rollDice" className="submit-button" onClick={this.roll}>ROLL DICE!</button>
          <br/>

          <h3>...or input your own rolls</h3>
          <input
            type="number"
            onChange={this.handleChange}
            value={input || ""}
          ></input>
          {this.state.Rolls.length < 6 ? (
            <button id="submitScore" type="submit" onClick={this.submitRoll}>
              SUBMIT
            </button>
          ) : null}
          {rollsAccepted === false ? <ul>{rawRolls}</ul> : null}
          <br/>
          <button id="resetButton" className="reset-button" onClick={this.resetRolls}>RESET</button>
          <button id="submitButton" className="submit-button" disabled={this.state.submitDisabled} onClick={this.acceptRolls}>ACCEPT</button>
          <br/><button onClick={this.standardArray}>Standard Array</button>
        </div>
        
        
      </div>
    )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.raceDetails,
    stats: state.baseStats,
    count: state.baseStats.count,
    progress: state.progress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitStats: () => {
      dispatch({ type: "submitBaseStats" });
    },
    updateProgress: (string) => dispatch( { type: 'updateProgress', payload: string } )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseStats);
