import React from "react";
import { connect } from "react-redux";
import ToolProficiency from "./RaceFeatures/ToolProficiency";
import AbilityScordIncrease from "./AbilityScoreIncrease"


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
            inputAcquired: [],
            subClass: undefined,
        }
    }

    handleSubClassChange = (event) => {
        this.setState({subClass: event.target.value})
    }

    /**options = [[subclass, label], [subClass, label]] */

    subClassSelector = (targetFeature) => {
        if(!this.props.features.includes(targetFeature)){return null} else {
            const subClasses = this.props.classDetails.subClasses;
            const options = Object.keys(subClasses)
        const selectorOptions = options.map((e, i)=><option value={e} key={i}>{e}</option>)
        return (
            <div className="subClassSelector">
                <h3>Select {targetFeature}:</h3>
                <select onChange={this.handleSubClassChange}>
                    <option>(select)</option>
                    {selectorOptions}
                </select>
                <button onClick={this.mapResults}>submit</button>
            </div>
        )}
    }

    mapResults = () => {
        const subClass = this.state.subClass;
        const lv = this.props.level;
        const info = this.props.classDetails;

        const subs = Object.keys(info.subClasses);
        console.log(subs)
        
        let results = [];
        for (let i=0; i<=lv; i++) {
            if(info.subClasses[subClass].hasOwnProperty(i)){
                results.push(info.subClasses[subClass][i])
            }
        }
        console.log(results)
    }


    render(){
        let features = this.props.features;
        
        
        if (!this.props.progress.includes("baseStats")) {
            return null
        }
        
        else {

            return(
                <div>
                    <h1>these are your features</h1>
                    <h2>{features.join(', ')}</h2>

                    {this.subClassSelector("Primal Path")}
                    {this.subClassSelector("Bard College")}
                    {this.subClassSelector("Divine Domain")}
                    {this.subClassSelector("Druid Circle")}
                    {this.subClassSelector("Martial Archetype")}
                    {this.subClassSelector("Monastic Tradition")}
                    {this.subClassSelector("Sacred Oath")}
                    {this.subClassSelector("Ranger Archetype")}
                    {this.subClassSelector("Rogueish Archetype")}
                    {this.subClassSelector("Pact Magic")}
                    {this.subClassSelector("Arcane Tradition")}
                    {this.subClassSelector("Sorcerous Origins")}
                    


                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return({
        level: state.class[0][1],
        classDetails: state.classDetails,
        features: state.features,
        race: state.raceDetails.race,
        subRace: state.raceDetails.subRace,
        progress: state.progress
    })
}

export default connect(mapStateToProps)(RacialTraitsIndex)