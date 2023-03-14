import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { select, selectAll } from "d3";

import { Fieldset } from 'primereact/fieldset';



function ProgressBar() {
    const progress = useSelector((state)=>state.progress)
    const [ blocks, setBlocks ] = useState(<div>no progress yet</div>)
    const [ blocksList, setBlocksList ] = useState([])
    const [ classBlock, setClassBlock ] = useState(<div></div>)
    const store = useSelector((state)=>state)
    const blocksData = useSelector((state)=>{
        return ([
            [ state.class[0][0], `Level ${state.class[0][1]} ${state.class[1]} `, [ "features", state.features.join(', ') ] ],
            [ state.race[0], state.race[1], [ "notes", `Dark vision: ${state.raceDetails.darkVision}, Size: ${state.raceDetails.size}, Speed: ${state.raceDetails.speed}'` ] ],
            [ "simplified AS display", "", [ "tooltip", `Str: ${state.baseStats.stats[0]}, Dex: ${state.baseStats.stats[1]}, Con: ${state.baseStats.stats[2]}, Int: ${state.baseStats.stats[3]}, Wis: ${state.baseStats.stats[4]}, Cha: ${state.baseStats.stats[5]} ` ] ],
            [ state.background.background, state.alignment, [ "tooltip", "details..." ] ]
        ])
    })
    const classLevelBlock = useSelector((state)=>{
        return (
            <div className="progress-block" key={0} >
            <h3>{`Level ${state.class[0][1]} ${state.class[1]} `} {state.class[0][0]}</h3>
            <div className="progress-tooltip">
                <Fieldset legend={`Level ${state.class[0][1]} ${state.class[1]}`}>
                    <p className="m-0">features: {state.features.join(', ')}</p>
                </Fieldset>
            </div>
        </div>
        )
    })

    const breakpoints = ['classLevel', 'race', 'baseStats', 'alignment']

    useEffect(()=>{
        if (progress.includes('classLevel')) {
            setClassBlock(
                <div className="progress-block">
                    <h3>Level {store.class[0][1]} {store.class[0][0]}</h3>
                    <div className="progress-tooltip">
                        <Fieldset legend={`your ${store.class[0][0]}`} style={{"backgroundColor": "transparent", "border": "none", "backdropFilter": "blur(5px)"}}>
                        <p className="m-0" style={{"textShadow": "0 0 3px black", "fontSize": "17px"}}>
                            Primary ability:  {store.classDetails.primaryAbility.join(' / ')}<br/>
                            Armor Types:  {store.armor.proficiencies.join(", ")}<br/>
                            Weapon Types:  {store.weaponProficiencies.join(", ")}<br/>
                            Features: {store.features.join(", ")}
                        </p>
                        </Fieldset>
                    </div>
                </div> 
            )
            setTimeout(()=>bindToolTip(), 100)

            return;
        }
    },[progress])

    function showTooltip(e) {
        select(e.srcElement).select(".progress-tooltip")
            .style("opacity", 1)
            .style("top", `calc(${20}vh + ${60}px)`)
            .style("left", `1000px`)
            .transition()
            .style("left", `${e.clientX - 50}px`)
    }

    function hideTooltip(e) {
        selectAll(".progress-tooltip")
            .transition()
            .style("opacity", 0)
            .style("top", -600+"px")
    }

    function bindToolTip(){
        selectAll(".progress-block")
        .on("mouseover", e => showTooltip(e) )
        .on("mouseout", e => hideTooltip(e) )
    }

    //console.log(blocks, blocksData)

    return (
        <div id="progress-bar">
            {classBlock}
        </div>
    )

}

export default ProgressBar;

/**
 * {progress.includes('classLevel') ? {classLevelBlock} : null}
            {progress.includes('race') ? {raceBlock} : null}
            {progress.includes('baseStats') ? {abilityScoresBlock} : null}
            {progress.includes('alignment') ? {backgroundBlock} : null}
 */