import React from "react";
import { useSelector } from "react-redux";
import * as d3 from 'd3';
import './FinalAbilityScores.css';

export default function FinalAbilityScores() {

    const stats = useSelector((state)=>state.baseStats.stats)
    const mods = useSelector((state)=>state.baseStats.modifiers[1])
    const titles = ["STR", "DEX", "CON", "INT", "WIS", "CHA"]
    let arr = []
    for (let i=0; i<stats.length; i++) {
        arr.push(Object.assign({}, {
            id: titles[i],
            value: stats[i],
            mod: mods[i]
        }))
    }

    const w = 250
    const h = 200
    const padding = 40

    const scale = d3.scaleLinear()
    scale.domain([3,20])
    .range([30,120])

    d3.select("#as-svg").selectAll("svg").remove()

    const svg = d3.select("#as-svg")
    .append("svg")
    .attr("Width", w)
    .attr("height", h)

    svg.selectAll("rect")
    .data(arr)
    .enter()
    .append("rect")
    .attr("class", "as-bar")
    .attr("width", 30)
    .attr("height", (d)=>scale(d.value))
    .attr("x", (d, i)=> i * 50)
    .attr("y", (d, i) => h - scale(d.value) - padding)

    svg.selectAll("text.text1")
    .data(arr)
    .enter()
    .append("text")
    .attr("class", "text1")
    .attr("x", (d, i)=> i * 50 + 5)
    .attr("y", (d, i)=> h - scale(d.value) - 5 - padding )
    .text((d)=>d.value)

    svg.selectAll("text.text2")
    .data(arr)
    .enter()
    .append("text")
    .attr("class", "text2")
    .attr("x", (d, i)=> i * 50)
    .attr("y", h - padding + 15)
    .text((d)=>d.id)

    svg.selectAll("text.text3")
    .data(arr)
    .enter()
    .append("text")
    .attr("class", "text3")
    .attr("x", (d, i)=> i * 50)
    .attr("y", h - padding + 30)
    .text((d)=>d.mod)
    .style("font-weight", 600)


    return(
        <div id="as-svg"></div>
    )
}