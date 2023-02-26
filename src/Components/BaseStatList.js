import { selectAll } from "d3";
import React from "react";
import { connect } from "react-redux";
import AbilityScoreIncrease from "./AbilityScoreIncrease";
import submitAudio from './sounds/chipsStack1.wav';

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
    */
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