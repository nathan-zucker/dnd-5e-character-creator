import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
//import './RollCard.css';
import audio from './sounds/cardSelect.mp3'
import { select } from "d3";



function RollCard(props) {
    const number = props.value
    const index = props.index
    //const bonuses = useSelector((state)=>state.raceDetails.abilityScoreIncrease)
    const [visible, setVisibility] = useState(true)
    const dispatch = useDispatch()

    function handleClick() {

        dispatch({ type: "selectStat", payload: { value: number, index: index } })
        console.error(select(`#roll-card-${index}`))
        select(`#roll-card-${index}`)
            .style("pointer-events", "none")
            .transition()
            .style("opacity", 0)
        setTimeout(()=>{ setVisibility(false) },0)
    }

    if (visible) {
        return (
            <div className='rollCard' id={`roll-card-${index}`} onClick={()=>handleClick()}>
                <h2 className='number'>{number}</h2>
            </div>
        )
    } else {
        return null;
    }

}

export default RollCard