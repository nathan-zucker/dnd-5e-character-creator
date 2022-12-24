
import './App.css';
import Header from './Header.js';
import { useSelector } from 'react-redux';
import  BaseStats  from './Components/BaseStats'
import  Race  from './Components/Race';
import { DisplayBaseStats } from './Components/DisplayBaseStats';
import DisplayRace from './Components/DisplayRace';
import Class from './Components/Class';
import { DisplayClass } from './Components/DisplayClass';

function App() {
  const state = useSelector((state)=>state);
  console.log(state, 'i am the state')
  return (
      <div className="App">
        <Header />
        <div className="main">
        {!state.progress.includes('baseStats') ? <BaseStats /> : null}
        <DisplayBaseStats />
        {state.progress.includes('baseStats') && !state.progress.includes('race') ? <Race /> : null}
        <DisplayRace />
        {state.progress.includes('race') && !state.progress.includes('classLevel')? <Class /> : null}
        <DisplayClass />
        {state.progress.includes('classLevel') ? <h1>Hello!</h1> : null}
        </div>
      </div>
  );
}


export default App;
