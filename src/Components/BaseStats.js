import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RollCard from "./RollCard";
import BaseStatList from "./BaseStatList";
import { connect } from "react-redux";
import Dice from "./DiceAnimation/Dice";
import dieThrow from './sounds/dieThrow1.wav';
import dieShuffle from './sounds/dieShuffle2.wav';
import resetAudio from './sounds/chipsStack3.wav';
import submitAudio from './sounds/chipsStack1.wav';
import AbilityScordIncrease from "./AbilityScoreIncrease";
import { select, selectAll } from "d3";

const colorWheel = {
  purple: "#BFABFF",
  yellow: "#ebffab",
  orange: "#ffbfab",
  green: "#abffbf",
}


function GetRolls() {

  const dispatch = useDispatch()
  
  const [ input, setInput ] = useState("")
  const [ rollDisabled, disableRoll ] = useState(false)
  const [ inputDisabled, disableInput ] = useState(false)
  const [ submitDisabled, disableSubmit ] = useState(false)
  const [ preRoll, setPreRoll ] = useState([])
  const [ rolls, setRolls ] = useState([])
  const [ rollCount, setRollCount ] = useState(0)


  const stats = useSelector((state)=>state.baseStats);


  const standardArray = [15, 14, 13, 12, 10, 8];
  
  function handleInput(e) {
      setInput(e.target.value)
  }

  function getRandomDieNumber() {
      const min = 1;
      const max = 6;
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function roll() {
      if ( rolls.length < 6 && rollCount < 6 ) {
          setRollCount( rollCount + 1 )
          const newPreRoll = [
              getRandomDieNumber(),
              getRandomDieNumber(),
              getRandomDieNumber(),
              getRandomDieNumber()
          ]
          setPreRoll(newPreRoll)
          const best3 = [...newPreRoll]
              .sort((a, b)=> b - a)
              .slice(0, 3)
              .reduce((a, b) => a + b, 0)
          setTimeout(() =>{
              enterRoll(best3)
          }, 1600 )
      }
  }

  function enterRoll(diceRoll) {
      console.log("entering roll", diceRoll)
      if ( rolls.length >= 6 ) { 
          console.log("too many rolls")
          return
      }
      if ( diceRoll > 0 ) {
          console.log("got dice roll")
          setRolls([...rolls, diceRoll])
          return;
      }
      else if ( input === "" ) { console.log("input undefined"); return }
          setRolls([...rolls, parseInt(input)])
          setInput('')
          return;
  }

  function resetRolls() {
      setRolls([])
      setRollCount(0)
      setPreRoll([])
      disableRoll(false)
      disableInput(false)
      disableSubmit(true)
  }
  
  useEffect(()=>{
      if ( rolls.length === 6 && submitDisabled ) {
          disableSubmit(false)
          disableRoll(true)
          disableInput(true)
      }
  },[rolls, submitDisabled])
  

  function dispatchRolls() {
      console.log(rolls)
      dispatch({ type: "setRolls", payload: rolls })
  }
  

  return (
      <div id="enter-rolls">

          <div id="dice-container">
              <Dice numbers={preRoll} id="dice" />
          </div>

          <div id="enter-rolls-display" className="input-card">
              <h2>Ability Scores</h2>
              <h3>Let's Roll!</h3>
              <button id="rollDice" className="submit-button" onClick={()=>roll()} disabled={rollDisabled} >ROLL DICE!</button>
              <br/>
              <h3>...or input your own rolls</h3>
              <input type="number" onChange={(e)=>handleInput(e)} value={input} ></input>
              <button id="submitScore" onClick={()=>enterRoll()} disabled={inputDisabled} >ENTER</button>
              <h3>{rolls.join(', ')}</h3>
              <button id="resetButton" className="reset-button" onClick={()=>resetRolls()} >RESET</button>
              <button id="submitButton" className="submit-button" disabled={submitDisabled} onClick={()=>dispatchRolls()} >SUBMIT</button>
              <br/>
              <button id="standard-array" onClick={()=>setRolls(standardArray)} >Standard Array</button>
          </div>

      </div>
  )
}


function ScoreCard(props) {
  
  const number = props.value
  const key = props.index

  const count = useSelector((state)=>state.baseStats.count)
  const bonuses = useSelector((state)=>state.raceDetails.abilityScoreIncrease)


  const [visible, setVisibility] = useState(true)
  const dispatch = useDispatch()

  function handleClick(e) {
    if (bonuses[count] > 0) {

      //console.log("bonus", bonuses[count], select(`#ability-scores-container`))
      select('#score-cards-container').append("div")
        .attr("class", "AS-bonus")
        .text(`+${bonuses[count]}`)
        .style("top", `${e.pageY-30}px`)
        .style("left", `${e.pageX-25}px`)
        .transition()
        .style("opacity", 0)
        .style("top", `${e.pageY-175}px`)

      
    }
      dispatch({ type: "selectStat", payload: {value: (number + bonuses[count]), index: count} })
      select(`#roll-card-${key}`)
          .style("pointer-events", "none")
          .transition()
          .style("opacity", 0)
      

      setTimeout(()=>{ setVisibility(false) },200)
  }

  if (visible) {
      return (
          <div className='rollCard' id={`roll-card-${key}`} onClick={(e)=>handleClick(e)}>
              <h2 className='number'>{number}</h2>
              <div className="bonus-indicator"></div>
          </div>
      )
  } else {
      return null;
  }

}

function AbilityScores() {

  const rolls = useSelector((state)=>state.baseStats.rolls)
  const count = useSelector((state)=>state.baseStats.count)
  const progress = useSelector((state)=>state.progress)

  const [ prompt, setPrompt ] = useState('');
  const [ hidden, hide ] = useState(false);
  const [ scoreCards, setScoreCards ] = useState(<div></div>);

  function getScoreCards() {
    let newScoreCards = rolls.map( ( e, i ) => <ScoreCard value={e} key={i} index={i} /> );
    setScoreCards(newScoreCards);
    return;
  }

  useEffect(()=>{
    if (hidden) {
      getScoreCards()
    }
  },[hidden])

  useEffect(()=>{
    if ( count < 6 ) {
        const nextPrompt = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'][count];
        setPrompt(nextPrompt);
    } 
    else { return }
  },[count])

  useEffect(()=>{
    if (progress.includes('rolls')) {
      hide(true);
      return;
    }
  },[progress])



  if (hidden) {
    return (
      <div className='ability-scores-container'>
        <div id='score-cards-container'>
          {scoreCards}
        </div>
        <BaseStatList rolls={rolls} />
      </div>
    )
  }

  return (
    <div className='ability-scores-container'>
      <GetRolls />
    </div>
  )
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
    this.setState({ rollsAccepted: true });
    //this.props.dispatch("ASmodifiers", mods)
    this.props.dispatch("updateProgress", "rolls")
    setTimeout(()=>{
      this.setState({hidden: true})
      
      const scrollHeight2 = 0.19 * window.innerHeight;
      window.scroll({
        top: scrollHeight2,
        behavior: "smooth"
      })
    }, 400)
  }

  getRollCards = () => {
    return this.state.Rolls.sort((a, b) => b - a ).map((e, i) => (
      <RollCard value={e} key={i} index={i} />
    ))
  }
  

  render() {

    const input = this.state.input;
    const rollsAccepted = this.state.rollsAccepted;
    
    
    if (this.props.count === 6 && this.props.progress.includes("baseStats")) {
      console.log('returning')
      return;
    }

    if(this.state.hidden === true){
      return (
        <div id="base-stats-submitted">
          <div id="rollCardContainer">{this.getRollCards()}</div>
          <BaseStatList rolls={this.state.Rolls} stats={this.state.stats}/>
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
    progress: state.progress,
    count: state.baseStats.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitStats: () => {
      dispatch({ type: "submitBaseStats" });
    },
    dispatch: (type, payload) => { dispatch({type: type, payload: payload}) }
  };
};
/*
export default connect(mapStateToProps, mapDispatchToProps)(BaseStats);
*/
export default AbilityScores;
