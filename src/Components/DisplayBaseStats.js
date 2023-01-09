import React from "react";
import { useSelector } from "react-redux";

export const DisplayBaseStats = () => {
    const stats = useSelector((state)=>state.baseStats.stats)
    const bonus = useSelector((state)=>state.raceDetails.abilityScoreIncrease)
    const mods = useSelector((state)=>state.baseStats.modifiers)
    //const progress = useSelector((state)=>state.progress)
    
    let display = null;
    
    if(stats !== null && mods === undefined){


            display = ([
                ['Strength: ', stats[0] || null, "+",bonus[0]], 
                ['Dexterity: ', stats[1] || null, "+",bonus[1]], 
                ['Constitution: ', stats[2] || null, "+",bonus[2]], 
                ['Intelligence: ', stats[3] || null, "+",bonus[3]], 
                ['Wisdom: ', stats[4] || null, "+",bonus[4]], 
                ['Charisma: ', stats[5] || null, "+",bonus[5]]
            ]).map((i)=><div key={i} className='statDisplay'><h3>{i.join('')}</h3></div>)
        
    } else if (mods !== undefined) {
        
        display = ([
            ["Strength: ", stats[0], mods[1][0]],
            ["Dexterity: ", stats[1], mods[1][1]],
            ["Constitution: ", stats[2], mods[1][2]],
            ["Intelligence: ", stats[3], mods[1][3]],
            ["Wisdom: ", stats[4], mods[1][4]],
            ["Charisma: ", stats[5], mods[1][5]]
        ]).map((i)=><div key={i} className='statDisplay'><h3>{i.join('')}</h3></div>)
    }
        
    return(
        <div id='displayBaseStats'>
            {display}
        </div>
    )
}
