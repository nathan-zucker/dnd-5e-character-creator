import React from "react";
import { connect } from "react-redux";
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
 

    handleSubmit = () => {
        document.getElementById("submitAudio").play()
        setTimeout(()=>this.props.submitStats(), 500)
    }
    
    render() {
        let next = this.state.nextStat()
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