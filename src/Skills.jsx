import { selectAll } from "d3";
import React from "react";
import {connect} from "react-redux";

const skillsBank = [
    "Athletics (Str)",
    "Acrobatics (Dex)",
    "Sleight of Hand (Dex)",
    "Stealth (Dex)",
    "Arcana (Int)",
    "History (Int)",
    "Investigation (Int)",
    "Nature (Int)",
    "Religion (Int)",
    "Animal Handling (Wis)",
    "Insight (Wis)",
    "Medicine (Wis)",
    "Perception (Wis)",
    "Survival (Wis)",
    "Deception (Cha)",
    "Intimidation (Cha)",
    "Performance (Cha)",
    "Persuasion (Cha)"
]

const languageBank = [
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

class Skills extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hidden: true,
            finalized: false,
            proficiencies: [],
            skillPicks: 0,
            skillOptions: [],
            button1disabled: false,
            languages: [],
            languagePicks: 0,
            languageOptions: [],
            button2disabled: false
        }
    }

    componentDidUpdate(){

    }

    loadComponent = () => {
        let proficiencies = [...this.props.state.skillProficiencies.proficiencies];
        let picks = this.props.state.classDetails.skills[0];
        let options = [...this.props.state.classDetails.skills[1]];
        let languages = [...this.props.state.languages.languages];
        let languagePicks = this.props.state.languages.picks;
        let languageOptions = languageBank;
        
        if (options.includes('any')) {
            options = skillsBank
        };

        for(let i=0; i<options.length; i++){
            if (proficiencies.includes(options[i])) {
                options.splice(i, 1)
            }
        };

        for(let i=0; i<languageOptions.length; i++){
            if(languages.includes(languageOptions[i])) {
                languageOptions.splice(i, 1)
            }
        };

        this.setState({
            hidden: false,
            proficiencies: proficiencies,
            skillPicks: picks,
            skillOptions: options,
            languages: languages,
            languagePicks: languagePicks,
            languageOptions: languageOptions
        })
    }

    skillOptionCards = () => {
        return (
            this.state.skillOptions.map((e, i)=>
            <button
                key={i}
                className="skillOption" 
                value={e}
                onClick={this.selectSkill} >
                {e}
            </button>
            )
        )
    }

    languageOptionCards = () => {
        return(
            this.state.languageOptions.map((e, i)=>
            <button
                className="languageOption"
                key={i}
                value={e}
                onClick={this.selectLanguage}>
                {e}
            </button>
            )
        )
    }

    selectSkill = (event) => {
        let options = this.state.skillOptions;
        options.splice(options.indexOf(event.target.value), 1)
        if (this.state.skillPicks > 0) {
            this.setState((state)=>{
                return {
                    skillPicks: state.skillPicks - 1,
                    skillOptions: options,
                    proficiencies: [...state.proficiencies, event.target.value]
                }
            })
        } 
        if (this.state.skillPicks <= 1) {
            selectAll(".skillOption")
                .attr("disabled", "true")
        }
    }

    selectLanguage = (event) => {
        let options = this.state.languageOptions;
        options.splice(options.indexOf(event.target.value), 1);
        if (this.state.languagePicks > 0) {
            this.setState((state)=>{
                return {
                    languagePicks: state.languagePicks - 1,
                    languageOptions: options,
                    languages: [...state.languages, event.target.value]
                }
            });
        }
        if (this.state.languagePicks <= 1) {
            selectAll(".languageOption")
                .attr("disabled", "true")
        }
    }

    submitLanguages = () => {
        this.props.dispatch('updateLanguages', this.state.languages);
        this.setState({button2disabled: true});

        if (this.state.skillPicks + this.state.languagePicks === 0 ) {
            console.log("end skill lang")
            this.props.dispatch("updateProgress", "skills")
            this.setState({finalized: true})
        }
    }

    handleSubmit = () => {
        this.props.dispatch('updateSkillProficiencies', this.state.proficiencies);
        this.setState({button1disabled: true})
        
        if (this.state.skillPicks + this.state.languagePicks === 0 ) {
            console.log("end skill lang")
            this.props.dispatch("updateProgress", "skills")
            this.setState({finalized: true})
        }
    }

    render(){

        if (this.state.finalized === true || !this.props.state.progress.includes("alignment")) {
            return null
        }

        if (this.state.hidden === true) {
            return (
                <div id="prompt-skills" className="input-card">
                    <h1>skills</h1>
                    <button onClick={this.loadComponent}>Begin!</button>
                </div>
            )
        }

        else {

            return(
                <div id="skills-container" className="input-card">
                    <h2>You are proficient in these skills: </h2>
                    <h4>{this.state.proficiencies.join(', ')}</h4>

                    {this.state.skillPicks > 0 || this.state.proficiencies !== [] ? <div>
                        <h2>You may choose {this.state.skillPicks} more skills from the following list:</h2>
                        <div>{this.skillOptionCards()}</div>
                    </div> : null}
                    

                    { this.state.skillPicks === 0 && this.state.proficiencies !== [] ? 
                    <button 
                        onClick={this.handleSubmit}
                        disabled={this.state.button1disabled}>
                        submit skills
                    </button> 
                    : null}
                    <div>
                        {this.state.languagePicks > 0 || this.props.state.languages.picks !== 0 ? <div>
                            <h2>you know these languages: </h2>
                            <h3>{this.state.languages.join(', ')}</h3>
                            <h4>you may choose {this.state.languagePicks} more languages from the following list: </h4>
                            <div>{this.languageOptionCards()}</div>
                        </div> : null}
                        
                        
                        { this.state.languagePicks === 0 && this.props.state.languages.picks !== 0 ? 
                            <button
                                onClick={this.submitLanguages}
                                disabled={this.state.button2disabled}>
                                submit languages
                            </button> 
                        : null }

                    </div>
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        state: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (type, payload) => { dispatch({type: type, payload: payload}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills)