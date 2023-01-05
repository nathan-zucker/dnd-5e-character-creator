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
        }
    }

    

    render(){
        let features = this.props.features;
        let race = this.props.race;
        let subRace = this.props.subRace;
        let languageOptions = languagesIndex.map(e=><option value={e}>{e}</option>)

        return(
            <div>
                <h1>Make some additional selections</h1>
                <h2>{features.join(', ')}</h2>
                
                {subRace === "Ability" && <AbilityHuman /> }
                {race === "Half Elf" && <AbilityHuman picks={1} />}
                {features.includes("Extra Language") && <select>{languageOptions}</select> }

                {features.includes("Tool Proficiency") ? <ToolProficiency /> : null}
               
                {/*features.includes("") ? < /> : null*/}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return({
        features: state.raceDetails.features,
        race: state.raceDetails.race,
        subRace: state.raceDetails.subRace
    })
}

export default connect(mapStateToProps)(RacialTraitsIndex)