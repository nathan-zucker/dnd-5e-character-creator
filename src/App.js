
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
          <Race />
          <DisplayRace />
          <BaseStats />
          {state.progress.includes('race') ? <DisplayBaseStats /> : null}
          <RacialTraitsIndex />
          <Background />
          <Skills />
          <Equipment />

          <h2>{}</h2>
   {/*

          EQUIPMENT

    ARMOR CLASS

    WEAPONS / ATTACKS

    SPELL CASTING

  */}
        </div>
      </div>
  );
}


export default App;
