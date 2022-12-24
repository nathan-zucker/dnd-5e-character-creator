import React from "react";
import { connect } from "react-redux";

class BaseStatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rolls: [...props.rolls],
            nextStat: () => {
                switch(this.props.stats.length) {
                    case 0: return 'Strength';
                    case 1: return 'Dexterity';
                    case 2: return 'Constitution';
                    case 3: return 'Intelligence';
                    case 4: return 'Wisdom';
                    case 5: return 'Charisma';
                    default: return 'default';
                }
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