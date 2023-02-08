import React from "react";
import { connect } from "react-redux";
import './RollCard.css';
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
        const index = this.props.count;
        console.log("stat", number, index)
        this.props.selectStat(number, index);
        this.setState({visible: false});
        if (index === 6){
            console.log("last card")
        }
    }
    
    render() {
        const number = this.state.number;
        if (this.state.visible === true) {
            return(
                <button className='rollCards' onClick={()=>this.handleClick(number)}>
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
        count: state.baseStats.count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectStat: (e, i) => { dispatch({type: 'selectStat', payload: {value: e, index: i}}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RollCard)