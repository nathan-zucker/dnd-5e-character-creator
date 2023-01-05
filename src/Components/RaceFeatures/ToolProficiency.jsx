import React from 'react';
import { connect } from 'react-redux';


class ToolProficiency extends React.Component {
    constructor(props){
        super(props)
        this.state={
            tool: '',
            submitted: false
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInput(event){
        this.setState({tool: event.target.value})
    }

    handleSubmit(event){
        this.state.tool !== '' && this.props.dispatchTool(this.state.tool)
        this.setState({submitted: true})
        event.preventDefault()
    }

    render(){
        if (this.state.submitted === false){
        return(
            <div>
                <h3>Tool Proficiency</h3>
                <select value={this.state.tool} onChange={this.handleInput}>
                    <option>(select one)</option>
                    <option value="Smith's Tools">Smith's Tools</option>
                    <option value="Brewer's Tools">Brewer's Tools</option>
                    <option value="Mason's Tools">Mason's Tools</option>
                </select>
                <button onClick={this.handleSubmit}>SUBMIT</button>
            </div>
        )
        } else {
            return(
                <div>
                    <h3>You are Proficient with {this.state.tool}</h3>
                </div>
            )
        }
    }
    
}

const action = (tool) => {
    return{
        type: 'toolProficiency',
        payload: tool
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        dispatchTool: (tool) => { dispatch(action(tool)) }
    }
}

export default connect(null, mapDispatchToProps)(ToolProficiency)