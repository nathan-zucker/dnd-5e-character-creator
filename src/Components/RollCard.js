import React from "react";
import { connect } from "react-redux";
import './RollCard.css';

class RollCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: props.value,
            visible: true
        }
    }

    handleClick = (number) => {
        this.props.selectStat(number)
        this.setState({visible: false})
    }
    
    render() {
        console.log(this.props);
        const number = this.state.number;
        if (this.state.visible === true) {
            return(
                <button className='rollCards' onClick={()=>{this.handleClick(number)}}>
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
        selectStat: (i) => { dispatch({type: 'selectStat', payload: i}) }
    }
}

export default connect(null, mapDispatchToProps)(RollCard)