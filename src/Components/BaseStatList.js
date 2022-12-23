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
                    case 3: return 'Wisdom';
                    case 4: return 'Intelligence';
                    case 5: return 'Charisma';
                    default: return 'default';
                }
            }
        }
    }
/*
    assignStat(stat, value) {
        this.props.dispatch({type: {stat}, payload: {value}})
    }
*/
    
    handleSubmit = () => {
        this.props.submitStats()
    }
    
    render() {
        console.log(this.props.stats);
        const [str, dex, con, wis, int, cha] = this.props.stats
        const next = this.state.nextStat()
        //const rolls = this.state.rolls;
        //console.log(rolls); 
        return(
            <div>
                {this.props.stats.length < 6 ? <h1>Choose your {next} score!</h1> : null}
                <ul>
                    <li className = 'baseStat'>
                        <h2>Strength: <span>{str}</span></h2>
                    </li>
                    <li className = 'baseStat'>
                        <h2>Dexterity: <span>{dex}</span></h2>
                    </li>
                    <li className = 'baseStat'>
                        <h2>Constitution: <span>{con}</span></h2>
                    </li>
                    <li className = 'baseStat'>
                        <h2>Wisdom: <span>{wis}</span></h2>
                    </li>
                    <li className = 'baseStat'>
                        <h2>Intelligence: <span>{int}</span></h2>
                    </li>
                    <li className = 'baseStat'>
                        <h2>Charisma: <span>{cha}</span></h2>
                    </li>
                </ul>
                {this.props.stats.length >= 6 ? <button onClick={this.handleSubmit}>next</button> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        stats: state.baseStats
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitStats: () => { dispatch({type: 'submitBaseStats'}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseStatList)