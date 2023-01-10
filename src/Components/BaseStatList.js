import React from "react";
import { connect } from "react-redux";
import AbilityScoreIncrease from "./AbilityScoreIncrease";
import submitAudio from './sounds/chipsStack1.wav';

class BaseStatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rolls: [...props.rolls],
            baseStats: this.props.stats,
            nextStat: () => {
                if (this.props.stats.length === 0) {return 'Strength'}
                if (this.props.stats.length === 1) {return 'Dexterity'}
                if (this.props.stats.length === 2) {return 'Constitution'}
                if (this.props.stats.length === 3) {return 'Intelligence'}
                if (this.props.stats.length === 4) {return 'Wisdom'}
                if (this.props.stats.length === 5) {return 'Charisma'} 
                else{return null}
            }
        }
    }
    getModifiers = () => {
        const stats = this.props.stats;
        const mods = this.props.bonus;
        const combined = stats.map((e, i)=>e+mods[i]);
        const modifiers = combined.map(e=>Math.floor((e-10)/2));
        const dressedModifiers = modifiers.map(e=>{
            switch(e>=0){
              case true: return "(+"+e+")";
              case false: return "("+e+")";
              default: return null;
            }
          })
        this.props.dispatch("ASmodifiers", [modifiers, dressedModifiers])
        this.props.dispatch("setStats", combined)
        return [modifiers, dressedModifiers]
      }

    handleSubmit = () => {
        document.getElementById("submitAudio").play()
        this.props.picks === 0 && setTimeout(()=>this.props.submitStats(), 500)
        this.getModifiers()
    }
    
    render() {
        let next = this.state.nextStat()
        return(
            <div>
                <audio id="submitAudio" src={submitAudio} preload="auto"></audio>
                {this.props.stats.length < 6 ? <h1>Choose your {next} score!</h1> : null}
                
                <AbilityScoreIncrease picks={this.props.picks} bonuses={this.props.bonus} />

                {this.props.stats.length >= 6 && !this.props.progress.includes('baseStats') ? 
                <button id="submitButton" onClick={this.handleSubmit}>next</button> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        stats: state.baseStats.stats,
        picks: state.baseStats.picks,
        bonus: state.raceDetails.abilityScoreIncrease,
        progress: state.progress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitStats: () => { dispatch({type: 'submitBaseStats'}) },
        dispatch: (type, payload) => { dispatch({type: type, payload: payload}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatList)