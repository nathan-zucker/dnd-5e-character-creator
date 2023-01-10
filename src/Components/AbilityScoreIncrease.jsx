import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import { connect } from 'react-redux';


class AbilityScordIncrease extends React.Component{
    constructor(props){
        super(props)
        this.state={
            bonuses: this.props.bonuses || [0,0,0,0,0,0],
            picks: this.props.picks,
            submitted: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    AllocatePoint(i){
        
        this.props.dispatchPicks(this.state.picks-1)
        this.setState((state)=>{
            const bonus = state.bonuses.map(i=>i)
            bonus[i]+=1
            return{bonuses: bonus, picks: state.picks-1}
        });
        console.log(this.state)
    }

    handleClick(){
        this.props.dispatchPoints(this.state.bonuses)
        this.setState({submitted: true})
    }    

    render(){
        return(
            <div>
            {this.state.picks > 0 ? 
                <div>
                    <h1>select ability scores ({this.state.picks})</h1>
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

const mapDispatchToProps = (dispatch) => {
    return{
        dispatchPoints: (bonus) => { dispatch(sendPoints(bonus)) },
        dispatchPicks: (picks) => { dispatch({type: 'ASIpick', payload: picks}) },
        dispatch: (type) => { dispatch({type: type}) }
    }
}

export default connect(null, mapDispatchToProps)(AbilityScordIncrease)
