import React from 'react'
import { connect } from 'react-redux'

class SkillHuman extends React.Component {
    constructor(props){
        super(props)
        this.state={
            submitted: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.setState({submitted: true})
        this.props.dispatchPoint()
    }

    
    render(){
        if (this.state.submitted === false) {
        return(
            <div>
                <h1>you will get any one additional skill</h1>
                <button onClick={this.handleClick}>Accept</button>
            </div>
        )}
        else {
            return(
                <div>
                    <h2>you chose an extra skill</h2>
                </div>
            )
        }
    }
}

const skillPoint = () => {
    console.log('sending skill point')
    return({
        type: 'SkillHumanBonus'
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        dispatchPoint: () => { dispatch(skillPoint()) }
    })
}

export default connect(null, mapDispatchToProps)(SkillHuman)