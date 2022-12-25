import React from "react";
import { connect } from "react-redux";
import './RollCard.css';

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
        this.props.selectStat(number, index)
        this.setState({visible: false})
    }
    
    render() {
        const number = this.state.number;
        const index = this.state.index;
        if (this.state.visible === true) {
            return(
                <button className='rollCards' onClick={()=>this.handleClick(number, index)}>
                    <h2 className='number'>{number}</h2>
                </button>
            );
        } else {
            return null;
        }
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectStat: (e, i) => { dispatch({type: 'selectStat', payload: e, index: i}) }
    }
}

export default connect(null, mapDispatchToProps)(RollCard)