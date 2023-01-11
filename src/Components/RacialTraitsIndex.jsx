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
            inputNeeded: -1,
            inputAcquired: [],
            subClass: undefined,
            savedInfo: [],
            selectors: 0
        }
    }

    componentDidUpdate(){
        const numSelectors = document.getElementsByClassName("subClassSelector").length
        this.countSelectors(numSelectors)
        
    }

    countSelectors = (num) => {
        if(this.state.selectors === num) {
            return null
        } else {
            this.setState({selectors: num, inputNeeded: num})
        }
    }

    handleSubClassChange = (event) => {
        this.setState({subClass: event.target.value})
    }

    subClassSelector = (targetFeature, group) => {
        if(!this.props.features.includes(targetFeature)){return null} else {
            let options = [];
            if(group === 2){
                const subClasses2 = this.props.classDetails.subClasses2;
                options = Object.keys(subClasses2);
            } else {
                const subClasses = this.props.classDetails.subClasses;
                options = Object.keys(subClasses);
            }
           
            const selectorOptions = options.map((e, i)=><option value={e} key={i}>{e}</option>)
            
        return (
            <div className="subClassSelector" >
                <h3>Select {targetFeature}:</h3>
                <select onChange={this.handleSubClassChange}>
                    <option>(select)</option>
                    {selectorOptions}
                </select>
                <button disabled={false} id={targetFeature} value={targetFeature} onClick={this.handleSubmit}>submit</button>
            </div>
        )}
    }

    handleSubmit = (event) => {
        this.setState({inputNeeded: this.state.inputNeeded - 1})
        this.mapResults(event.target.value)
    }

    mapResults = (targetFeature) => {
        const subClass = this.state.subClass;
        const lv = this.props.level;
        let info = this.props.classDetails.subClasses;
        if (this.props.classDetails.subClasses2.hasOwnProperty(subClass)) {
            info = this.props.classDetails.subClasses2
        };
        
        let results = [];
        for (let i=0; i<=lv; i++) {
            if(info[subClass].hasOwnProperty(i)){
                results.push(info[subClass][i])
            }
        }
        this.setState({savedInfo: [...this.state.savedInfo, ...results] })
        document.getElementById(targetFeature).disabled = true;
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
                    
                    {this.subClassSelector("Fighting Style", 2)}


                    {this.state.inputNeeded === 0 && <button>continue</button>}
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