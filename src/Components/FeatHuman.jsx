import React from 'react'
import { connect } from 'react-redux'

class FeatHuman extends React.Component {
    constructor(props){
        super(props)
        this.state={
            submitted: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.setState({submitted: true})
        this.props.dispatchFeat()
    }

    render(){
        if(this.state.submitted === false){
        return(
            <div>
                <h1>feat human</h1>
                <button onClick={this.handleClick}>Accept</button>
            </div>
        )}
        else{
            return(
                <div>
                    <h2>you selected a feat</h2>
                </div>
            )
        }
    }
}

const sendFeat = () => {
    return {
        type: 'FeatHumanBonus'
    }
}

const mapDispatchToProps = (dispatch) => {
    return({
        dispatchFeat: () => { dispatch(sendFeat()) }
    })
}

export default connect(null, mapDispatchToProps)(FeatHuman)