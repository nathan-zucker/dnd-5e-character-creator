import React from "react";
import { connect } from "react-redux";

const data = {
    "Acoltye": {
        skillProficiencies: ['Insight (Wis)', "Religion (Int)"],
        languagePicks: 2,
        equipment: ["a holy symbol (a gift to you when you entered the priesthood)", "a prayer book or prayer wheel", "5 sticks of incense", "vestments", "a set of common clothes", "a belt pouch containing 15gp"],
        features: ["Shelter of the Faithful"]
    },
    "Charlatan": {
        skillProficiencies: ["Deception (Cha)", "Sleight of Hand (Dex)"],
        toolProficiencies: ["disguise kit", "forgery kit"],
        equipment: ["a set of fine clothes", "a disguise kit", "tools of the con of your choice (ten stoppered bottles filled with colored liquid, a set of weighted dice, a deck of marked cards, or a signet ring of an imaginary duke)", "a belt pouch containing 15gp"],
        features: ["Favorite Schemes", "False Identity"]
    },
    "Criminal": {
        skillProficiencies: ["Deception (Cha)", "Stealth (Dex)"],
        toolProficiencies: ["one type of gaming set", "thieve's tools"],
        equipment: ["crowbar", "set of dark common clothes including a hood", "belt pouch containing 15gp"],
        features: ["Criminal Specialty", "Criminal Contact"],
        variants: ["Spy"]
    },
    "Entertainer": {
        skillProficiencies: ["Acrobatics (Dex)", "Performance (Cha)"],
        toolProficiencies: ["disguise kit", "one type of musical instrument"],
        equipment: ["any one musical instrument", "the favor of an admirer", "a costume", "belt pouch containing 15gp"],
        features: ["Entertainer Routines", "By Popular Demand"],
        variants: ["Gladiator"]
    },
    "Folk Hero": {
        skillProficiencies: ["Animal Handling (Wis)", "Survival (Wis)"],
        toolProficiencies: ["one type of artisan's tools", "vehicles(land)"],
        equipment: ["any one artisan's tools", "shovel", "iron pot", "set of common clothes", "belt pouch containing 10gp"],
        features: ["Defining Event", "Rustic Hospitality"]
    },
    "Guild Artisan": {
        skillProficiencies: ["Insight (Wis)", "Persuasion (Cha)"],
        toolProficiencies: ["One type of artisan's tools"],
        languagePicks: 1,
        equipment: ["any one artisan's tools", "letter of introduction from your guild", "set of traveler's clothes", "belt pouch containing 15gp"],
        features: ["Guild Business", "Guild Membership"],
        variants: ["Guild Merchant"]
    },
    "Hermit": {
        skillProficiencies: ["Medicine (Wis)", "Religion (Int)"],
        toolProficiencies: ["herbalism kit"],
        languagePicks: 1,
        equipment: ["scroll case stuffed full of notes from your studies or prayers", "winter blanket", "set of common clothes", "herbalism kit", "5gp"],
        features: ["Life of Seclusion", "Discovery"]
    },
    "Noble": {
        skillProficiencies: ["History (Int)", "Persuasion (Cha)"],
        toolProficiencies: ["any one gaming set"],
        languagePicks: 1,
        equipment: ["set of fine clothes", "signet ring", "scroll of pedigree", "purse containing 25gp"],
        features: ["Position of Privilege"],
        variants: ["Noble Knight"]
    },
    "Outlander": {
        skillProficiencies: ["Athletics (Str)", "Survival (Wis)"],
        toolProficiencies: ["any one musical instrument"],
        languagePicks: 1,
        equipment: ["staff", "hinting trap", "trophy from an animal you killed", "set of traveler's clothes", "belt pouch containing 10gp"],
        features: ["Origin", "Wanderer"]
    },
    "Sage": {
        skillProficiencies: ["Arcana (Int)", "History (Int)"],
        languagePicks: 2,
        equipment: ["bottle of black ink", "quill", "small knife", "letter from a dead colleague posing a question you have not yet been able to answer", "set of common clothes", "belt pouch containing 10gp"],
        features: ["Specialty", "Researcher"]
    },
    "Sailor": {
        skillProficiencies: ["Athletics (Str)", "Perception (Wis)"],
        toolProficiencies: ["navigator's tools", "vehicles (water)"],
        equipment: ["belaying pin (club)", "50 feet of silk rope", "lucky charm", "set of common clothes", "belt pouch containing 10gp"],
        features: ["Ship's Passage"],
        variants: ["Pirate"]
    },
    "Soldier": {
        skillProficiencies: ["Athletics (Str)", "Intimidation (Cha)"],
        toolProficiencies: ["any one gaming set", "vehicles (land)"],
        equipment: ["insignia of rank", "trophy taken from a fallen enemy", "set of bone dice OR deck of cards", "set of common clothes", "belt pouch containing 10gp"],
        features: ["Specialty", "Military Rank"]
    },
    "Urchin": {
        skillProficiencies: ["Sleight of Hand (Dex)", "Stealth (Dex)"],
        toolProficiencies: ["disguise kit", "thieve's tools"],
        equipment: ["small knife", "map of the city you grew up in", "pet mouse", "token to remember your parents by", "set of common clothes", "belt pouch containing 10gp"],
        features: ["City Secrets"]
    }
}

const alignments = ["Lawful Good", "Neutral Good", "Lawful Neutral", "Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"];


class Background extends React.Component {
    constructor(props){
        super(props);
        this.state={
            hidden: false,
            selection: undefined,
            alignment: 'none',
            button1disabled: false,
            button2disabled: false,
        }
    }

    handleChange = (event) => {
        this.setState({selection: event.target.value})
    }

    handleSubmit = () => {
        this.props.dispatch('submitBackground')
        //DISABLE BUTTON AFTER INPUT
        this.setState({button1disabled: true})

        //GRAB DATA FROM BACKGROUNDS TABLE
        console.log(data[this.state.selection])
        const info = data[this.state.selection]

        //DISPATCH TO REDUX
        this.props.dispatch('updateBackground', this.state.selection)

        info.hasOwnProperty("skillProficiencies") && 
        this.props.dispatch('addSkillProficiencyArray', info.skillProficiencies);

        info.hasOwnProperty("toolProficiencies") &&
        this.props.dispatch('toolProficiencyArray', info.toolProficiencies);

        info.hasOwnProperty('languagePicks') &&
        this.props.dispatch('addLanguagePick', info.languagePicks);

        info.hasOwnProperty('equipment') &&
        this.props.dispatch('addEquipmentArray', info.equipment);

        info.hasOwnProperty('features') &&
        this.props.dispatch('addFeatureArray', info.features);

        info.hasOwnProperty('variants') &&
        this.props.dispatch('backgroundVariantOptions', info.variants)
    
    }

    changeAlignment = (event) => {
        this.setState({alignment: event.target.value})
    }

    submitAlignment = () => {
        this.props.dispatch('setAlignment', this.state.alignment)
        this.setState({button2disabled: true})
    }

    render(){
        const options = Object.keys(data).map((e, i)=>
            <option value={e} key={i}>{e}</option>
        );
        const alignmentOptions = alignments.map((e, i)=>
            <option value={e} key={i}>{e}</option>
        );

        if (this.state.hidden === true) { return null }
        
        else {
            return (
                <div>

                    <div>
                        <h2>now choose your Background</h2>
                        <select onChange={this.handleChange} value={this.state.selection}>
                            <option>(select)</option>
                            {options}
                        </select>
                        {this.state.selection !== undefined && 
                        <h2>you chose: {this.state.selection}</h2>}
                        <button disabled={this.state.button1disabled} onClick={this.handleSubmit}>submit</button>    
                    </div>
                    
                    <div>
                        <h2>choose your Alignment</h2>
                        <select 
                            value={this.state.alignment}
                            onChange={this.changeAlignment} >
                            <option>(select)</option>
                            {alignmentOptions}
                        </select>
                        <button 
                            disabled={this.state.button2disabled} 
                            onClick={this.submitAlignment} >
                            submit
                        </button>
                    </div>
                    

                    <h2>progress: {this.props.progress.join(', ')}</h2>
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        progress: state.progress,
        background: state.background
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (type, payload) => { dispatch({type: type, payload: payload}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Background)