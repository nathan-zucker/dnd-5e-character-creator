import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { select, selectAll } from "d3";


function ProgressBar() {
    const AS = useSelector((state)=>state.baseStats.stats)
    AS.sort((a, b)=>b-a)
    //console.error(AS)


    const progress = useSelector((state)=>state.progress)
    const [ blocks, setBlocks ] = useState(<div>no progress yet</div>)
    const [ blocksList, setBlocksList ] = useState([])
    const blocksData = useSelector((state)=>{
        return ([
            [ state.class[0][0], `Level ${state.class[0][1]} ${state.class[1]} `, [ "tooltip", "details..." ] ],
            [ state.race[0], state.race[1], [ "tooltip", "details..." ] ],
            [ "simplified AS display", "", [ "tooltip", `Str: ${state.baseStats.stats[0]}, Dex: ${state.baseStats.stats[1]}, Con: ${state.baseStats.stats[2]}, Int: ${state.baseStats.stats[3]}, Wis: ${state.baseStats.stats[4]}, Cha: ${state.baseStats.stats[5]} ` ] ],
            [ state.background.background, state.alignment, [ "tooltip", "details..." ] ]
        ])
    })

    const breakpoints = ['classLevel', 'race', 'baseStats', 'alignment']

    useEffect(()=>{

        
        if (breakpoints.includes(progress[progress.length - 1]) && !blocksList.includes(progress[progress.length - 1])) {
            setBlocksList([...blocksList, progress[progress.length - 1]])
        }
    },[progress])


    function getBlocks() {
        const newBlocks = blocksList.map((e,i)=>{
            let data = blocksData[i];
            return (
                
                <div className="progress-block" key={i} >
                    <h3>{data[1]} {data[0]}</h3>
                    <div className="progress-tooltip" >
                        <h4>{data[2][0]}</h4>
                        <p>{data[2][1]}</p>
                    </div>
                </div>
                
            )
        })

        setBlocks(newBlocks)
    }

    useEffect(()=>{
        getBlocks()
    },[blocksList, progress])

    function showTooltip(e) {
        select(e.srcElement).select(".progress-tooltip")
            .attr("visible", true)
            .transition()
            .style("opacity", 1)
    }

    function hideTooltip(e) {
        selectAll(".progress-tooltip")
            .attr("visible", false)
            .transition()
            .style("opacity", 0)
    }
    function toggleTooltip(e) {
        //console.log(e)
    }

    useEffect(()=>{
        selectAll(".progress-block")
        .on("mouseover", e => showTooltip(e) )
        .on("mouseout", e => hideTooltip(e) )
        .on("click", e => toggleTooltip(e) )
    },[blocks])

    //console.log(blocks, blocksData)

    return (
        <div id="progress-bar">     
            {blocks}
        </div>
    )

}

export default ProgressBar;