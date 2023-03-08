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

    const scale = (window.screen.width / 1500)
    //console.log(scale)
    
    let display = null;

    useEffect(()=>{
        if(!hidden){
            const index = stats.length;
            
            if(index === 6){
                hide(true)
            }

            const nodeList = selectAll(".statDisplay")._groups[0];
            //console.log(nodeList)
            
            for (let i=0; i<nodeList.length; i++) {
                select(nodeList[i])
                    .style("text-shadow", "0 0 2px "+colorWheel.purple)
            }
            
            select(nodeList[index])
                .style("text-shadow", "0 0 6px "+colorWheel.green)
            
            select("#displayBaseStats")
                .attr("transform", "scale(.025)")
            
        }
    })

    if(hidden && progress.includes("baseStats")){
        return (
            <div id="displayBaseStats-alt">
                {/* <FancyAbilityScores /> */}
            </div>
        )
    }  
    else if(progress.includes("rolls")){
        return(
            <div id='displayBaseStats'>
                <FancyAbilityScores />
                {display}
            </div>
        )
    }
}
