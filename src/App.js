
import './App.css';
import Header from './Header.jsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { select } from 'd3';


import  BaseStats  from './Components/BaseStats'
import  Race  from './Components/Race';
import { DisplayBaseStats } from './Components/DisplayBaseStats';
import DisplayRace from './Components/DisplayRace';
import Class from './Components/Class';
import { DisplayClass } from './Components/DisplayClass';
import RacialTraitsIndex from './Components/RacialTraitsIndex';
import Background from './Background';
import Skills from './Skills';
import Equipment from './Equipment';
import CalculateFinalScores from './Components/CalculateFinalScores';


function App() {

  const stateProgress = useSelector((state)=>state.progress)
  const [progress, setProgress] = useState('')

  const state = useSelector((state)=>state);

  console.log(state, 'i am the state')

  const breakpoints = ['classLevel', 'race', 'rolls', 'baseStats', 'alignment', 'skills', 'equipment']
  const delay1 = 100
  const delay2 = 300

  useEffect(()=>{
    if ( breakpoints.includes(stateProgress[stateProgress.length - 1]) ) {  
      setTimeout(()=>{  
        select("#content")
        .transition()
        .style("opacity", 0)
      
        setTimeout(()=>{
          setProgress([...progress, stateProgress[stateProgress.length - 1]])
          select("#content")
            .transition()
            .style("opacity", 1)
        }, delay2)
      }, delay1 )
    }
  },[stateProgress])

  return (
      <div className="App">
        <div className="canvas">
          <Header />
        </div>
        <div className='main'>
          <div id="content">
            
            { !progress.includes('classLevel') ? <Class /> : null }
            { !progress.includes('classLevel') ? <DisplayClass /> : null }
            
            { progress.includes('classLevel') && !progress.includes('race') ? <Race /> : null }
            { progress.includes('classLevel') ? <DisplayRace /> : null }
            
            { progress.includes('race') ? <BaseStats /> : null }

            { progress.includes('rolls') ? <DisplayBaseStats /> : null }
            
            { progress.includes('baseStats') ? <RacialTraitsIndex /> : null }
            { progress.includes('baseStats') ? <Background /> : null }

            { progress.includes('alignment') ? <Skills /> : null }

            { progress.includes('skills') ? <Equipment /> : null }

            { progress.includes('equipment') ? <CalculateFinalScores /> : null }

          </div>
        </div>
      </div>
  );
}


export default App;
