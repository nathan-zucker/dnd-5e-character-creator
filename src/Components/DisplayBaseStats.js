import { select, selectAll } from "d3";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import FancyAbilityScores from "./FancyAbilityScores";


const colorWheel = {
    purple: "#BFABFF",
    yellow: "#ebffab",
    orange: "#ffbfab",
    green: "#abffbf",
}

export const DisplayBaseStats = () => {
    const stats = useSelector((state)=>state.baseStats.stats)
    const bonus = useSelector((state)=>state.raceDetails.abilityScoreIncrease)
    const mods = useSelector((state)=>state.baseStats.modifiers[0])
    const [hidden, hide] = useState(false)
    
    const progress = useSelector((state)=>state.progress)
    
    let display = null;

    useEffect(()=>{
        if(!hidden){
            const index = stats.length;
            
            if(index === 6){
                hide(true)
            }

            const nodeList = selectAll(".statDisplay")._groups[0];
            console.log(nodeList)
            
            for (let i=0; i<nodeList.length; i++) {
                select(nodeList[i])
                    .style("text-shadow", "0 0 2px "+colorWheel.purple)
            }
            
            select(nodeList[index])
                .style("text-shadow", "0 0 6px "+colorWheel.green)
            
        }
    })

    if(hidden && progress.includes("baseStats")){
        return (
            <div id="alternate-AS-display">
                <FancyAbilityScores />
            </div>
        )
    }
  
    if(stats !== null && mods === [0,0,0,0,0,0]){

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
            <FancyAbilityScores />
            {display}
        </div>
    )
}
