import { map } from "async";
import React from "react";
import { connect } from "react-redux";
import WeaponCard from "../WeaponCard";
import { weapons, weaponList, allWeapons } from "../reference/equipment-data";

const armorData = {
    "padded": {
        group: "light",
        cost: 5,
        AC: [11, "Dex"],
        stealth: "disadvantage",
        weight: 8
    },
    "leather": {
        group: "light",
        cost: 10,
        AC: [11, "Dex"],
        weight: 10
    },
    "studded leather": {
        group: "light",
        cost: 45,
        AC: [12, "Dex"],
        weight: 13
    },
    "hide": {
        group: "medium",
        cost: 10,
        AC: [12, "Dex", "max 2"],
        weight: 12
    },
    "chain shirt": {
        group: "medium",
        cost: 50,
        AC: [13, "Dex", "max 2"],
        weight: 20
    },
    "scale mail": {
        group: "medium",
        cost: 50,
        AC: [14, "Dex", "max 2"],
        stealth: "disadvantage",
        weight: 45
    },
    "breastplate": {
        group: "medium",
        cost: 400,
        AC: [14, "Dex", "max 2"],
        weight: 20
    },
    "half plate": {
        group: "medium",
        cost: 750,
        AC: [15, "Dex", "max 2"],
        stealth: "disadvantage",
        weight: 40
    },
    "ring mail": {
        group: "heavy",
        cost: 30,
        AC: 14,
        Str: 13,
        stealth: "disadvantage",
        weight: 40
    },
    "chain mail": {
        group: "heavy",
        cost: 74,
        AC: 16,
        Str: 15,
        stealth: "disadvantage",
        weight: 55
    },
    "splint": {
        group: "heavy",
        cost: 200,
        AC: 17,
        Str: 15,
        stealth: "disadvantage",
        weight: 60
    },
    "plate": {
        group: "heavy",
        cost: 1500,
        AC: 18,
        Str: 15,
        stealth: "disadvantage",
        weight: 65
    },
    "shield": {
        group: "shield",
        cost: 10,
        AC: "+2",
        weight: 6
    }
}
const armorTypes = Object.keys(armorData);

const defaultWeapon = {
    name: "club",
    cost: 0.1,
    baseDamage: "1d4",
    type: "bludgeoning",
    weight: 2,
    properties: ["light"]
}

class CalculateFinalScores extends React.Component {
    constructor(props){
        super(props);
        this.state={
            hidden: false,
            equipment: [],
            statMods: [],
            proficiencyBonus: undefined,
            armor: undefined,
            weapon1: undefined,
            weapon2: undefined,
            AC: undefined,
            HP: undefined,
            PP: undefined,
        }
    }

    loadComponent = () => {
        this.setState({
            equipment: this.props.state.equipment,
            statMods: this.props.state.baseStats.modifiers[0],
            proficiencyBonus: this.props.state.classDetails.proficiencyBonus
        })
        this.findWeapons()
    }

    // FIND WEAPONS IN EQUIPMENT
    findWeapons = () => {
        let allEquipment = this.props.state.equipment;
        for (let i=0; i<allEquipment.length; i++) {
            if (weaponList.includes(allEquipment[i])) {
                let obj = allWeapons[allEquipment[i]]
                if ( !this.props.weapons.includes(obj) ) {
                    this.props.dispatchWeapon(obj)
                }
                console.log(obj)
            } else if (allEquipment[i] === "two handaxes") {
                let obj = allWeapons["handaxe"];
                if ( !this.props.weapons.includes(obj) ) {
                    this.props.dispatchWeapon(obj)
                    console.log(obj)
                }
            }
        }
    }

    // GENERATE WEAPON CARDS 
    mapWeaponCard = (obj) => {
        let {name, damage, type, properties} = obj;
        return <WeaponCard name={name} baseDamage={damage} type={type} properties={properties} />
    }
// FIX HERE, BASE DAMAGE DOES NOT COME THROUGH
    weaponCards = () => {
        let arr = [...this.props.weapons];
        return arr.map((e, i)=>
            <div className="weapon-card" key={i}>
                <WeaponCard name={e.name} baseDamage={e.damage} type={e.type} properties={e.properties} />
            </div>
        )
    }
    

    render(){
        
        return(
            <div>
                <h1>calculate scores!</h1>
                <button onClick={this.loadComponent}>GO</button>
                <h2>{this.state.statMods.concat(this.state.proficiencyBonus).join(', ')}</h2>
                <h2>{this.state.equipment.join(', ')}</h2>
                {this.weaponCards()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        weapons: state.weapons
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (type, payload) => { dispatch({type: type, payload: payload}) },
        dispatchWeapon: (weapon) => { dispatch({type: 'addWeapon', payload: weapon}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalculateFinalScores)