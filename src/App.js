
import './App.css';
import Header from './Header.jsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { select } from 'd3';
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


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
import AbilityScores from './Components/AbilityScores';


function App() {

  const progress = useSelector((state)=>state.progress)
  const [progressBar, setProgressBar] = useState('')

  const state = useSelector((state)=>state);

  console.log(state, 'i am the state')

  const breakpoints = ['classLevel', 'race', 'rolls', 'baseStats', 'alignment', 'skills', 'equipment']
  const delay1 = 100
  const delay2 = 300

  /*
  useEffect(()=>{
    if ( breakpoints.includes(progress[progress.length - 1]) ) {  
      setTimeout(()=>{  
        select("#content")
        .transition()
        .style("opacity", 0)
      
        setTimeout(()=>{
          setProgressBar([...progressBar, progress[progress.length - 1]])
          select("#content")
            .transition()
            .style("opacity", 1)
        }, delay2)
      }, delay1 )
    }
  },[progress])
*/
  useEffect(()=>{console.log(progress)},[progress])

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
            { !progress.includes('classLevel') ? <DisplayClass /> : null }
            
            { progress.includes('classLevel') && !progress.includes('race') ? <Race /> : null }
            
            { progress.includes('race') ? <AbilityScores /> : null }
            

            {/* progress.includes('rolls') ? <DisplayBaseStats /> : null */}
            
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
