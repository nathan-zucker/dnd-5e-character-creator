import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { select } from "d3";

import Dice from "./DiceAnimation/Dice";

function GetRolls() {

    const dispatch = useDispatch()
    
    const [ input, setInput ] = useState("")
    const [ rollDisabled, disableRoll ] = useState(false)
    const [ inputDisabled, disableInput ] = useState(false)
    const [ submitDisabled, disableSubmit ] = useState(false)
    const [ rollsAccepted, acceptRolls ] = useState(false)
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

    /*
    
    useEffect(()=>{
        if ( rolls.length === 6 && submitDisabled ) {
            disableSubmit(false)
            disableRoll(true)
            disableInput(true)
        }
    },[rolls, submitDisabled])
    
    useEffect(()=>{
        if (rollsAccepted) {
            dispatchRolls(rolls)
        }
    },[rollsAccepted, rolls, stats])

    function dispatchRolls(arr) {
        console.log(arr)
        dispatch({ type: "setRolls", payload: [10,10,10,10,10,10] })
    }
    */

    return (
        <div id="enter-rolls">
{/*            
            <div id="dice-container">
                <Dice numbers={preRoll} id="dice" />
            </div>
*/}
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
                <button id="submitButton" className="submit-button" disabled={submitDisabled} onClick={(event)=>dispatch({type: "setRolls", payload: rolls})} >SUBMIT</button>
                <br/>
                <button id="standard-array" onClick={()=>setRolls(standardArray)} >Standard Array</button>
            </div>

        </div>
    )
}

/*
function RollCard(props) {
    const number = props.value
    const index = props.index
    const [visible, setVisibility] = useState(true)
    const dispatch = useDispatch()

    function handleClick() {

        dispatch({ type: "selectStat", payload: number })
        console.error(select(`#roll-card-${index}`))
        select(`#roll-card-${index}`)
            .style("pointer-events", "none")
            .transition()
            .style("opacity", 0)
        setTimeout(()=>{ setVisibility(false) },0)
    }

    if (visible) {
        return (
            <div className='rollCard' id={`roll-card-${index}`} onClick={()=>handleClick()}>
                <h2 className='number'>{number}</h2>
            </div>
        )
    } else {
        return null;
    }

}
*/

function AbilityScores() {
    // GET CONSTANTS, VARIABLES, AND STATE

    //const rolls = useSelector((state)=>state.baseStats.rolls);
    const count = useSelector((state)=>state.baseStats.count)

    const [ prompt, setPrompt ] = useState()
    const [ hidden, hide ] = useState(false);

    /*
    useEffect(()=>{
        if ( count < 6 ) {
            const nextPrompt = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'][count];
            setPrompt(nextPrompt);
        } 
        else { return }
    },[count])
    */
    

    return (
        <div>
            <GetRolls />
        </div>
    )
}

export default AbilityScores;

/**
 * 
 * 
class BaseStatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rolls: [...props.rolls],
            baseStats: [...this.props.stats],
            hidden: false,
            count: 6
        }
    }
    /*
    componentDidMount(){
        const displayElements = selectAll(".statDisplay")._groups[0]
    }

    componentDidUpdate(){
    }
    nextStat = () => {
        const statNames = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
        const index = this.props.count;
        console.log(statNames[index]);
        return(statNames[index]);
    }

    getModifiers = () => {
        const stats = [...this.props.stats];
       
        const modifiers = stats.map(e=>Math.floor((e-10)/2));
       
        const dressedModifiers = modifiers.map(e=>{
            switch(e>=0){
              case true: return "(+"+e+")";
              case false: return "("+e+")";
              default: return null;
            }
          })
        this.props.dispatch("ASmodifiers", [modifiers, dressedModifiers])
        return [modifiers, dressedModifiers]
      }

    handleSubmit = () => {
        if (this.props.picks === 0 && this.state.count === 6) {
            document.getElementById("submitAudio").play()
            setTimeout(()=>this.props.submitStats(), 500)
            this.getModifiers()
        }
    }
    
    render() {
        if (this.state.hidden === false) {
            return(
                <div id="prompt-stat">
                    {this.props.count < 6 ? <h1>Choose your <span className="highlight">{this.nextStat()}</span> score!</h1> : null}
    
                    {this.props.count === 6 && this.props.picks === 0 && !this.props.progress.includes('baseStats') ?
                    <button id="submit-as-button" className="submit-button" onClick={this.handleSubmit}>next</button> : null}
                    { this.props.picks > 0 ? <AbilityScoreIncrease picks={this.props.picks} bonuses={this.props.bonus} /> : null}
                </div>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        stats: state.baseStats.stats,
        picks: state.baseStats.picks,
        bonus: state.raceDetails.abilityScoreIncrease,
        progress: state.progress,
        count: state.baseStats.count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitStats: () => { dispatch({type: 'submitBaseStats'}) },
        dispatch: (type, payload) => { dispatch({type: type, payload: payload}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatList)
 */
