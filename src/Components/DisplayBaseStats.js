import React from "react";
import { useSelector } from "react-redux";

export const DisplayBaseStats = () => {
    const stats = useSelector((state)=>state.baseStats.stats)
    //const bonus = useSelector((state)=>state.raceDetails.abilityScoreIncrease)

    
    const display = ([
        ['Strength: ', stats[0] || null], 
        ['Dexterity: ', stats[1] || null], 
        ['Constitution: ', stats[2] || null], 
        ['Intelligence: ', stats[3] || null], 
        ['Wisdom: ', stats[4] || null], 
        ['Charisma: ', stats[5] || null]
    ]).map((i)=><div key={i} className='statDisplay'><h3>{i.join('')}</h3></div>)
    
    return(
        <div id='displayBaseStats'>
            {display}
        </div>
    )
}