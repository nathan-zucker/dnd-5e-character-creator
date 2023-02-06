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

    handleClick = (number, index) => {
        document.getElementById('audio').play();
        this.props.selectStat(number, index);
        this.setState({visible: false});
        if (index === 5){
            console.log("last card")
        }
    }
    
    render() {
        const number = this.state.number;
        const index = this.state.index;
        if (this.state.visible === true) {
            return(
                <button className='rollCards' onClick={()=>this.handleClick(number, index)}>
                    <h2 className='number'>{number}</h2>
                    <audio id="audio" src={audio} preload="auto"></audio>
                </button>
            );
        } else {
            return <audio id="audio" src={audio} preload="auto"></audio>;
        }
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectStat: (e, i) => { dispatch({type: 'selectStat', payload: e, index: i}) }
    }
}

export default connect(null, mapDispatchToProps)(RollCard)