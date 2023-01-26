
import { configureStore } from '@reduxjs/toolkit';

const progressReducer = (state = [], action) => {
    switch(action.type){
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

const baseStatReducer = (state = {picks: 0, stats: []}, action) => {
    switch(action.type){
        case 'selectStat': return  Object.assign({}, state, {
                stats: [...state.stats, action.payload]
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

const classLevelReducer = (state = [[undefined]], action) => {
    switch(action.type) {
        case 'classLevel': return [action.payload]; 
        case 'subClass': return state.push(action.payload)
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
        case 'addFeature': return state.push(action.payload);
        case 'addFeatureArray': return state.concat(action.payload)
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

const armorReducer = (state = [], action) => {
    switch(action.type){
        case 'armorProficiency': return state.concat(action.payload);
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
    }
});

export default store