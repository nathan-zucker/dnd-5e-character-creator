import React from "react";
import { connect } from "react-redux";
import SelectWeapon from "./SelectWeapon";

class Equipment extends React.Component {
    constructor(props){
        super(props);
        this.state={
            hidden: true,
            equipment: [],
            choices: [],
            choices2: [],
            button1disabled: false
        }
    }

    //SORT OUT WHICH EQUIPMENT NEEDS A CHOICE
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

    //RENDER OPTIONS IN ROWS OF BUTTONS
    showChoices = () => {
        return (
            this.state.choices.map((e, i)=>
            <div key={i} className="EOcontainer">
                {e.map((f, j)=><button
                    className="equipmentOption"
                    key={j}
                    value={f}
                    onClick={this.chooseEquipment}
                    >{f}</button>)}
            </div>
            )
        )
    }

    //MAKE A SELECTION FOR MAIN EQUIPMENT
    chooseEquipment = (event) => {
        console.log(event.target.value)
        //REMOVE OPTIONS FROM LIST
        for (let i=0; i<this.state.choices.length; i++){
            if (this.state.choices[i].includes(event.target.value)) {
                let choices = [...this.state.choices];
                choices.splice(i, 1);
                this.setState({choices: choices});
            }
        }
        //SEND CHOSEN OPTION TO LOCAL STATE
        this.setState((state)=>{
            if (event.target.value.match(/(\s&\s)/)) {
                let arr = event.target.value.split(' & ');
                return { equipment: [...state.equipment, ...arr] }
            }
            return { equipment: [...state.equipment, event.target.value] }
        })
    }

    //SUBMIT MAIN EQUIPMENT TO REDUX
    submitEquipment = () => {
        this.props.dispatch('updateEquipment', this.state.equipment)
        this.props.dispatch('updateProgress', 'equipment')
        this.setState({button1disabled: true})
        this.sortWeaponChoices()
    }

    sortWeaponChoices = () => {
        console.log('sorting')
        let needChoice = [];
        let equip = [...this.state.equipment];

        //SORT THROUGH EQUIPMENT OPTIONS TO FIND ONES THAT NEED A CHOICE
        for (let i=0; i<this.state.equipment.length; i++) {
            switch(this.state.equipment[i]) {
                case "any simple weapon":
                case "any simple melee weapon":
                case "any simple ranged weapon":
                case "any martial weapon":
                case "any martial melee weapon":
                case "any martial ranged weapon":
                case "any two martial weapons":
                    needChoice.push(this.state.equipment[i])
                    equip.splice(i, 1, '');
                    console.log(equip)
                    this.setState({equipment: equip});
                    break;
                default: console.log(this.state.equipment[i]);
            }
        }

        //REMOVE BLANK SPACES LEFT OVER FROM SORTING
        let finalEquip = equip.filter(e=>e !== "")
        console.log('removed weapon selectors', finalEquip)
        this.setState({equipment: finalEquip})
        this.props.dispatch("updateEquipment", finalEquip)

        //CHOICES2 IS THE LIST OF WEAPONS TO CHOOSE FROM
        this.setState({choices2: needChoice})
        return;
    }

    showSecondaryChoices = () => {
        return this.state.choices2.map((e, i)=>{
            switch(e){
                case "any simple weapon": return <SelectWeapon key={i} filters={['simple']} />
                case "any simple melee weapon": return <SelectWeapon key={i} filters={['simple', 'melee']} />
                case "any simple ranged weapon":  return <SelectWeapon key={i} filters={['simple', 'ranged']} />
                case "any martial weapon": return <SelectWeapon key={i} filters={['martial']} />;
                case "any martial melee weapon": return <SelectWeapon key={i} filters={['martial', 'melee']} />
                case "any martial ranged weapon": return <SelectWeapon key={i} filters={['martial', 'ranged']} />
                case "any two martial weapons": return <SelectWeapon key={i} filters={['martial']} picks={2} />
                
                default: return null
            }
        })
    }

    render(){
        if (this.state.hidden === false) {
            return(
                <div>
                    <h1>choose your equipment!</h1>
                    <h3>choices: {this.showChoices()}</h3>
                    { this.state.button1disabled ? <h3>equipment: {this.props.state.equipment.join(', ')}</h3> : <h3>equipment: {this.state.equipment.join(', ')}</h3> }
                    <h3></h3>
                    {/**SUBMIT BUTTON */}
                    { this.state.choices.length === 0 ? 
                        <button 
                            onClick={this.submitEquipment}
                            disabled={this.state.button1disabled}>
                            confirm equipment
                        </button> 
                    : null }
                    <div>
                        <h3>secondary choices: {this.state.choices2} </h3>
                        {this.showSecondaryChoices()}
                    </div>
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