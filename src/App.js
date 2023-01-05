
import './App.css';
import Header from './Header.js';
import { useSelector } from 'react-redux';
import  BaseStats  from './Components/BaseStats'
import  Race  from './Components/Race';
import { DisplayBaseStats } from './Components/DisplayBaseStats';
import DisplayRace from './Components/DisplayRace';
import Class from './Components/Class';
import { DisplayClass } from './Components/DisplayClass';
import RacialTraitsIndex from './Components/RacialTraitsIndex';


function App() {
  const state = useSelector((state)=>state);
  console.log(state, 'i am the state')
  return (
      <div className="App">
        <Header />
        <div className="main">
          {!state.progress.includes('classLevel') ? <Class /> : null}
          <DisplayClass />
          {!state.progress.includes('race') && state.progress.includes('classLevel') ? <Race /> : null}
          <DisplayRace />
          {!state.progress.includes('baseStats') && state.progress.includes('race') ? <BaseStats /> : null}
          {state.progress.includes('race') ? <RacialTraitsIndex /> : null}
          {state.progress.includes('race') ? <DisplayBaseStats /> : null}
          
          <h2>{}</h2>
  {/*
          <h2>background</h2>
          <h2>saving throws</h2>
          <h2>skills</h2>
          <h2>equipment</h2>
  */}
        </div>
      </div>
  );
}


export default App;
