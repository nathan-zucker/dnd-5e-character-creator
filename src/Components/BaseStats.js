import React from "react";
import "./BaseStats.css";
import RollCard from "./RollCard";
import BaseStatList from "./BaseStatList";
import { connect } from "react-redux";
import Dice from "./DiceAnimation/Dice";
import dieThrow from './sounds/dieThrow1.wav';
import dieShuffle from './sounds/dieShuffle2.wav';
import resetAudio from './sounds/chipsStack3.wav';
import submitAudio from './sounds/chipsStack1.wav';

class BaseStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      input: "",
      preRoll: [],
      Rolls: [],
      rollsAccepted: false,
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
  }

  componentDidUpdate(){
    if(this.state.hidden === false){
      this.bindSounds()
    }
  }

  bindSounds = () => {
    document.getElementById('rollDice').addEventListener(("click"), ()=>{
      document.getElementById('dieShuffle').play();
      setTimeout(()=>document.getElementById('dieThrow').play(), 1300)
    });
    document.getElementById('resetButton').addEventListener(("click"), ()=>{
      document.getElementById('resetAudio').play()
    })
    document.getElementById('submitButton').addEventListener(("click"), ()=>{
      document.getElementById('submitAudio').play()
  })
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
    this.setState({ input: event.target.value });
  }

  roll() {
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
    if(this.state.Rolls.length < 6){this.submitRoll()}
  }

  submitRoll() {
    if (this.state.input === "" || this.state.input === null) {
      return null;
    } else {
      this.setState({
        Rolls: [...this.state.Rolls, this.state.input],
        input: null,
      });
    }
  }

  resetRolls() {
    this.setState({
      Rolls: [],
      rollsAccepted: false,
    });
  }

  acceptRolls() {
    this.setState({ rollsAccepted: true });
    setTimeout(()=>this.setState({hidden: true}), 500)
  }

  render() {

    const rolls = this.state.Rolls;
    const rawRolls = this.state.Rolls.map((i, key) => <li key={key}>{i}</li>);
    const input = this.state.input;
    const rollsAccepted = this.state.rollsAccepted;
    const rollCards = this.state.Rolls.map((e, i) => (
      <RollCard value={e} key={i} index={i} />
    ));

    if(this.state.hidden === true){
      return (
        <div>
          <h2>scores locked in!</h2>
          <div id="rollCardContainer">{rollCards}</div>
          <BaseStatList rolls={rolls} stats={this.state.stats}/>
        </div>
      )
    } 
    
    else {
    return (
      <div>
        <audio id="dieShuffle" src={dieShuffle} preload="auto" ></audio>
        <audio id="dieThrow" src={dieThrow} preload="auto" ></audio>
        <audio id="resetAudio" src={resetAudio} preload="auto" ></audio>
        <audio id="submitAudio" src={submitAudio} preload="auto" ></audio>

        <Dice numbers={this.state.preRoll} />
        <h1>Base Stats</h1>
        <h3>Let's Roll!</h3>
        <button onClick={this.standardArray}>Standard Array</button>
        <br />
        <input
          type="number"
          onChange={this.handleChange}
          value={input || ""}
        ></input>
        <button id="rollDice" onClick={this.roll}>ROLL!</button>
        <br />
        <br />
        {this.state.Rolls.length < 6 ? (
          <button id="submitScore" type="submit" onClick={this.submitRoll}>
            SUBMIT
          </button>
        ) : null}
        <h3>{input}</h3>
        {rollsAccepted === false ? <ul>{rawRolls}</ul> : null}
        
        <button id="submitButton" onClick={this.acceptRolls}>ACCEPT</button>

        <button id="resetButton" onClick={this.resetRolls}>RESET</button>
        
      </div>
    )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    stats: state.baseStats,
    progress: state.progress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitStats: () => {
      dispatch({ type: "submitBaseStats" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseStats);
