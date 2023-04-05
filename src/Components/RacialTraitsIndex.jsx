import { selectAll } from "d3";
import React from "react";
import { connect } from "react-redux";
//import ToolProficiency from "./RaceFeatures/ToolProficiency";
import AbilityScordIncrease from "./AbilityScoreIncrease";
import './RacialTraitsIndex.css'

class RacialTraitsIndex extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hidden: false,
            inputNeeded: -1,
            inputAcquired: 0,
            subClass: undefined,
            savedInfo: [],
            selectors: 0
        }
    }

    componentDidMount(){
        //console.log("loading extra choices")
        const selectorButtons = document.getElementsByClassName("subClassSubmit")
        //console.log("subclass buttons",selectorButtons.length)
        if (selectorButtons.length === 0) {
            this.props.sendPackage('submitSubClass')
        }
        this.countSelectors(selectorButtons.length)
    }

    componentDidUpdate(){
        //console.log("loading extra choices")
        const selectorButtons = document.getElementsByClassName("subClassSubmit")
        this.countSelectors(selectorButtons.length)
    }

    countSelectors = (num) => {
        if(this.state.selectors === num) {
            return null
        } else {
            let numRemaining = num - this.state.inputAcquired
            this.setState({selectors: num, inputNeeded: numRemaining})
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
            }
            else {
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
                <button disabled={false} className="subClassSubmit" id={targetFeature} value={targetFeature} onClick={this.handleSubmit}>submit</button>
            </div>
        )}
    }

    handleSubmit = (event) => {
        this.setState({inputNeeded: this.state.inputNeeded - 1, inputAcquired: this.state.inputAcquired + 1})
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

    handleContinue = (e) => {
        // DISPATCH SUBCLASS SELECTION
        this.props.sendPackage("subClass", this.state.subClass)
        this.dispatchInfo()
        this.setState({inputNeeded: -1})
        this.props.sendPackage('submitSubClass')
    }

    dispatchInfo = () => {
        let info = this.state.savedInfo.map(e=>e);
        let keys;
        let infoType;
        let infoPayload;
        let type;
        let payload;
        console.log("processing",info)

        info.forEach(infoObj=>{
            keys = Object.keys(infoObj)
            for (let i=0; i<keys.length; i++) {
                infoType = keys[i];
                infoPayload = infoObj[keys[i]];
                let spellObj = Object.assign({}, infoObj.spellCasting);
                

                switch(infoType){
                    case 'features': 
                        type = 'addFeatureArray';
                        payload = infoPayload;
                        this.props.sendPackage(type, payload)
                        break;
                    case 'spellCasting':
                        
                        
                        const subKeys = Object.keys(spellObj)
                        
                        // COMBINE DATA FROM REDUX STORE

                        subKeys.forEach(e=>{
                            if (this.props.spellCasting.hasOwnProperty(e)) {
                                const a = spellObj[e];
                                const b = this.props.spellCasting[e];
                                let c = [];
                                
                                if (e === "slots") {
                                    a.length > b.length ? c=a.map((e, i)=>e+b[i] || e) : c=b.map((e,i)=>e+a[i] || e)
                                    spellObj[e] = c;
                                } 
                                else if ( Array.isArray(a) ) {
                                    spellObj[e] = a.concat(b);
                                    console.log("concatenating to state array", spellObj[e])
                                } 
                                else {
                                    spellObj[e] = a + b;
                                }
                            } 
                            else { 
                                console.log('new data', spellObj);
                            }
                        })

                        // SEND ENTIRE UPDATED SPELLCASTING OBJECT
                        
                        type = "updateSpells";
                        
                        payload = Object.assign({}, this.props.spellCasting, spellObj);
                        this.props.sendPackage(type, payload)
                        
                    break;

                    default:
                    this.props.sendPackage('classDetailsOptions', infoPayload);
                    console.log("dispatched ",infoType, infoPayload);

                }

                
            }
        })
    }

    render(){

        if (!this.props.progress.includes("baseStats") || this.props.progress.includes("subClass") ) {
            return null
        }
        
        else {
            return(
                <div id="subClass-selections" className="input-card">
                    {this.props.features.includes('Ability Score Improvement') ? 
                        <div>
                            <AbilityScordIncrease picks={2} bonuses={this.props.raceDetails.abilityScoreIncrease} />
                        </div> 
                    : null}

                    {this.subClassSelector("Primal Path")}
                    {this.subClassSelector("Bard College")}
                    {this.subClassSelector("Divine Domain")}
                    {this.subClassSelector("Druid Circle")}
                    {this.subClassSelector("Circle of the Land", 2)}

                    {this.subClassSelector("Martial Archetype")}
                    {this.subClassSelector("Monastic Tradition")}
                    {this.subClassSelector("Sacred Oath")}
                    {this.subClassSelector("Ranger Archetype")}
                    

                    {this.subClassSelector("Rogueish Archetype")}
                    {this.subClassSelector("Pact Magic")}
                    {this.subClassSelector("Arcane Tradition")}
                    {this.subClassSelector("Sorcerous Origins")}
                    
                    {this.subClassSelector("Fighting Style", 2)}


                    {this.state.inputNeeded === 0 || this.state.selectors === 0 ? 
                    <button onClick={this.handleContinue} >continue</button> : null}
                </div>
            )
        }
    }
}



const sendPackage = (type, payload) => {
    return {
        type: type,
        payload: payload
    }
}



const mapStateToProps = state => {
    return({
        level: state.class[0][1],
        classDetails: state.classDetails,
        features: state.features,
        race: state.raceDetails.race,
        subRace: state.raceDetails.subRace,
        raceDetails: state.raceDetails,
        spellCasting: state.spellCasting,
        progress: state.progress
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendPackage: (type, payload) => { dispatch(sendPackage(type, payload)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RacialTraitsIndex)