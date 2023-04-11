
import { configureStore } from '@reduxjs/toolkit';

const progressReducer = (state = [], action) => {
    switch(action.type){
        case 'setRolls': if (!state.includes('rolls')) { return [...state, 'rolls'] } else { break };
        case 'submitBaseStats': return [...state, 'baseStats'];
        case 'submitRace': return [...state, 'race'];
        case 'submitClassLevel': return [...state, 'classLevel'];
        case 'submitSubClass': return [...state, 'subClass'];
        case 'submitBackground': return [...state, 'background'];
        case 'updateProgress': return [...state, action.payload];
        default: return state;
    }
}

const randomNumberReducer = (state = 0, action) => {
    switch(action.type){
        case 'randomNumber':
            return action.randomNumber;
        case 'increase':
            return state + action.payload;
        case 'decrease':
            return state - action.payload;
        default: return state;
    }
}

const baseStatReducer = (state = {count: 0, picks: 0, stats: [0,0,0,0,0,0], modifiers: [ [0,0,0,0,0,0], ['','','','','',''] ]}, action) => {
    switch(action.type){
        case 'setRolls': return Object.assign({}, state, {
            rolls: action.payload,
        })
        case 'selectStat':
            let newStats = [...state.stats];
            newStats[action.payload.index] = action.payload.value
            return  Object.assign({}, state, {
                stats: newStats,
                count: state.count + 1
            });
        case 'addAbilityScorePick': return Object.assign({}, state, {
            picks: state.picks + action.payload
        });
        case 'ASmodifiers': return Object.assign({}, state, {
            modifiers: action.payload
        });
        case 'ASIpick': return Object.assign({}, state, {
            picks: action.payload
        })
        case "setStats": return Object.assign({}, state, {
            stats: action.payload
        })
        default: return state;
    }
}

const hitPointReducer = ((state = {'Hit Die': 0, 'HP': 0, "bonus": 0}, action) => {
    switch(action.type){
        case "hitDie": return Object.assign({}, state, {'Hit Die': action.payload})
        case "hitPoints": return Object.assign({}, state, {'HP': state["HP"] + action.payload});
        case "HPbonus": return Object.assign({}, state, {'bonus': state["bonus"] + action.payload})
        default: return state;
    }
})

const raceReducer = (state = [], action) => {
    switch(action.type){
        case 'race': return [action.payload];
        case 'subRace': return [...state, action.payload];
        default: return state;
    }
}

const classLevelReducer = (state = [["none", 0], ""], action) => {
    let newState = [...state];
    switch(action.type) {
        case 'classLevel':
            newState[0] = action.payload;
            return newState; 
        case 'subClass':
            newState[1] = action.payload;
        return newState;
        default: return state;
    }
}

const classDetailsReducer = (state = {}, action) => {
    switch(action.type){
        case 'classDetails': return Object.assign({}, state, action.payload)
        case 'classDetailsOptions': return Object.assign({}, state, {
            extraOptions: [state.extraOptions, action.payload]
        })
        default: return state;
    }
}

const backgroundReducer = (state = {}, action) => {
    switch(action.type){
        case 'updateBackground': return Object.assign({}, state, {
            background: action.payload
        });
        case 'backgroundVariantOptions': return Object.assign({}, state, {
            variants: action.payload
        })
        default: return state;
    }
}

const featureReducer = (state = [], action) => {
    switch(action.type) {
        case 'clearFeatures': return [];
        case 'addFeature': 
            if (typeof action.payload === "object") {
                let newFeature = action.payload;
                state.forEach((e, i) => {
                    if (typeof e === 'object') {
                        if (action.payload.name === e.name) {
                            newFeature = Object.assign({}, 
                                e,
                                action.payload,
                                {index: i}
                            )
                        }
                    }
                })
                if (newFeature.hasOwnProperty("index")) {
                    return state.toSpliced(newFeature.index, 1, newFeature)
                }
                else {
                    return state.push(newFeature)
                }
            }
            else {
                return state.push(action.payload);
            }
        case 'addFeatureArray': 
            let currentState = state.concat(action.payload);
            let newState = [];
            for (let i = currentState.length - 1; i >=0; i--) {
                if (typeof currentState[i] === 'object') {
                    let newFeature = currentState[i];
                    newState.forEach(e => {
                        if (typeof e === 'object' && e.name === currentState[i].name) {
                            newFeature = 'none';
                        }
                    })
                    if (newFeature !== 'none') {
                        newState.push(newFeature);
                    }
                }
                else {
                    newState.push(currentState[i])
                }
            }
            return newState;
        default: return state;
    }
}

const RacialBonusReducer = ((state={finalized: false}, action)=>{
    switch(action.type){
        case 'ResetRace': return Object.assign({}, state, action.payload);
        case 'RacialBonuses': return Object.assign({}, state, {
            race: action.race,
            subRace: action.subRace,
            abilityScoreIncrease: action.abilityScoreIncrease || state.abilityScoreIncrease,
            size: action.size,
            speed: action.speed,
            darkVision: action.darkVision,
            baseFeatures: action.baseFeatures,
            features: action.features || state.features
        });
        case 'abilityScoreIncrease': return Object.assign({}, state, {
            abilityScoreIncrease: action.payload,
            finalized: true
        });
        case 'SkillHumanBonus': return Object.assign({}, state, {
            features: ['EXTRA SKILL'],
            finalized: true,
        });
        case 'FeatHumanBonus': return Object.assign({}, state, {
            features: ['FEAT'],
            finalized: true
        })
        default: return state;
    }
})


const savingThrowReducer = (state = {proficient: [], advantage: []}, action) => {
    switch(action.type) {
        case 'saveProficiency': return Object.assign({}, state, {
            proficient: [...state.proficient, ...action.payload]
        });
        case 'saveAdvantage': return Object.assign({}, state, {
            advantage: [...state.advantage, action.payload]
        });
        default: return state;
    }
}


const skillReducer = (state = {picks: 0, proficiencies: []}, action) => {
    switch(action.type){
        case 'addSkillProficiency': return Object.assign({}, state, {
            proficiencies: [...state.proficiencies, action.payload]
        });
        case 'addSkillProficiencyArray': return Object.assign({}, state, {
            proficiencies: [...state.proficiencies, ...action.payload]
        });
        case 'updateSkillProficiencies': return Object.assign({}, state, {
            proficiencies: action.payload
        })
        case 'addSkillPick': return Object.assign({}, state, {
            picks: state.picks + action.payload
        })
        default: return state;
    }
}

const weaponProficiencyReducer = (state = [], action) => {
    switch(action.type){
        case 'weaponProficiency': return state.concat(action.payload)
        default: return state;
    }
}

const armorReducer = (state = {proficiencies: [], armor: []}, action) => {
    switch(action.type){
        case 'armorProficiency': return Object.assign({}, state, {
            proficiencies: [...state.proficiencies, ...action.payload]
        })
        case 'updateArmor': return Object.assign({}, state, {
            armor: action.payload
        })
        default: return state;
    }
}

const toolReducer = (state = [], action) => {
    switch(action.type){
        case 'toolProficiency': return [...state, action.payload];
        case 'toolProficiencyArray': return [...state, ...action.payload];
        default: return state;
    }
}

const languageReducer = (state = {picks: 0, languages: []}, action) => {
    switch(action.type){
        case 'addLanguagePick': return Object.assign({}, state, {
            picks: state.picks + action.payload 
        });
        case 'addLanguages': return Object.assign({}, state, {
            languages: [...state.languages, ...action.payload]
        });
        case 'updateLanguages': return Object.assign({}, state, {
            languages: action.payload,
            picks: 0
        });
        default: return state;
    }
}

const spellReducer = (state = {}, action) => {
    switch(action.type){
        case 'updateSpells': return action.payload;
        default: return state;
    }
}

const equipmentReducer = (state = [], action) => {
    switch(action.type){
        case 'addEquipment': return [...state, action.payload];
        case 'addEquipmentArray': return [...state, ...action.payload];
        case 'updateEquipment': return action.payload;
        default: return state;
    }
}

const weaponReducer = (state = [], action) => {
    switch(action.type){
        case 'addWeapon': return [...state, action.payload]
        case 'updateWeapons': return action.payload;
        default: return state;
    }
}

const alignmentReducer = (state = '', action) => {
    switch(action.type){
        case 'setAlignment': return action.payload;
        default: return state;
    }
}

const resistanceReducer = (state = [], action) => {
    switch(action.type){
        case "addResistance": 
        if (!state.includes(action.payload)) {
            return [...state, action.payload]
        } else {return state}
        default: return state;
    }
}

const store = configureStore({
    reducer: {
        randomNumber: randomNumberReducer,
        progress: progressReducer,
        features: featureReducer,
        baseStats: baseStatReducer,
        hitPoints: hitPointReducer,
        race: raceReducer,
        raceDetails: RacialBonusReducer,
        languages: languageReducer,
        class: classLevelReducer,
        classDetails: classDetailsReducer,
        savingThrows: savingThrowReducer,
        skillProficiencies: skillReducer,
        weaponProficiencies: weaponProficiencyReducer,
        spellCasting: spellReducer,
        armor: armorReducer,
        tools: toolReducer,
        equipment: equipmentReducer,
        background: backgroundReducer,
        alignment: alignmentReducer,
        weapons: weaponReducer,
        resistances: resistanceReducer,
    }
});

export default store