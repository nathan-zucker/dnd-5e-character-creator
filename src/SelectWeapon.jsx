import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const weapons = {
    "simple melee": {
        "club": {
            name: "club",
            cost: 0.1,
            damage: "1d4",
            type: "bludgeoning",
            weight: 2,
            properties: ["light"]
        },
        "dagger": {
            name: 'dagger',
            cost: 2,
            damage: "1d4",
            type: "piercing",
            weight: 1,
            properties: ["finess", "light", "thrown (range 20/60)"]
        },
        "greatclub": {
            name: 'greatclub',
            cost: 0.2,
            damage: "1d8",
            type: "bludgeoning",
            weight: 10,
            properties: ["two-handed"]
        },
        "handaxe": {
            name: 'handaxe',
            cost: 5,
            damage: "1d8",
            type: "slashing",
            weight: 2,
            properties: ["light", "thrown (range 20/60)"]
        },
        "javelin": {
            name: 'javelin',
            cost: 5,
            damage: "1d6",
            type: "piercing",
            weight: 2,
            properties: ["thrown (range 30/120)"]
        },
        "light hammer": {
            name: 'light hammer',
            cost: 2,
            damage: "1d4",
            type: "bludgeoning",
            weight: 2,
            properties: ["light", "thrown (range 20/60)"]
        },
        "mace": {
            name: 'mace',
            cost: 5,
            damage: "1d6",
            type: "bludgeoning",
            weight: 4,
            properties: []
        },
        "quarterstaff": {
            name: 'quarterstaff',
            cost: 0.2,
            damage: "1d6",
            type: "bludgeoning",
            weight: 4,
            properties: ["versatile (1d8)"]
        },
        "sickle": {
            name: 'skickle',
            cost: 1,
            damage: "1d4",
            type: "slashing",
            weight: 2,
            properties: ["light"]
        },
        "spear": {
            name: 'spear',
            cost: 1,
            damage: "1d6",
            type: "piercing",
            weight: 3,
            properties: ["thrown (range 20/60), versatile (1d8)"]
        }
    },
    "simple ranged": {
        "ranged weapon 1": {},
        "ranged weapon 2": {}
    },
    "martial melee": ['list of martial melee weapons'],
    "martial ranged": ['list of martial ranged weapons']
}

export default function SelectWeapon(props) {
    const [weaponChoices, setWeaponChoices] = useState({})
    const [hidden, hide] = useState(false)
    const [finalWeapon, finalizeWeapon] = useState('')
    const dispatch = useDispatch()
    const equipment = useSelector((state)=>state.equipment)
    const filters = [...props.filters]
    let options = Object.keys(weapons)
    let keys = Object.keys(weaponChoices)


    function sortOptions() {

        //APPLY FILTERS FROM PROPS TO NARROW DOWN LIST OF OPTIONS
        for (let i=0; i<filters.length; i++) {
            for (let j=0; j<options.length; j++) {
                if (!options[j].match(`${filters[i]}`)) {
                    console.log('did not pass filter', options[j])
                    options.splice( j, 1 )
                    j--;
                }
            }
        }

        // MAKE FINAL LIST OF WEAPONS WITH INFO FROM REFERENCE
        let finalOptions = {};
        for (let i=0; i<options.length; i++) {
            finalOptions = Object.assign({}, finalOptions, weapons[options[i]])
        }
        console.log("final options",finalOptions);
        return setWeaponChoices(finalOptions);
    }

    // SELECT ONE OF THE OPTIONS
    function chooseWeapon(event) {
        console.log(weaponChoices[event.target.value]);
        dispatch({type: 'addWeapon', payload: weaponChoices[event.target.value]})
        dispatch({type: 'addEquipment', payload: event.target.value})
        finalizeWeapon(event.target.value)
        hide(true)
    }

    // GENERATE OPTIONS
    function showOptions() {
        return keys.map((e, i)=>
            <div key={i}>
                <button value={e} onClick={(event)=>chooseWeapon(event)}>{e}</button>
            </div>
        )
    }

    // RENDER
    if (hidden) {
        return (
            <div>
                <h1>you selected: {finalWeapon}</h1>
            </div>
        )
    }
    else {
        return (
            <div>
                <h2>select weapon component</h2>
                <button onClick={()=>sortOptions()}>start</button>
                filters: {filters.join(', ')} <br></br>
                options: {showOptions()}
            </div>
        )
    }

}