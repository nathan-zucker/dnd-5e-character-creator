import React from "react";
import { connect } from "react-redux";

const data = {
    "Criminal": {
        skillProficiencies: ["Deception", "Stealth"],
        toolProficiencies: ["one type of gaming set", "thieve's tools"],
        equipment: ["crowbar", "set of dark common clothes including a hood", "belt pouch containing 15gp"],
        features: ["Criminal Specialty", "Criminal Contact"],
        variants: ["Spy"]
    },
    "Entertainer": {
        skillProficiencies: ["Acrobatics", "Performance"],
        toolProficiencies: ["disguise kit", "one type of musical instrument"],
        equipment: ["any one musical instrument", "the favor of an admirer", "a costume", "belt pouch containing 15gp"],
        features: ["Entertainer Routines", "By Popular Demand"],
        variants: ["Gladiator"]
    },
    "Folk Hero": {
        skillProficiencies: ["Animal Handling", "Survival"],
        toolProficiencies: ["one type of artisan's tools", "vehicles(land)"],
        equipment: ["any one artisan's tools", "shovel", "iron pot", "set of common clothes", "belt pouch containing 10gp"],
        features: ["Defining Event", "Rustic Hospitality"]
    },
    "Guild Artisan": {
        skillProficiencies: ["Insight", "Persuasion"],
        toolProficiencies: ["One type of artisan's tools"],
        languages: ["one of your choice"],
        equipment: ["any one artisan's tools", "letter of introduction from your guild", "set of traveler's clothes", "belt pouch containing 15gp"],
        features: ["Guild Business", "Guild Membership"],
        variants: ["Guild Merchant"]
    },
    "Hermit": {
        skillProficiencies: ["Medicine", "Religion"],
        toolProficiencies: ["herbalism kit"],
        languages: ["one of your choice"],
        equipment: ["scroll case stuffed full of notes from your studies or prayers", "winter blanket", "set of common clothes", "herbalism kit", "5gp"],
        features: ["Life of Seclusion", "Discovery"]
    },
    "Noble": {
        skillProficiencies: ["History", "Persuasion"],
        toolProficiencies: ["any one gaming set"],
        languages: ["one of your choice"],
        equipment: ["set of fine clothes", "signet ring", "scroll of pedigree", "purse containing 25gp"],
        features: ["Position of Privilege"],
        variants: ["Noble Knight"]
    },
    "Outlander": {
        skillProficiencies: ["Athletics", "Survival"],
        toolProficiencies: ["any one musical instrument"],
        languages: ["one of your choice"],
        equipment: ["staff", "hinting trap", "trophy from an animal you killed", "set of traveler's clothes", "belt pouch containing 10gp"],
        features: ["Origin", "Wanderer"]
    },
    "Sage": {
        skillProficiencies: ["Arcana", "History"],
        languages: ["two of your choice"],
        equipment: ["bottle of black ink", "quill", "small knife", "letter from a dead colleague posing a question you have not yet been able to answer", "set of common clothes", "belt pouch containing 10gp"],
        features: ["Specialty", "Researcher"]
    },
    "Sailor": {
        skillProficiencies: ["Athletics", "Perception"],
        toolbar: ["navigator's tools", "vehicles (water)"],
        equipment: ["belaying pin (club)", "50 feet of silk rope", "lucky charm", "set of common clothes", "belt pouch containing 10gp"],
        features: ["Ship's Passage"],
        variants: ["Pirate"]
    },
    "Soldier": {
        skillProficiencies: ["Athletics", "Intimidation"],
        toolProficiencies: ["any one gaming set", "vehicles (land)"],
        equipment: ["insignia of rank", "trophy taken from a fallen enemy", "set of bone dice OR deck of cards", "set of common clothes", "belt pouch containing 10gp"],
        features: ["Specialty", "Military Rank"]
    },
    "Urchin": {
        skillProficiencies: ["Sleight of Hand", "Stealth"],
        toolProficiencies: ["disguise kit", "thieve's tools"],
        equipment: ["small knife", "map of the city you grew up in", "pet mouse", "token to remember your parents by", "set of common clothes", "belt pouch containing 10gp"],
        features: ["City Secrets"]
    }
}


class Background extends React.Component {
    constructor(props){
        super(props);
        this.state={
            hidden: false,
            selection: undefined,
        }
    }

    handleChange = (event) => {
        this.setState({selection: event.target.value})
    }

    handleSubmit = () => {
        this.props.updateProgress()
    }

    render(){
        const options = Object.keys(data).map((e, i)=>
            <option value={e} key={i}>{e}</option>
        )

        if (this.state.hidden === true) { return null }
        
        else {
            return (
                <div>
                    <h2>now choose your Background</h2>
                    <select onChange={this.handleChange} value={this.state.selection}>
                        <option>(select)</option>
                        {options}
                    </select>
                    {this.state.selection !== undefined && 
                    <h2>you chose: {this.state.selection}</h2>}
                    <button onClick={this.handleSubmit}>submit</button>
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        progress: this.state.progress
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendPackage: (type, payload) => { dispatch({type: type, payload: payload}) },
        updateProgress: () => { dispatch({type: 'submitBackground'}) }
    }
}

export default connect(null, mapDispatchToProps)(Background)