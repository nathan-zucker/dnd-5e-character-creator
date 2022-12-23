
import { configureStore } from '@reduxjs/toolkit';

const progressReducer = (state = [], action) => {
    switch(action.type){
        case 'submitBaseStats': return [...state, 'baseStats'];
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

const store = configureStore({
    reducer: {
        randomNumber: randomNumberReducer,
        progress: progressReducer,
        baseStats: baseStatReducer,
    }
});

export default store