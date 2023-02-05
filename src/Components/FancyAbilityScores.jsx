import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './FancyAbilityScores.css'
import * as d3 from 'd3'


const colorWheel = [
  "#CC0000", "#FF3300", "#FF6600", "#FF9900", "#FFCC33", "#FFFF66",
  "#CCFFFF", "#CCFF99", "#CCFF00", "#66CC00", "#669900", "#9933CC"
]
const pickColor = d3.scaleQuantize()
  .domain([ 5, 20 ])
  .range( colorWheel )
console.log(pickColor(5))


function FancyAbilityScores() {
    
  const stats = useSelector((state)=>state.baseStats.stats)
  const mods = useSelector((state)=>state.baseStats.modifiers[1])
  


  const statNames = [ "Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma" ]

  const backgroundColor = "#1a1a1a"
  const w = 400;
  const h = 400;
  const padding = 30;
  const f = (2 * Math.PI) / 6
  const s = 9;

  useEffect(()=>{
    d3.select("#display").selectAll("svg").remove()
    getCoordinatePairs(stats)
  },[])

  function getCoordinatePairs(data){
    let numberArr = [...data]
    let points = []
    let lines = []
    for (let i=0; i<numberArr.length; i++) {
      const newX = ((w + padding * 2) / 2) + ( data[i] * Math.cos(i * f) * s);
      const newY = ((h + padding * 2) / 2) + ( data[i] * Math.sin(i * f) * s);
      // GET LINE
      if ( i > 0) {
        const lineObj = Object.assign({}, {
          x1: points[i-1].x,
          y1: points[i-1].y,
          x2: newX,
          y2: newY
        })
        lines.push(lineObj)
      }
      // GET POINT
      const pointObj = Object.assign({}, {
        x: newX,
        y: newY,
        color: pickColor(numberArr[i]),
        statName: statNames[i],
        value: numberArr[i]
      })
      points.push(pointObj)
    }
    // CONNECT CIRCLE
    lines.push(Object.assign({}, {
      x1: points[points.length-1].x,
      y1: points[points.length-1].y,
      x2: points[0].x,
      y2: points[0].y
    }))
    // EXPORT TO CHART
    const finalData = {
      points: points,
      lines: lines,
      stats: stats
    }
    console.log(finalData)
    renderChart(finalData)
  }

  function renderChart(data){

    function mouseoverHandler(e){
      const data = e.srcElement.__data__
      d3.select(e.srcElement)
        .attr("fill", data.color)
        .transition()
        .attr("r", 8)
      d3.select("#tooltip")
        .style("visibility", "visible")
        .html("<h3>"+data.statName+": "+data.value+"</h3>")
    }
    function mousemoveHandler(e){
        console.log(e.clientX, e.clientY, e)
      d3.select("#tooltip")
        .style("top", (e.pageY - 60) + "px")
        .style("left", (e.pageX - 50) + "px")

    }
    function mouseoutHandler(e){
      d3.select(e.srcElement)
        .attr("fill", "whitesmoke")
        .transition()
        .attr("r", 6)
      d3.select("#tooltip")
        .html('')
        .style("visibility", "hidden")
    }

    const chart = d3.select("#display").append("svg")
      .attr("width", w + 2 * padding)
      .attr("height", h + 2* padding)
      .attr("id", "chart")

    chart.append("rect")
      .attr("id", "background")
      .attr("width", w + 2 * padding)
      .attr("height", h + 2* padding)
      .attr("fill", backgroundColor)

    chart.append("circle")
      .attr("id", "origin")
      .attr("cx", (w + padding * 2) / 2)
      .attr("cy", (h + padding * 2) / 2)
      .attr("r", 5)
      .attr("fill", "gray")

    chart.selectAll("line")
      .data(data.lines)
      .enter()
      .append("line")
      .attr("x1", d => d.x1)
      .attr("y1", d => d.y1)
      .attr("x2", d => d.x2)
      .attr("y2", d => d.y2)
      .attr("stroke", "gray")

    //filter: drop-shadow(0 0 7px red);

    chart.selectAll(".data-point")
      .data(data.points)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", d => d.x )
      .attr("cy", d => d.y )
      .attr("r", 6)
      .attr("fill", "white")
      .style("filter", d => "drop-shadow( 0 0 6px "+(d.color)+" )")
      .on("mouseover", mouseoverHandler)
      .on("mousemove", mousemoveHandler)
      .on("mouseout", mouseoutHandler)
    
    chart.selectAll(".label")
      .data(data.points)
      .enter()
      .append("text")
        .attr("class", "label")
        .attr("transform", d => "translate("+(d.x)+","+(d.y - 10)+")")
        .text(( d, i ) => {
          switch(i){
            case 0: return "STR";
            case 1: return "DEX";
            case 2: return "CON";
            case 3: return "INT";
            case 4: return "WIS";
            case 5: return "CHA";
            default: return;
          }
        } )
        .attr("fill", d => d.color)
        .style("text-shadow", "0 1px 2px black")
  }


  return (
    <div className="App">
      <div id="tooltip"></div>
      <div id="display"></div>  
    </div>
  )
}

export default FancyAbilityScores
