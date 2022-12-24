import React from "react"
import { connect } from "react-redux"

class Race extends React.Component {
    constructor(props){
        super(props)
        this.state={
            race: '',
            subRace: ''
        }
        this.selectRace = this.selectRace.bind(this)
        this.selectSubRace = this.selectSubRace.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    selectRace(event) {
        this.setState({race: event.target.value, subRace: ''})
    }

    selectSubRace(event) {
        this.setState({subRace: event.target.value})
    }

    handleSubmit() {
        this.props.submitRace(this.state.race)
        this.props.submitSubRace(this.state.subRace)
        this.props.updateProgress()
    }

    render(){
        if (this.props.progress.includes('baseStats') && !this.props.progress.includes('race')) {
            return(
                <div>
                    <h1>Select Race</h1>
                    <div id='container'>
                        <div className='nestedRadio'>
                            <label>
                                <input onChange={this.selectRace} type='radio' value='dwarf' name='race'></input>
                                Dwarf
                            </label>
                            {this.state.race === 'dwarf' ? 
                                <div>
                                    <label>
                                        <input onChange={this.selectSubRace} type = 'radio' value='hill' name='subRace'></input>
                                        Hill Dwarf
                                    </label>
                                    <label>
                                        <input onChange={this.selectSubRace} type = 'radio' value='mountain' name='subRace'></input>
                                        Mountain Dwarf
                                    </label>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onChange={this.selectRace} type='radio' value='elf' name='race'></input>
                                Elf
                            </label>
                            {this.state.race === 'elf' ? 
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='high'></input>
                                            High Elf
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='wood'></input>
                                            Wood Elf
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onChange={this.selectRace} type='radio' value='halfling' name='race'></input>
                                Halfing
                            </label>
                            {this.state.race === 'halfling' ?
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='lightfoot'></input>
                                            Lightfoot
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='stout'></input>
                                            Stout
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onChange={this.selectRace} type='radio' value='human' name='race'></input>
                                Human
                            </label>
                            {this.state.race === 'human' ?
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='ability-score'></input>
                                            Ability Score Increase
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='skill'></input>
                                            Skill
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='feat'></input>
                                            Feat
                                        </label>
                                    </div>
                                </div>
                            : null }
                        </div>
                        <div className='radio'>
                            <label>
                                <input onChange={this.selectRace} type='radio' value='dragonborn' name='race'></input>
                                Dragonborn
                            </label>
                            {this.state.race === 'dragonborn' ?
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='black'></input>
                                            Black
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='blue'></input>
                                            Blue
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='brass'></input>
                                            Brass
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='bronze'></input>
                                            Bronze
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='copper'></input>
                                            Copper
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='gold'></input>
                                            Gold
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='green'></input>
                                            Green
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='red'></input>
                                            Red
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='silver'></input>
                                            Silver
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='white'></input>
                                            White
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onChange={this.selectRace} type='radio' value='gnome' name='race'></input>
                                Gnome
                            </label>
                            {this.state.race === 'gnome' ? 
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='forest'></input>
                                            Forest
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='rock'></input>
                                            Rock
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onChange={this.selectRace} type='radio' value='half-elf' name='race'></input>
                                Half-Elf
                            </label>
                        </div>
                        <div className='radio'>
                            <label>
                                <input onChange={this.selectRace} type='radio' value='half-orc' name='race'></input>
                                Half-Orc
                            </label>
                            {this.state.race === 'half-orc' ? 
                                <div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='scarred'></input>
                                            Scarred and Strong
                                        </label>
                                    </div>
                                    <div className='subRadio'>
                                        <label>
                                            <input onChange={this.selectSubRace} type='radio' name='subRace' value='Gruumsh'></input>
                                            The Mark of Gruumsh
                                        </label>
                                    </div>
                                </div>
                            : null}
                        </div>
                        <div className='radio'>
                            <label>
                                <input onChange={this.selectRace} type='radio' value='tiefling' name='race'></input>
                                Tiefling
                            </label>
                        </div>
                        {this.state.race !== '' ?
                            <div>
                                <h2>you have selected: {this.state.subRace} {this.state.race}</h2>
                                <button onClick={()=>this.setState({race: '', subRace: ''})}>RESET</button>
                                <button onClick={this.handleSubmit}>SUBMIT</button>
                            </div>
                        : null}
                        
                    </div>
                </div>
            )
        } else {return null}
    } 
}

const sendRace = (race) => {
    return ({
        type: 'race',
        payload: race
    })
}

const sendSubRace = (subRace) => {
    return({
        type: 'subRace',
        payload: subRace
    })
}

const updateProgress = () => {
    return({
        type: 'submitRace'
    })
}

const mapStateToProps = state => {
    return{
        progress: state.progress,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitRace: (race) => { dispatch(sendRace(race)) },
        submitSubRace: (subRace) => { dispatch(sendSubRace(subRace)) },
        updateProgress: () => { dispatch(updateProgress()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Race)