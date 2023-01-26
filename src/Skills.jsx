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
        } else {
            console.log('no more skill picks!')
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
        else{
            console.log('no more language picks!')
        }
    }

    submitLanguages = () => {
        this.props.dispatch('updateLanguages', this.state.languages);
        this.setState({button2disabled: true});
    }

    handleSubmit = () => {
        this.props.dispatch('updateSkillProficiencies', this.state.proficiencies);
        this.setState({button1disabled: true})
    }

    render(){

        if (this.state.hidden === true) {
            return (
                <div>
                    <button onClick={this.loadComponent}>Begin!</button>
                </div>
            )
        }

        else {

            return(
                <div>
                    <h1>Skills!</h1>
                    <h2>You are proficient in these skills: </h2>
                    <h4>{this.state.proficiencies.join(', ')}</h4>

                    {this.state.skillPicks > 0 ? <div>
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
                        {this.state.languagePicks > 0 ? <div>
                            <h2>languages</h2>
                            <h3>you know these languages: {this.state.languages.join(', ')}</h3>
                            <h4>you may choose {this.state.languagePicks} more languages from the following list: </h4>
                            <div>{this.languageOptionCards()}</div>
                        </div> : null}
                        
                        
                        { this.state.languagePicks === 0 && this.state.languagePicks !== [] ? 
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