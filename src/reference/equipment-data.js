const weapons = {
    "Simple Melee": ['list of simple melee weapons'],
    "Simple Ranged": ['list of simple ranged weapons'],
    "Martial Melee": ['list of martial melee weapons'],
    "Martial Ranged": ['list of martial ranged weapons']
}


const armor = {
    "Light": {

    },
    "Medium": {

    },
    "Heavy": {

    },
    "Shield": {
        "shield": {
            cost: 10,
            AC: "+2",
            weight: 6
        }
    }
}

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