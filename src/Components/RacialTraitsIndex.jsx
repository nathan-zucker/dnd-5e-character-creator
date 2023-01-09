import React from "react";
import { connect } from "react-redux";
import ToolProficiency from "./RaceFeatures/ToolProficiency";
import AbilityHuman from "./AbilityHuman"


const languagesIndex = [
    "Common",
    "Dwarvish",
    "Elvish",
    "Giant",
    "Gnomish",
    "Goblin",
    "Halfling",
    "Orc",
    "Abyssal",
    "Celestial",
    "Draconic",
    "Deep Speech",
    "Infernal",
    "Primordial",
    "Sylvan",
    "Undercommon"
]

class RacialTraitsIndex extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            inputNeeded: [],
            inputAcquired: []
        }
    }

    render(){
        let features = this.props.features;
        let race = this.props.race;
        let subRace = this.props.subRace;
        let languageOptions = languagesIndex.map(e=><option value={e}>{e}</option>)

        if (!this.props.progress.includes("baseStats")) {
            return null
        }
        
        else {

            return(
                <div>
                    <h1>these are your features</h1>
                    <h2>{features.join(', ')}</h2>
                </div>
            )
        }

        
    }
}

const mapStateToProps = state => {
    return({
        features: state.features,
        race: state.raceDetails.race,
        subRace: state.raceDetails.subRace,
        progress: state.progress
    })
}

export default connect(mapStateToProps)(RacialTraitsIndex)