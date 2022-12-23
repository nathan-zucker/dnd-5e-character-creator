import React from 'react'
import './BaseStats.css'
import RollCard  from './RollCard'
import BaseStatList from './BaseStatList';
import { connect } from 'react-redux';


class BaseStats extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: '',
            Rolls: [],
            rollsAccepted: false,
            Str: 0,
            Dex: 0,
            Con: 0,
            Int: 0,
            Wis: 0,
            Cha: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitRoll = this.submitRoll.bind(this);
        this.resetRolls = this.resetRolls.bind(this);
        this.acceptRolls = this.acceptRolls.bind(this);
        this.standardArray = this.standardArray.bind(this);
    }

    standardArray() {
        const array = [15, 14, 13, 12, 10, 8];
        this.setState({
            Rolls: array,
            rollsAccepted: true
        })
    }

    handleChange(event) { this.setState({input: event.target.value}) }

    submitRoll() { 
        if (this.state.input === '' || this.state.input === null) {return null} else {
            this.setState({
        Rolls: [...this.state.Rolls, this.state.input],
        input: null
    }) } }

    resetRolls() { this.setState({
        Rolls: [],
        rollsAccepted: false
    }) }

    acceptRolls() { this.setState({rollsAccepted: true}) }

    render() {
        const rolls = this.state.Rolls;
        const rawRolls = this.state.Rolls.map((i) => <li>{i}</li>)
        const input = this.state.input
        const rollsAccepted = this.state.rollsAccepted
        const rollCards = this.state.Rolls.map((i)=> <RollCard value={i} key={i}/>)
        return(
            <div>
                <h1>Base Stats</h1>
                <h3>Let's Roll!</h3>
                <button onClick={this.standardArray}>Standard Array</button><br/>
                <input type='number' onChange={this.handleChange} value={input}></input>
                <br/>
                {this.state.Rolls.length < 6 ? <button type='submit' onClick={this.submitRoll}>SUBMIT</button> : null}
                <h3>{input}</h3>
                {rollsAccepted === false ? <ul>{rawRolls}</ul> : null}
                {this.state.Rolls.length === 6 && rollsAccepted === false ? <button onClick={this.acceptRolls}>ACCEPT</button> : null}
                {rollsAccepted === false ? <button onClick={this.resetRolls}>RESET</button> : null }
                {rollsAccepted === true ? 
                <div>
                    <h2>scores locked in!</h2>
                    <div id='rollCardContainer'>
                        {rollCards}
                    </div>
                    <BaseStatList rolls={rolls}/>
                    <h3>stats: [{this.props.stats.join(', ')}]</h3>
                </div>
                : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(BaseStats)