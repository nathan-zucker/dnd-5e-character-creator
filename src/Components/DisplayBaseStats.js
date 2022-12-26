import React from "react";
import { useSelector } from "react-redux";

export const DisplayBaseStats = () => {
    const stats = useSelector((state)=>state.baseStats)
    const bonus = useSelector((state)=>state.raceDetails.abilityScoreIncrease)
    const mergeStats = (a, b) => a.map((e, i)=>e+b[i])
    const finalStats = mergeStats(stats, bonus)
    const display = ([['Strength: ', finalStats[0]], ['Dexterity: ', finalStats[1]], ['Constitution: ', finalStats[2]], 
    ['Intelligence: ', finalStats[3]], ['Wisdom: ', finalStats[4]], ['Charisma: ', finalStats[5]]]).map((i)=><div key={i} className='statDisplay'><h3>{i.join('')}</h3></div>)
    return(
        <div id='displayBaseStats'>
            {display}
        </div>
    )
}