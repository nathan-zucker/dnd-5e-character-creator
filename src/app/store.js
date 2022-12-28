
import { configureStore } from '@reduxjs/toolkit';

const progressReducer = (state = [], action) => {
    switch(action.type){
        case 'submitBaseStats': return [...state, 'baseStats'];
        case 'submitRace': return [...state, 'race'];
        case 'submitClassLevel': return [...state, 'classLevel'];
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

const baseStatReducer = (state = [], action) => {
    switch(action.type){
        case 'selectStat': 
            return  [...state, action.payload];
        default: return state;
    }
}

const raceReducer = (state = [], action) => {
    switch(action.type){
        case 'race': return [action.payload];
        case 'subRace': return [...state, action.payload];
        default: return state;
    }
}

const classLevelReducer = (state = [[undefined]], action) => {
    switch(action.type) {
        case 'classLevel': return [action.payload]; 
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
            languages: action.languages,
            darkVision: action.darkVision,
            baseFeatures: action.baseFeatures,
            features: action.features || state.features
        });
        case 'AbilityHumanBonus': return Object.assign({}, state, {
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

const savingThrowInitialState = {
    str: [0],
    dex: [0],  
    con: [0],
    int: [0],
    wis: [0],
    cha: [0]
}

const savingThrowReducer = (state = savingThrowInitialState, action) => {
    switch(action.type) {
        case 'proficient': return ()=>state.action.stat = [...state.action.stat, 'proficient'];
        case 'stat': return ()=>state.action.stat = [action.payload];
        default: return state;
    }
}

const weaponReducer = (state = [], action) => {
    switch(action.type){
        case 'weaponProficiency': return [...state, action.payload]
        default: return state;
    }
}

const store = configureStore({
    reducer: {
        randomNumber: randomNumberReducer,
        progress: progressReducer,
        baseStats: baseStatReducer,
        race: raceReducer,
        raceDetails: RacialBonusReducer,
        class: classLevelReducer,
        savingThrows: savingThrowReducer,
        weapons: weaponReducer,
    }
});

export default store