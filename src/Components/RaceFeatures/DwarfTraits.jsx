import React from "react";
import { connect } from "react-redux";

class DwarfTraits extends React.Component {
    constructor(props){
        super(props)
        this.state={
            weapons: []

        }
    }


    render(){
        return(
            <div>
                <h2>Dwarf Traits</h2>
            </div>
        )
    }
}

const sendTraits = (state) => {
    return({
        type: 'traits',
        payload: state
    })
}

const weaponProficiency = (weapons) => {
    return({
        type: 'weaponProficiency',
        payload: weapons
    })
}

const mapStateToProps = state => {
    return({
        details: state.raceDetails
    })
}

const mapDispatchToProps = (dispatch) => {
    return({
        dispatchTraits: (state) => { dispatch(sendTraits(state)) },
        dispatchWeaponProficiency: (weapons) => { dispatch(weaponProficiency(weapons)) }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DwarfTraits)