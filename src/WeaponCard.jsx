import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './WeaponCard.css'
import {weapons} from './reference/equipment-data'

export default function WeaponCard(props) {

    const PB = useSelector((state)=>state.classDetails.proficiencyBonus)
    const baseStats = useSelector((state)=>state.baseStats)    

    const [ability, setAbility] = useState('')
    const [ASM, setASM] = useState(0)
    const [magic, setMagic] = useState(0)
    const [misc, setMisc] = useState(0)
    const [AB, setAB] = useState(0)
    const [DMG, setDMG] = useState('dmg')

    let { name, baseDamage, type, properties } = props;

    let range;
    let finalProps = [];
    
    useEffect(()=>{
        determineAbility()
        calculateAB()
        calculateDMG()
    },[props])

    //LOCATE RANGE IN PROPERTIES
    let selection = [properties].join(', ').match(/(\(range \d+\/\d+\))/g)
    if(selection !== null){ 
        range = selection.toString().match(/(\d+\/\d+)/g).toString()

    } else {
        range = 5;
    }
    // REMOVE RANGE FROM PROPERTIES
    for(let i=0; i<properties.length; i++){
        if (!properties[i].match(/range/g)) {
            finalProps.push(properties[i])
        }
    }


    function determineAbility(){
        
        const meleeWeapons = Object.keys(weapons["simple melee"]).concat(Object.keys(weapons["martial melee"]))
        const rangedWeapons = Object.keys(weapons["simple ranged"]).concat(Object.keys(weapons["martial ranged"]))
        const scores = baseStats.modifiers[0];
        
        if (meleeWeapons.includes(name)) {
            setAbility("STR")
            setASM(scores[0])
            
        } else if (rangedWeapons.includes(name)) {
            setAbility("DEX")
            setASM(scores[1])
        }
        if (properties.includes("finesse")) {
            setAbility("DEX")
            setASM(scores[1])
        }
    }

    function calculateAB() {
        let AttackBonus = PB + ASM + magic + misc;
        setAB(AttackBonus)
    }

    function calculateDMG() {
        let bonus = ASM + magic + misc;

        let dmg = baseDamage+" + "+bonus.toString()
        setDMG(dmg)
    }

    


    return (
        {
            name: {name},
            type: {type},
            range: {range},
            ability: {ability},
            abilityModifier: {ASM},
            ProBonus: {PB},
            attackBonus: {AB},
            damage: {DMG}
        }
    )
/*
    return (
        <div id="weapon-card-container">
            <table>
                <thead>
                    <tr>
                        <th colSpan="auto" >WEAPON CARD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="big">weapon: {name}</td>
                        <td></td>
                        <td>range:</td>
                        <td>type:</td>
                    </tr>
                    <tr>
                        <td>properties: {finalProps.join(', ')}</td>
                        <td></td>
                        <td className="box">{range}</td>
                        <td className="box">{type}</td>
                    </tr>
                    <tr>
                        <td>proficiency</td>
                        <td>{ability}</td>
                        <td>magic</td>
                        <td>misc</td>
                        <td className="big">Attack Bonus</td>
                    </tr>
                    <tr>
                        <td className="box">+ {PB}</td>
                        <td className="box">+ {ASM}</td>
                        <td className="box">+ {magic}</td>
                        <td className="box">+ {misc}</td>
                        <td className="box emphasis">+ {AB}</td>
                    </tr>
                    <tr>
                        <td>damage dice</td>
                        <td className="arrow">V</td>
                        <td className="arrow">V</td>
                        <td className="arrow">V</td>
                        <td className="big">Damage</td>
                    </tr>
                    <tr>
                        <td className="box">{baseDamage}</td>
                        <td className="box">+ {ASM}</td>
                        <td className="box">+ {magic}</td>
                        <td className="box">+ {misc}</td>
                        <td className="box emphasis">{DMG}</td>
                    </tr>
                    <tr>
                        <td>ammunition</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
    
    */
}
/* 
        NAME                range       type
        properties           {r}         {t}
proficiency     statmod     magic   misc    ATTACK BONUS
    {PB}     +   {M}    +    {m}  +  {n}   =    {AB}
baseDamage        V           V     misc    ATTACK DAMAGE
    {d}          {M}    +    {m}  +  {n}   =    {AD}



input variables:
    FROM STORE:
        proficiency bonus
        weapon proficiencies
        ability score modifiers
    
    FROM PROPS:
        name
        base damage
        type
        [properties]
        range
        magic?

    EQUATIONS:

    helper variables:
    ADbonus = statmod + magic + misc

    AB = PB + M + m + n

    AD = "d" + ( M + m + n ) 
    eg: 2d6 + 5


*/