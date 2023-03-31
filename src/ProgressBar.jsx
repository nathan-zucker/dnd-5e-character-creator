import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { select, selectAll } from "d3";

import { Fieldset } from 'primereact/fieldset';



function ProgressBar() {
    
    const [ blocks, setBlocks ] = useState(<div>no progress yet</div>)
    const [ blocksList, setBlocksList ] = useState([])
    const [ classBlock, setClassBlock ] = useState(<div></div>)
    const [ raceBlock, setRaceBlock ] = useState(<div></div>)
    const [ ASBlock, setASBlock ] = useState(<div></div>)
    const [ backgroundBlock, setBackgroundBlock ] = useState(<div></div>)
    
    const progress = useSelector((state)=>state.progress)
    const store = useSelector((state)=>state)
    const blocksData = useSelector((state)=>{
        return ([
            [ state.class[0][0], `Level ${state.class[0][1]} ${state.class[1]} `, [ "features", state.features.join(', ') ] ],
            [ state.race[0], state.race[1], [ "notes", `Dark vision: ${state.raceDetails.darkVision}, Size: ${state.raceDetails.size}, Speed: ${state.raceDetails.speed}'` ] ],
            [ "simplified AS display", "", [ "tooltip", `Str: ${state.baseStats.stats[0]}, Dex: ${state.baseStats.stats[1]}, Con: ${state.baseStats.stats[2]}, Int: ${state.baseStats.stats[3]}, Wis: ${state.baseStats.stats[4]}, Cha: ${state.baseStats.stats[5]} ` ] ],
            [ state.background.background, state.alignment, [ "tooltip", "details..." ] ]
        ])
    })

    const breakpoints = ['classLevel', 'race', 'baseStats', 'alignment']

    useEffect(()=>{
        if (!progress.includes('race') && progress.includes('classLevel')) {
            setClassBlock(
                <div className="progress-block">
                    <h3>Level {store.class[0][1]} {store.class[0][0]}</h3>
                    <div className="progress-tooltip">
                        <h3 className="tooltip-legend">your {store.class[0][0]}</h3>
                        <div className="tooltip-content">
                            <p>
                            Primary ability:  { Array.isArray(store.classDetails.primaryAbility) ? store.classDetails.primaryAbility.join(" / ") : store.classDetails.primaryAbility}<br/>
                            Armor Types:  {store.armor.proficiencies.join(", ")}<br/>
                            Weapon Types:  {store.weaponProficiencies.join(", ")}<br/>
                            Features: {store.features.join(", ")}
                            </p>
                        </div>
                    </div>
                </div>
            )
            

        }
        if (!progress.includes('baseStats') && progress.includes('race')) {
            setRaceBlock(
                <div className="progress-block">
                    <h3>block display</h3>
                    <div className="progress-tooltip">
                        <h3 className="tooltip-legend">Legend</h3>
                        <div className="tooltip-content">
                            <p>
                                here is the content.<br/>
                                more details about your character, <br/>
                                and important stats for reference.<br/>
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
        if (!progress.includes('alignment') && progress.includes('baseStats')) {
            setASBlock(
                <div className="progress-block">
                    <h3>block display</h3>
                    <div className="progress-tooltip">
                        <h3 className="tooltip-legend">Legend</h3>
                        <div className="tooltip-content">
                            <p>
                                here is the content.<br/>
                                more details about your character, <br/>
                                and important stats for reference.<br/>
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
        if (progress.includes('alignment')) {
            setBackgroundBlock(
                <div className="progress-block">
                    <h3>block display</h3>
                    <div className="progress-tooltip">
                        <h3 className="tooltip-legend">Legend</h3>
                        <div className="tooltip-content">
                            <p>
                                here is the content.<br/>
                                more details about your character, <br/>
                                and important stats for reference.<br/>
                            </p>
                        </div>
                    </div>
                </div>)
        }

        setTimeout(()=>bindToolTip(), 100)
        return
    },[progress])

    function showTooltip(e) {
        select(e.srcElement).select(".progress-tooltip")
            .style("display", "block")
            .style("left", `${e.clientX - 50}px`)
    }

    function hideTooltip(e) {
        selectAll(".progress-tooltip")
            .style("display", "none")
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
            {raceBlock}
            {ASBlock}
            {backgroundBlock}
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

/**
                <div className="progress-block">
                    <h3>block display</h3>
                    <div className="progress-tooltip">
                        <Fieldset legend="legend">
                            <p className="m-0">
                                tooltip content
                            </p>
                        </Fieldset>
                    </div>
                </div>
 */