import React from "react";
import { connect } from "react-redux";

class Equipment extends React.Component {
    constructor(props){
        super(props);
        this.state={
            hidden: true,
            equipment: [],
            choices: [],
            button1disabled: false
        }
    }

    sortEquipment = () => {
        let choices = [];
        let equipment = [];
        for (let i=0; i<this.props.state.equipment.length; i++){
            if (Array.isArray(this.props.state.equipment[i])) {
                choices.push(this.props.state.equipment[i])
            } 
            else {
                equipment.push(this.props.state.equipment[i])
            }
        }
        this.setState({equipment: equipment, choices: choices});
    }

    loadComponent = () => {
        this.sortEquipment()
        this.setState({hidden: false})
    }

    showChoices = () => {
        return (
            this.state.choices.map((e, i)=>
            <div key={i} className="EOcontainer">
                {e.map((f, j)=>
                    <button
                    className="equipmentOption"
                    key={j}
                    value={f}
                    onClick={this.chooseEquipment}>
                        {f}
                    </button>
                )}
            </div>
        )
        )
    }

    chooseEquipment = (event) => {
        console.log(event.target.value)
        for (let i=0; i<this.state.choices.length; i++){
            if (this.state.choices[i].includes(event.target.value)) {
                let choices = [...this.state.choices];
                choices.splice(i, 1);
                this.setState({choices: choices});
            }
        }
        this.setState((state)=>{
            return {
                equipment: [...state.equipment, event.target.value]
            }
        })
    }

    submitEquipment = () => {
        this.props.dispatch('updateEquipment', this.state.equipment)
        this.setState({button1disabled: true})
    }

    render(){
        if (this.state.hidden === false) {
            return(
                <div>
                    <h1>choose your equipment!</h1>
                    <h3>choices: {this.showChoices()}</h3>
                    <h3>locked in: {this.state.equipment.join(', ')}</h3>
                    { this.state.choices.length === 0 ? 
                        <button 
                            onClick={this.submitEquipment}
                            disabled={this.state.button1disabled}>
                            confirm equipment
                        </button> 
                    : null }
                </div>
            )
        }
        else {
            return (
                <div>
                    <h2>equipment</h2>
                    <button onClick={this.loadComponent}>go to equipment</button>
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (type, payload) => { dispatch({type: type, payload: payload}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Equipment)