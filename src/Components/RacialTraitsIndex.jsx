import React from "react";
import { connect } from "react-redux";
import DwarfTraits from "./RaceFeatures/DwarfTraits";

class RacialTraitsIndex extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }


    render(){
        return(
            <div>
                <h1>Make some additional selections</h1>
                <DwarfTraits />
            </div>
        )
    }
}

export default connect()(RacialTraitsIndex)