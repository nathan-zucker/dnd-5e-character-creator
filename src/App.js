
import './App.css';
import Header from './Header.jsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { select } from 'd3';
import "primereact/resources/themes/md-dark-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


import AbilityScores from './Components/BaseStats';
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
import ProgressBar from './ProgressBar';

import * as backgrounds from "./Components/images/background/backgrounds";

const horizontalBackgrounds = [
  backgrounds.bgh0,
  backgrounds.bgh1,
  backgrounds.bgh2,
  backgrounds.bgh3,
  backgrounds.bgh4,
  backgrounds.bgh5,
  backgrounds.bgh6,
  backgrounds.bgh7,
  backgrounds.bgh8,
  backgrounds.bgh9,
  backgrounds.bgh10,
  backgrounds.bgh11,
  backgrounds.bgh12,
  backgrounds.bgh13,
  backgrounds.bgh14,
  backgrounds.bgh15,
  backgrounds.bgh16
]
const verticalBackgrounds = [
  backgrounds.bgv0,
  backgrounds.bgv1,
  backgrounds.bgv2,
  backgrounds.bgv3
]


function App() {

  const stateProgress = useSelector((state)=>state.progress)
  const [progress, setProgress] = useState('')

  const state = useSelector((state)=>state);

  console.log(state, 'i am the state')

  const breakpoints = ['classLevel', 'race', 'rolls', 'baseStats', 'alignment', 'skills', 'equipment']
  const delay1 = 100
  const delay2 = 500

  useEffect(()=>{

    let newBackground;
    
    if (window.innerWidth > window.innerHeight) {
      newBackground = horizontalBackgrounds[Math.floor(Math.random()*horizontalBackgrounds.length)]; 
    } else {
      newBackground = verticalBackgrounds[Math.floor(Math.random()*verticalBackgrounds.length)];
    }

    select(".App")
    .style("background-image", `url(${newBackground})`)
    
  },[])

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
        <div className='progress-bar'>
          <ProgressBar />
        </div>
        <div className='main'>
          <div id="content">
            
            { !progress.includes('classLevel') ? <Class /> : null }
            {/* !progress.includes('classLevel') ? <DisplayClass /> : null */}
            
            { progress.includes('classLevel') && !progress.includes('race') ? <Race /> : null }
            {/* progress.includes('classLevel') ? <DisplayRace /> : null */}
            
            { progress.includes('race') ? <AbilityScores /> : null }

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
