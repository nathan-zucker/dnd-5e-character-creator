
import './App.css';
import Header from './Header.js';
import { useSelector } from 'react-redux';
import { RandomNumber } from './features/RandomNumber';
import  BaseStats  from './Components/BaseStats'
import  Race  from './Components/Race';

function App() {
  const state = useSelector((state)=>state);
  //console.log(state, 'i am the state')
  return (
      <div className="App">
        <Header />
        <div className="main">
        <h1>{state.randomNumber}</h1>
        <RandomNumber />
        <BaseStats />
        <Race />
        </div>
      </div>
  );
}


export default App;
