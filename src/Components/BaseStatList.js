import React from "react";
import { connect } from "react-redux";

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
        this.props.submitStats()
    }
    
    render() {
        const next = this.state.nextStat()
        return(
            <div>
                <h1>base {this.state.baseStats.join(' ')}</h1>
                {this.props.stats.length < 6 ? <h1>Choose your {next} score!</h1> : null}
                {this.props.stats.length >= 6 && !this.props.progress.includes('baseStats') ? <button onClick={this.handleSubmit}>next</button> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        stats: state.baseStats,
        progress: state.progress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitStats: () => { dispatch({type: 'submitBaseStats'}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatList)