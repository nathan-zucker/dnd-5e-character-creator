import { sortBy } from "async"

function mapWeapon (name, cost, damage, type, weight, properties) {
    return Object.assign({}, {
        name: name,
        cost: cost,
        damage: damage,
        type: type,
        weight: weight,
        properties: properties
    })
}

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
            properties: ["finesse", "light", "thrown (range 20/60)"]
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
            name: 'sickle',
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
        "crossbow, light": {
            name: 'crossbow, light',
            cost: 25,
            damage: "1d8",
            type: "piercing",
            weight: 5,
            properties: ["ammunition (range 80/320)", "loading", "two-handed"]
        },
        "dart": {
            name: 'dart',
            cost: .02,
            damage: "1d4",
            type: 'piercing',
            properties: ["finesse", "thrown (range 20/60)"]
        },
        "shortbow": {
            name: "shortbow",
            cost: 25,
            damage: "1d6",
            type: "piercing",
            weight: 2,
            properties: ["ammunition (range 80/320)", "two-handed"]
        },
        "sling": {
            name: "sling",
            cost: .1,
            damage: "1d4",
            type: "bludgeoning",
            weight: 0,
            properties: ["ammunition (range 30/120)"]
        }
    },
    "martial melee": {
        "battleaxe": mapWeapon("battleaxe", 10, "1d8", "slashing", 4, ["versatile (1d10)"]),
        "flail": mapWeapon("flail", 10, "1d8", "bludgeoning", 2, []),
        "glaive": mapWeapon("glaive", 20, "1d10", "slashing", 6, ["heavy", "reach", "two-handed"]),
        "greataxe": mapWeapon("greataxe", 30, "1d12", "slashing", 7, ["heavy", "two-handed"]),
        "greatsword": mapWeapon("greatsword", 50, "2d6", "slashing", 6, ["heavy", "two-handed"]),
        "halberd": mapWeapon("halberd", 20, "1d10", "slashing", 6, ["heavy", "reach", "two-handed"]),
        "lance": mapWeapon("lance", 10, "1d12", "piercing", 6, ["reach", "special"]),
        "longsword": mapWeapon("longsword", 15, "1d8", "slashing", 3, ["versatile (1d10)"]),
        "maul": mapWeapon("maul", 10, "2d6", "bludgeoning", 10, ["heavy", "two-handed"]),
        "morningstar": mapWeapon("morningstar", 15, "1d8", "piercing", 4, []),
        "pike": mapWeapon("pike", 5, "1d10", "piercing", 18, ["heavy", "reach", "two-handed"]),
        "rapier": mapWeapon("rapier", 25, "1d8", "piercing", 2, ["finesse"]),
        "scimitar": mapWeapon("scimitar", 25, "1d6", "slashing", 3, ["finesse", "light"]),
        "shortsword": mapWeapon("shortsword", 10, "1d6", "piercing", 2, ["finesee", "light"]),
        "trident": mapWeapon("trident", 5, "1d6", "piercing", 4, ["thrown (range 20/60)", "versatile (1d8)"]),
        "war pick": mapWeapon("war pick", 5, "1d8", "piercing", 2, []),
        "whip": mapWeapon("whip", 2, "1d4", "slashing", 3, ["finesse", "reach"])
    },
    "martial ranged": {
        "blowgun": mapWeapon("blowgun", 10, "1", "piercing", 1, ["ammunition (range 25/100)", "loading"]),
        "crossbow, hand": mapWeapon("crossbow, hand", 75, "1d6", "piercing", 3, ["ammunition (range 30/120)", "light", "loading"]),
        "crossbow, heavy": mapWeapon("crossbow, heavy", 50, "1d10", "piercing", 18, ["ammunition (range 100/400)", "heavy", "loading", "two-handed"]),
        "longbow": mapWeapon("longbow", 50, "1d8", "piercing", 2, ["ammunition (range 150/600)", "heavy", "two-handed"]),
        "net": mapWeapon("net", 1, "", 3, ["special", "trown (range 5/15)"])
    }
}

const allWeapons = {
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
        properties: ["finesse", "light", "thrown (range 20/60)"]
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
        name: 'sickle',
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
    },
    "crossbow, light": {
        name: 'crossbow, light',
        cost: 25,
        damage: "1d8",
        type: "piercing",
        weight: 5,
        properties: ["ammunition (range 80/320)", "loading", "two-handed"]
    },
    "dart": {
        name: 'dart',
        cost: .02,
        damage: "1d4",
        type: 'piercing',
        properties: ["finesse", "thrown (range 20/60)"]
    },
    "shortbow": {
        name: "shortbow",
        cost: 25,
        damage: "1d6",
        type: "piercing",
        weight: 2,
        properties: ["ammunition (range 80/320)", "two-handed"]
    },
    "sling": {
        name: "sling",
        cost: .1,
        damage: "1d4",
        type: "bludgeoning",
        weight: 0,
        properties: ["ammunition (range 30/120)"]
    },
    "battleaxe": mapWeapon("battleaxe", 10, "1d8", "slashing", 4, ["versatile (1d10)"]),
    "flail": mapWeapon("flail", 10, "1d8", "bludgeoning", 2, []),
    "glaive": mapWeapon("glaive", 20, "1d10", "slashing", 6, ["heavy", "reach", "two-handed"]),
    "greataxe": mapWeapon("greataxe", 30, "1d12", "slashing", 7, ["heavy", "two-handed"]),
    "greatsword": mapWeapon("greatsword", 50, "2d6", "slashing", 6, ["heavy", "two-handed"]),
    "halberd": mapWeapon("halberd", 20, "1d10", "slashing", 6, ["heavy", "reach", "two-handed"]),
    "lance": mapWeapon("lance", 10, "1d12", "piercing", 6, ["reach", "special"]),
    "longsword": mapWeapon("longsword", 15, "1d8", "slashing", 3, ["versatile (1d10)"]),
    "maul": mapWeapon("maul", 10, "2d6", "bludgeoning", 10, ["heavy", "two-handed"]),
    "morningstar": mapWeapon("morningstar", 15, "1d8", "piercing", 4, []),
    "pike": mapWeapon("pike", 5, "1d10", "piercing", 18, ["heavy", "reach", "two-handed"]),
    "rapier": mapWeapon("rapier", 25, "1d8", "piercing", 2, ["finesse"]),
    "scimitar": mapWeapon("scimitar", 25, "1d6", "slashing", 3, ["finesse", "light"]),
    "shortsword": mapWeapon("shortsword", 10, "1d6", "piercing", 2, ["finesee", "light"]),
    "trident": mapWeapon("trident", 5, "1d6", "piercing", 4, ["thrown (range 20/60)", "versatile (1d8)"]),
    "war pick": mapWeapon("war pick", 5, "1d8", "piercing", 2, []),
    "whip": mapWeapon("whip", 2, "1d4", "slashing", 3, ["finesse", "reach"]),
    "blowgun": mapWeapon("blowgun", 10, "1", "piercing", 1, ["ammunition (range 25/100)", "loading"]),
    "crossbow, hand": mapWeapon("crossbow, hand", 75, "1d6", "piercing", 3, ["ammunition (range 30/120)", "light", "loading"]),
    "crossbow, heavy": mapWeapon("crossbow, heavy", 50, "1d10", "piercing", 18, ["ammunition (range 100/400)", "heavy", "loading", "two-handed"]),
    "longbow": mapWeapon("longbow", 50, "1d8", "piercing", 2, ["ammunition (range 150/600)", "heavy", "two-handed"]),
    "net": mapWeapon("net", 1, "", 3, ["special", "trown (range 5/15)"])
}

const weaponList = Object.keys(weapons["simple melee"]).concat(Object.keys(weapons["simple ranged"])).concat(Object.keys(weapons["martial melee"])).concat(Object.keys(weapons["martial ranged"]));

// ANY SIMPLE MELEE WEAPON WHICH IS NOT TWO-HANDED OR HEAVY


const armorData = {
    "padded armor": {
        group: "light",
        cost: 5,
        AC: {
            base: 11
        },
        stealth: "disadvantage",
        weight: 8
    },
    "leather armor": {
        group: "light",
        cost: 10,
        AC:{
            base: 11
        },
        weight: 10
    },
    "studded leather armor": {
        group: "light",
        cost: 45,
        AC: {
            base: 12
        },
        weight: 13
    },
    "hide armor": {
        group: "medium",
        cost: 10,
        AC: {
            base: 12,
            maxBonus: 2
        },
        weight: 12
    },
    "chain shirt": {
        group: "medium",
        cost: 50,
        AC: {
            base: 13,
            maxBonus: 2
        },
        weight: 20
    },
    "scale mail": {
        group: "medium",
        cost: 50,
        AC: {
            base: 14,
            maxBonus: 2
        },
        stealth: "disadvantage",
        weight: 45
    },
    "breastplate": {
        group: "medium",
        cost: 400,
        AC: {
            base: 14,
            maxBonus: 2
        },
        weight: 20
    },
    "half plate": {
        group: "medium",
        cost: 750,
        AC: {
            base: 15,
            maxBonus: 2
        },
        stealth: "disadvantage",
        weight: 40
    },
    "ring mail": {
        group: "heavy",
        cost: 30,
        AC: {
            base: 14,
            maxBonus: 0,
            strReq: 13
        },
        stealth: "disadvantage",
        weight: 40
    },
    "chain mail": {
        group: "heavy",
        cost: 74,
        AC: {
            base: 16,
            maxBonus: 0,
            strReq: 15
        },
        stealth: "disadvantage",
        weight: 55
    },
    "splint armor": {
        group: "heavy",
        cost: 200,
        AC: {
            base: 17,
            maxBonus: 0,
            strReq: 15
        },
        stealth: "disadvantage",
        weight: 60
    },
    "plate armor": {
        group: "heavy",
        cost: 1500,
        AC: {
            base: 18,
            maxBonus: 0,
            strReq: 15
        },
        stealth: "disadvantage",
        weight: 65
    },
    "shield": {
        group: "shield",
        cost: 10,
        AC: {
            bonus: 2
        },
        weight: 6
    }
}

export {weapons, allWeapons, weaponList, armorData}