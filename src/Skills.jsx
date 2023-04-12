import { selectAll } from "d3";
import React from "react";
import {connect} from "react-redux";

const allSkills = [
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
            bonusSkillPicks: 0,
            bonusSkillOptions: [],
            button1disabled: false,
            languages: [],
            languagePicks: 0,
            languageOptions: [],
            button2disabled: false,
            button3disabled: false,
        }
    }

    componentDidMount(){
        if (this.props.state.progress.includes('alignment') && this.state.hidden === true) {
            this.loadComponent();
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
        
        let bonusSkillPicks = this.props.state.skillProficiencies.bonus[0];
        let bonusSkillOptions = this.props.state.skillProficiencies.bonus[1];


        if (options.includes('any')) {
            options = skillsBank
        };

        for(let i=0; i<options.length; i++){
            if (proficiencies.includes(options[i])) {
                options.splice(i, 1)
            }
        };

        for(let i=0; i<bonusSkillOptions.length; i++){
            if (proficiencies.includes(bonusSkillOptions[i])) {
                bonusSkillOptions.splice(i, 1)
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
            bonusSkillPicks: bonusSkillPicks,
            bonusSkillOptions: bonusSkillOptions,
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

    BonusSkillOptionCards = () => {
        return (
            this.state.bonusSkillOptions.map((e, i)=>
            <button
                key={i}
                className="skillOption" 
                value={e}
                onClick={this.selectBonusSkill} >
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

    selectBonusSkill = (event) => {
        let options = this.state.skillOptions;
        options.splice(options.indexOf(event.target.value), 1)
        if (this.state.bonusSkillPicks > 0) {
            this.setState((state)=>{
                return {
                    bonusSkillPicks: state.bonusSkillPicks - 1,
                    bonusSkillOptions: options,
                    proficiencies: [...state.proficiencies, event.target.value]
                }
            })
        }
        if (this.state.skillPicks <= 1) {
            selectAll(".skillOption").attr("disabled", "true")
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
            setTimeout(()=>{ this.setState({finalized: true}) }, 600)
        }
    }

    handleSubmit = () => {
        this.props.dispatch('updateSkillProficiencies', this.state.proficiencies);
        this.setState({button1disabled: true})
        
        if (this.state.skillPicks + this.state.languagePicks === 0 && !this.props.state.progress.includes('skills') ) {
            console.log("end skill lang")
            this.props.dispatch("updateProgress", "skills")
            setTimeout(()=>{ this.setState({finalized: true}) }, 600)
        }
        if (this.state.finalized === true) {
            this.setState({button3disabled: true})
        }
    }

    render(){

        if (this.props.state.progress.includes('equipment')) {
            return null;
        }

        if (this.state.finalized === true || !this.props.state.progress.includes("alignment")) {
            return (
                <div className="bonus-skills input-card">
                    <h2>BONUS SKILLS!</h2>
                    {this.state.bonusSkillPicks > 0 ? <div className="skill-option-container">{this.BonusSkillOptionCards()}</div> : null}
                    {this.state.bonusSkillPicks === 0 && this.state.proficiencies.length !== 0 ?
                        <button
                            onClick={()=>this.handleSubmit()}
                            disabled={this.state.button3disabled}
                        >
                            submit
                        </button>
                    : null}
                </div>
            )
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
                    
                    {this.state.skillPicks > 0 || this.state.proficiencies !== [] ? <div>
                        <h2>Choose {this.state.skillPicks} more skills!</h2>
                        <div className="skill-option-container">{this.skillOptionCards()}</div>
                    </div> : null}
                    

                    { this.state.skillPicks === 0 && this.state.proficiencies !== [] ? 
                    <button 
                        onClick={this.handleSubmit}
                        disabled={this.state.button1disabled}>
                        submit skills
                    </button> 
                    : null}
                    <h4>Skills: {this.state.proficiencies.join(', ')}</h4>

                    <div>
                        {this.state.languagePicks > 0 || this.props.state.languages.picks !== 0 ? <div>

                            <h2>Choose {this.state.languagePicks} more languages!</h2>
                            <div className="language-option-container">{this.languageOptionCards()}</div>
                        </div> : null}
                        
                        
                        { this.state.languagePicks === 0 && this.props.state.languages.picks !== 0 ? 
                            <button
                                onClick={this.submitLanguages}
                                disabled={this.state.button2disabled}>
                                submit languages
                            </button> 
                        : null }
                        <h4>Languages: {this.state.languages.join(', ')}</h4>
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
export {skillsBank, languageBank, allSkills}