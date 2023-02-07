
import './App.css';
import Header from './Header.jsx';
import { useSelector } from 'react-redux';
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
import PrimeReact from 'primereact/api';
//import { Ripple } from 'primereact/ripple';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";  
PrimeReact.ripple = true;
//PrimeReact.appendTo = 'self';


function App() {
  const state = useSelector((state)=>state);
  console.log(state, 'i am the state')
  return (
      <div className="App">
        <div className="canvas">
          <Header />
        </div>
        
        <div className="main">
          <Class />
          <DisplayClass />
          {state.progress.includes('classLevel') ? <div>
          <Race />
          <DisplayRace />
          </div> : null}
          {state.progress.includes('race') ? <div>
            <BaseStats />
            <DisplayBaseStats />
          </div> : null}
          {state.progress.includes('baseStats') ? <div>
          <RacialTraitsIndex />
          <Background />
          <Skills />
          <Equipment />
          <CalculateFinalScores />
          </div> : null}

   {/*

    ARMOR CLASS

    SPELL CASTING

  */}
        
        </div>
      </div>
  );
}


export default App;
