import React from "react";
import { connect } from "react-redux";

class HighElfSelections extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
            <div>
                <h3>High Elf gets a cantrip and a language</h3>
            </div>
        )
    }
}

export default connect()(HighElfSelections)