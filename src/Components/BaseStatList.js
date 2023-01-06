import React from "react";
import { connect } from "react-redux";
import submitAudio from './sounds/chipsStack1.wav';

class BaseStatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rolls: [...props.rolls],
            baseStats: this.props.stats.map(e=>e.pop()),
            nextStat: () => {
                if (this.state.baseStats[0] === 0) {return 'Strength'}
                if (this.state.baseStats[1] === 0) {return 'Dexterity'}
                if (this.state.baseStats[2] === 0) {return 'Constitution'}
                if (this.state.baseStats[3] === 0) {return 'Intelligence'}
                if (this.state.baseStats[4] === 0) {return 'Wisdom'}
                if (this.state.baseStats[5] === 0) {return 'Charisma'} 
                else{return null}
            }
        }
    }
 

    handleSubmit = () => {
        document.getElementById("submitAudio").play()
        setTimeout(()=>this.props.submitStats(), 500)
    }
    
    render() {
        const next = this.state.nextStat()
        return(
            <div>
                <audio id="submitAudio" src={submitAudio} preload="auto"></audio>
                {this.props.stats.length < 6 ? <h1>Choose your {next} score!</h1> : null}
                {this.props.stats.length >= 6 && !this.props.progress.includes('baseStats') ? 
                <button id="submitButton" onClick={this.handleSubmit}>next</button> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        stats: state.baseStats.stats,
        progress: state.progress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitStats: () => { dispatch({type: 'submitBaseStats'}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatList)