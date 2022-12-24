
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
        case 'selectStat': return [...state, action.payload];
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

const store = configureStore({
    reducer: {
        randomNumber: randomNumberReducer,
        progress: progressReducer,
        baseStats: baseStatReducer,
        race: raceReducer,
        class: classLevelReducer,
        savingThrows: savingThrowReducer,
    }
});

export default store