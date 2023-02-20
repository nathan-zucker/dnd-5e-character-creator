import React from "react";
import { connect } from "react-redux";
//import './RollCard.css';
import audio from './sounds/cardSelect.mp3'
import { select } from "d3";


class RollCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: props.value,
            index: props.index,
            visible: true
        }
    }

    handleClick = (number) => {
        //document.getElementById('audio').play();
        // INCLUDES RACE BONUSES
        const index = this.props.count;
        const bonus = this.props.raceBonuses[index];
        const value = number + bonus

        console.log("stat", value, index)
        this.props.selectStat(value, index);
        this.setState({visible: false});
        if (index === 6){
            console.log("last card")
        }
    }
    
    render() {
        const number = this.state.number;
        if (this.state.visible === true) {
            return(
                <button className='rollCard' onClick={()=>this.handleClick(number)}>
                    <h2 className='number'>{number}</h2>
                    <audio id="audio" src={audio} preload="auto"></audio>
                </button>
            );
        } else {
            return;
        }
        
    }
}
const mapStateToProps = (state) => {
    return {
        count: state.baseStats.count,
        raceBonuses: state.raceDetails.abilityScoreIncrease,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectStat: (e, i) => { dispatch({type: 'selectStat', payload: {value: e, index: i}}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RollCard)