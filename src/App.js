
import './App.css';
import Header from './Header.jsx';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { Button } from 'primereact/button';

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

  const dispatch = useDispatch()
  const stateProgress = useSelector((state)=>state.progress)
  const [progress, setProgress] = useState('')

  const state = useSelector((state)=>state);

  console.log(state, 'i am the state')

  const breakpoints = ['classLevel', 'race', 'rolls', 'baseStats', 'alignment', 'skills', 'equipment']
  const delay1 = 100
  const delay2 = 500

  const mockCharacter = () => {
    dispatch({type: 'test-progress', payload: [
      "classLevel",
      "race",
      "rolls",
      "baseStats",
      "background",
      "alignment",
      "skills",
      "equipment"
    ]})
    dispatch({ type: 'test-baseStats', payload: {
      "count": 6,
      "picks": 0,
      "stats": [
          15,
          16,
          14,
          9,
          13,
          11
      ],
      "modifiers": [
          [
              2,
              3,
              2,
              -1,
              1,
              0
          ],
          [
              "+2",
              "+3",
              "+2",
              "-1",
              "+1",
              "+0"
          ]
      ],
      "rolls": [
          15,
          14,
          13,
          12,
          10,
          8
      ]
    }})
    dispatch({type: 'test-hitPoints', payload: {
      "Hit Die": 12,
      "HP": 0,
      "bonus": 0
    }})
    dispatch({type: 'test-race', payload: [
      "Human",
      ""
    ]})
    dispatch({type: 'test-classLevel', payload: [
      [
          "Barbarian",
          3
      ],
      ""
    ]})
    dispatch({type: 'test-class-details', payload: {
      "primaryAbility": "Strength",
      "skills": [
          2,
          [
              "Animal Handling (Wis)",
              "Athletics (Str)",
              "Intimidation (Cha)",
              "Nature (Int)",
              "Perception (Wis)",
              "Survival (Wis)"
          ]
      ],
      "proficiencyBonus": 2,
      "subClasses": {
          "Berserker": {
              "3": {
                  "features": [
                      {
                          "id": "frenzy",
                          "name": "Frenzy",
                          "details": "While Raging, you can go into a Frenzy. Make a single melee weapon attack as a bonus action on each of your turns after this one. W hen your rage ends, you suffer one level of exhaustion"
                      }
                  ]
              },
              "6": {
                  "features": [
                      "Mindless Rage"
                  ]
              },
              "10": {
                  "features": [
                      "Intimidating Presence"
                  ]
              },
              "14": {
                  "features": [
                      "Retaliation"
                  ]
              }
          },
          "TotemWarrior": {
              "3": {
                  "features": [
                      {
                          "id": "spirit-seeker",
                          "name": "Spirit Seeker",
                          "details": "you gain the ability to cast the beast sense and speak with animals spells, but only as rituals"
                      },
                      "Totem Spirit"
                  ],
                  "spellcasting": {
                      "rituals": [
                          "beast sense",
                          "speak with animals"
                      ]
                  }
              },
              "6": {
                  "features": [
                      "Aspect of the Beast"
                  ]
              },
              "10": {
                  "features": [
                      "Spirit Walker"
                  ]
              },
              "14": {
                  "features": [
                      "Totemic Attunement"
                  ]
              }
          }
      },
      "subClasses2": {
          "Bear": {
              "3": {
                  "features": [
                      {
                          "id": "bear-totem",
                          "name": "Bear Totem",
                          "details": "While raging, you have resistance to all damage except psychic damage."
                      }
                  ]
              }
          },
          "Eagle": {
              "3": {
                  "features": [
                      {
                          "id": "eagle-totem",
                          "name": "Eagle Totem",
                          "details": "While you're raging and aren’t wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can use the Dash action as a bonus action on your turn"
                      }
                  ]
              }
          },
          "Wolf": {
              "3": {
                  "features": [
                      {
                          "id": "wolf-totem",
                          "name": "Wolf Totem",
                          "details": "While you're raging, your friends have advantage on melee attack rolls against any creature within 5 feet of you that is hostile to you. "
                      }
                  ]
              }
          }
      }
    }})
    dispatch({type: 'test-background', payload: {
      "background": "Folk Hero"
    }})
    dispatch({type: 'test-features', payload: [
      "Rustic Hospitality",
      "Defining Event",
      "Primal Path",
      {
          "id": "danger-sense",
          "name": "Danger Sense",
          "details": "You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can’t be blinded, deafened, or incapacitated."
      },
      {
          "id": "reckless-attack",
          "name": "Reckless Attack",
          "details": "Advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn"
      },
      "Unarmored Defense",
      {
          "id": "rage",
          "name": "Rage",
          "rages": 3,
          "rage damage": 2,
          "details": "On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits if you aren’t wearing heavy armor:\n        You have advantage on Strength checks and Strength saving throws.\n        When you make a melee weapon attack using Strength, you gain a bonus to the damage roll.\n        You have resistance to bludgeoning, piercing, and slashing damage. If you are able to cast spells, you can’t cast them or concentrate on them while raging.\n        Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven’t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action."
      }
    ]})
    dispatch({type: 'test-race-details', payload: {
      "finalized": false,
      "race": "Human",
      "subRace": "",
      "abilityScoreIncrease": [
          1,
          1,
          1,
          1,
          1,
          1
      ],
      "size": "Medium",
      "speed": 30,
      "darkVision": false,
      "features": []
    }})
    dispatch({type: 'test-savingThrow', payload: {
      "proficient": [
          "Strength",
          "Constitution"
      ],
      "advantage": []
    }})
    dispatch({type: 'test-skills', payload: {
      "picks": 0,
      "proficiencies": [
          "Animal Handling (Wis)",
          "Survival (Wis)",
          "Athletics (Str)",
          "Perception (Wis)"
      ],
      "bonus": [
          0,
          []
      ]
    }})
    dispatch({type: 'test-weaponPro', payload: {
      "picks": 0,
      "proficiencies": [
          "Animal Handling (Wis)",
          "Survival (Wis)",
          "Athletics (Str)",
          "Perception (Wis)"
      ],
      "bonus": [
          0,
          []
      ]
    }})
    dispatch({type: 'test-armor', payload: {
      "proficiencies": [
          "light",
          "medium",
          "shields"
      ],
      "armor": []
    }})
    dispatch({type: 'test-tools', payload: [
      "one type of artisan's tools",
      "vehicles(land)"
    ]})
    dispatch({type: 'test-languages', payload: {
      "picks": 0,
      "languages": [
          "Common",
          "Elvish"
      ]
    }})
    dispatch({type: 'test-equipment', payload: [
      "explorer's pack",
      "4 javelins",
      "2d4 x 10 gp",
      "any one artisan's tools",
      "shovel",
      "iron pot",
      "set of common clothes",
      "belt pouch containing 10gp",
      "greataxe",
      "two handaxes"
    ]})
    dispatch({type: 'test-weapons', payload: [
      {
          "name": "javelin",
          "cost": 5,
          "damage": "1d6",
          "type": "piercing",
          "weight": 2,
          "properties": [
              "thrown (range 30/120)"
          ]
      },
      {
          "name": "greataxe",
          "cost": 30,
          "damage": "1d12",
          "type": "slashing",
          "weight": 7,
          "properties": [
              "heavy",
              "two-handed"
          ]
      },
      {
          "name": "handaxe",
          "cost": 5,
          "damage": "1d8",
          "type": "slashing",
          "weight": 2,
          "properties": [
              "light",
              "thrown (range 20/60)"
          ]
      }
    ]})
    dispatch({type: 'test-alignment', payload: "Chaotic Neutral"})
  }

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
            <Button label='load mock character' onClick={()=>{
              console.log('loading character...')
              mockCharacter()
              return
            }}/>
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
