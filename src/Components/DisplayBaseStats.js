import React from "react";
import { useSelector } from "react-redux";

export const DisplayBaseStats = () => {
    const stats = useSelector((state)=>state.baseStats)
    const display = ([['Strength: ', stats[0]], ['Dexterity: ', stats[1]], ['Constitution: ', stats[2]], 
    ['Intelligence: ', stats[3]], ['Wisdom: ', stats[4]], ['Charisma: ', stats[5]]]).map((i)=><div key={i} className='statDisplay'><h3>{i.join('')}</h3></div>)
    return(
        <div id='displayBaseStats'>
            {display}
        </div>
    )
}