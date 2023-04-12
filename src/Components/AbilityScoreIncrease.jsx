
import React from 'react';
import { connect } from 'react-redux';



class AbilityScordIncrease extends React.Component{
    constructor(props){
        super(props)
        this.state={
            bonuses: this.props.bonuses || [0,0,0,0,0,0],
            picks: this.props.picks,
            source: this.props.source,
            submitted: false,
            hidden: true,
        }
    }

    AllocatePoint(i){
        this.props.dispatchPicks(this.state.picks-1)
        this.setState({ picks: this.state.picks - 1 })
        const stats = [...this.props.abilityScores];
        
        stats[i] += 1;
        console.log(stats)
        this.props.dispatch("setStats", stats)
        
        if (this.state.picks === 1) {
            this.setState({submitted: true})
        }
        console.log(this.state)
    }

    render(){

        if (this.state.hidden) {
            return (
                <div className='prompt-AS-increase'>
                    <button className='prompt-as-button' onClick={()=>this.setState({hidden: false})}>ABILITY SCORE INCREASE</button>
                </div>
            )
        }

        return(
            <div>
            {this.state.picks > 0 ? 
                <div className='ability-score-increase'>
                    <h1>select ability scores <br/> ({this.state.picks} picks remaining{ this.state.source ? <span> from {this.state.source})</span> : ")"}</h1>
                    <div>
                        <button onClick={()=>this.AllocatePoint(0)}>Strength</button>
                        <button onClick={()=>this.AllocatePoint(1)}>Dexterity</button>
                        <button onClick={()=>this.AllocatePoint(2)}>Constitution</button>
                        <button onClick={()=>this.AllocatePoint(3)}>Intelligence</button>
                        <button onClick={()=>this.AllocatePoint(4)}>Wisdom</button>
                        <button onClick={()=>this.AllocatePoint(5)}>Charisma</button>
                    </div>
                    
                </div>
            : <h2>Ability Score Increase: </h2> }
            {this.state.picks === 0 && this.state.submitted === false ? <button onClick={this.handleClick}>{this.state.bonuses}</button> : null}
        </div>
        )
    }
}

const sendPoints = (bonus) => {
    console.log(bonus)
    return({
        type: 'abilityScordIncrease',
        payload: bonus
    })
}
const mapStateToProps = (state) => {
    return {
        abilityScores: state.baseStats.stats
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        dispatchPoints: (bonus) => { dispatch(sendPoints(bonus)) },
        dispatchPicks: (picks) => { dispatch({type: 'ASIpick', payload: picks}) },
        dispatch: (type, payload) => { dispatch({type: type, payload: payload}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AbilityScordIncrease)
