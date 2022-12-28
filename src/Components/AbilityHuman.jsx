import React from 'react';
import { connect } from 'react-redux';


class AbilityHuman extends React.Component{
    constructor(props){
        super(props)
        this.state={
            bonuses: [0,0,0,0,0,0],
            picks: 2,
            submitted: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    AllocatePoint(i){
        console.log(this.state)
        this.setState((state)=>{
            const bonus = state.bonuses.map(i=>i)
            bonus[i]+=1
            return{bonuses: bonus, picks: state.picks-1}
            })
    }

    handleClick(){
        console.log(this.state.bonuses)
        this.props.dispatchPoints(this.state.bonuses)
        this.setState({submitted: true})
    }    

    render(){
        return(
            <div>
            {this.state.picks > 0 ? <div>
            <h1>select ability scores ({this.state.picks})</h1>
            <div>
                <button onClick={()=>this.AllocatePoint(0)}>Strength</button>
                <button onClick={()=>this.AllocatePoint(1)}>Dexterity</button>
                <button onClick={()=>this.AllocatePoint(2)}>Constitution</button>
                <button onClick={()=>this.AllocatePoint(3)}>Intelligence</button>
                <button onClick={()=>this.AllocatePoint(4)}>Wisdom</button>
                <button onClick={()=>this.AllocatePoint(5)}>Charisma</button>
            </div>
            </div>: null }
            <h2>stat mods: {this.state.bonuses}</h2>
            {this.state.picks === 0 && this.state.submitted === false ? <input type='submit' onClick={this.handleClick}></input> : null}
        </div>
        )
    }
}

const sendPoints = (bonus) => {
    console.log(bonus)
    return({
        type: 'AbilityHumanBonus',
        payload: bonus
    })
}

const mapDispatchToProps = (dispatch) => {
    return{
        dispatchPoints: (bonus) => { dispatch(sendPoints(bonus)) }
    }
}

export default connect(null, mapDispatchToProps)(AbilityHuman)
