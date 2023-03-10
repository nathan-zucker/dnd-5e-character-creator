
const barbarian = {
    base: {
        class: 'Barbarian',
        hitDie: 12,
        primaryAbility: "Strength",
        savingThrows: ["Strength", "Constitution"],
        skills: [2, ["Animal Handling (Wis)", "Athletics (Str)", "Intimidation (Cha)", "Nature (Int)", "Perception (Wis)", "Survival (Wis)"]],
        armor: ['light', 'medium', 'shields'],
        weapons: ['simple', 'martial'],
        equipment: [
            ["greataxe", "any martial melee weapon"], 
            ["two handaxes", "any simple weapon"],
            "explorer's pack", 
            "4 javelins",
            "2d4 x 10 gp"
        ]
    },
        
    1: {
        proficiencyBonus: 2,
        features: ["Rage", "Unarmored Defense"],
        rages: 2,
        rageDamage: 2,
        AC: [10, "Dex", "Con"]
    },
    2: {
        proficiencyBonus: 2,
        features: ["Reckless Attack", "Danger Sense"],
        rages: 2,
        rageDamage: 2
    },
    3: {
        proficiencyBonus: 2,
        features: ["Primal Path"],
        rages: 3,
        rageDamage: 2
    },
    4: {
        proficiencyBonus: 2,
        features: ["Ability Score Improvement"],
        rages: 3,
        rageDamage: 2
    },
    5: {
        proficiencyBonus: 3,
        features: ["Extra Attack", "Fast Movement"],
        rages: 3,
        rageDamage: 2
    },
    subClasses: {
        Berserker: {
            3: {
                features: ["Frenzy"]
            },
            6: {
                features: ["Mindless Rage"]
            },
            10: {
                features: ["Intimidating Presence"]
            },
            14: {
                features: ["Retaliation"]
            }
        },
        TotemWarrior: {
            3: {
                features: ["Spirit Seeker", "Totem Spirit"],
                spellcasting: {
                    rituals: ["beast sense", "speak with animals"]
                }
            },
            6: {
                features: ["Aspect of the Beast"]
            },
            10: {
                features: ["Spirit Walker"]
            },
            14: {
                features: ["Totemic Attunement"]
            }
        }
    },
    subClasses2: {}
    
}

const bard = {
    base: {
        class: 'Bard',
        hitDie: 8,
        savingThrows: ["Dexterity", 'Charisma'],
        primaryAbility: ['Charisma'],
        skills: [3, ["any"]],
        armor: ['light'],
        weapons: ['simple', 'hand crossbow', 'longsword', 'rapier', 'shortsword'],
        equipment: [
            ["rapier", "longsword", "any simple weapon"],
            ["diplomat's pack", "entertainer's pack"],
            "leather armor",
            "dagger",
            "5d4 x 10 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        features: ["Spellcasting", "Bardic Inspiration (d6)"],
        spellCasting: {
            cantripsKnown: 2,
            spellsKnown: 4,
            slots: [2]
        }
        
    },
    2: {
        proficiencyBonus: 2,
        features: ["Jack of All Trades", "Song of Rest (d6)"],
        spellCasting: {
            cantripsKnown: 2,
            spellsKnown: 5,
            slots: [3]
        }
       
    },
    3: {
        proficiencyBonus: 2,
        features: ["Bard College", "Expertise"],
        spellCasting: {
            cantripsKnown: 2,
            spellsKnown: 6,
            slots: [4, 2]
        }
        
    },
    4: {
        proficiencyBonus: 2,
        features: ["Ability Score Improvement"],
        spellCasting: {
            cantripsKnown: 3,
            spellsKnown: 7,
            slots: [4, 3]
        }
        
    },
    5: {
        proficiencyBonus: 3,
        features: ["Bardic Inspiration (d8)", "Font of Inspiration"],
        spellCasting: {
            cantripsKnown: 3,
            spellsKnown: 8,
            slots: [4, 3, 2]
        }
    },
    subClasses: {
        "College of Lore": {
            3: {
                features: ["Bonus Proficiencies Lore", "Cutting Words"]
            },
            6: {
                features: ["Additional Magic Secrets"]
            },
            14: {
                features: ["Peerless Skill"]
            }
        },
        "College of Valor": {
            3: {
                features: ["Bonus Proficiencies Valor", "Combat Inspiration"]
            },
            6: {
                features: ["Extra Attack"]
            },
            14: {
                features: ["Battle Magic"]
            }
        }
    },
    subClasses2: {}
}

const cleric = {
    base: {
        class: 'Cleric',
        hitDie: 8,
        primaryAbility: ['Wisdom'],
        savingThrows: ['Wisdom', 'Charisma'],
        skills: [2, ["History (Int)", "Insight (Wis)", "Medicine (Wis)", "Persuasion (Cha)", "Religion (Int)"]],
        armor: ['light', 'medium', 'shields', '*non-metal'],
        weapons: ['simple'],
        equipment: [
            ["mace", "warhammer*"],
            ["scale mail", "leather armor", "chain mail*"],
            ["light crossbow & 20 bolts", "any simple weapon"],
            ["priest's pack", "explorer's pack"],
            "shield",
            "holy symbol",
            "5d4 x 10 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        features: ["Spellcasting", "Divine Domain"],
        spellCasting: {
            cantripsKnown: 3,
            slots: [3]
        }
    },
    2: {
        proficiencyBonus: 2,
        features: ["Channel Divinity (1/rest)", "Divine Domain Feature"],
        spellCasting: {
            cantripsKnown: 3,
            slots: [3]
        }
    },
    3: {
        proficiencyBonus: 2,
        features: [],
        spellCasting: {
            cantripsKnown: 3,
            slots: [4, 2]
        }
    },
    4: {
        proficiencyBonus: 2,
        features: ["Ability Score Improvement"],
        spellCasting: {
            cantripsKnown: 4,
            slots: [4, 3]
        }
    },
    5: {
        proficiencyBonus: 3,
        features: ["Destroy Undead (CR 1/2)"],
        spellCasting: {
            cantripsKnown: 4,
            slots: [4, 3, 2]
        }
    },
    subClasses: {
        "Knowledge": {
            1: {
                features: ["Blessings of Knowledge"],
                spellCasting: {clericSpells: ["command", "identify"]}
            },
            2: {
                spellCasting: {ChannelDivinity: ["Knowledge of the Ages"]}
            },
            3: {
                spellCasting: {clericSpells: ["command", "identify", "augury", "suggestion"]}
            },
            5: {
                spellCasting: {clericSpells: ["command", "identify", "augury", "suggestion", "nondetection", "speak with dead"]}
            },
            6: {
                features: ["Channel Divinity: Read Thoughts"]
            },
            7: {
                spells: ["arcane eye", "confusion"]
            },
            8: {
                features: ["Potent Spellcasting"]
            },
            9: {
                spells: ["legend lore", "scrying"]
            },
            17: {
                features: ["Visions of the Past"]
            }
        },
        "Life": {
            1: {
                features: ["Disciple of Life"],
                spellCasting: {clericSpells: ["bless", "cure wounds"]}
            },
            2: {
                spellCasting: {ChannelDivinity: ['Preserve Life']}
            },
            3: {
                spellCasting: {clericSpells: ["bless", "cure wounds", "lesser restoration", "spiritual weapon"]}
            },
            5: {
                spellCasting: {clericSpells: ["bless", "cure wounds", "lesser restoration", "spiritual weapon", "beacon of hope", "revivify"]}
            },
            6: {
                features: ["Blessed Healer"]
            },
            7: {
                spells: ["death ward", "garden of faith"]
            },
            8: {
                features: ["Divine Strike"]
            },
            9: {
                spells: ["mass cure wounds", "raise dead"]
            },
            17: {
                features: ["Supreme Healing"]
            }
        },
        "Light": {
            1: {
                features: ["Bonus Cantrip Light", "Warding Flare"],
                spellCasting: {
                    clericSpells: ["burning hands", "faerie fire"]
                }
            },
            2: {
                spellCasting: { channelDivinity: ["Radiance of the Dawn"] }
            },
            3: {
                spellCasting: { clericSpells: ["burning hands", "faerie fire", "flaming sphere", "scorching ray"]}
            },
            5: {
                spellCasting: {
                    clericSpells: ["burning hands", "faerie fire", "flaming sphere", "scorching ray", "daylight", "fireball"]
                }
            },
            6: {
                features: ["Improved Flare"]
            },
            7: {
                spells: ["guardian of faith", "wall of fire"]
            },
            8: {
                features: ["Potent Spellcasting"]
            },
            9: {
                spells: ["flame strike", "scrying"]
            }
        },
        "Nature": {
            1: {
                features: ["Acolyte of Nature", "Bonus Proficiency Nature"],
                spellCasting: {
                    clericSpells: ["animal friendship", "speak with animals"]
                }
            },
            2: {
                spellCasting: {
                    channelDivinity: ["Charm Animals and Plants"]
                }
            },
            3: {
                spellCasting: {
                    clericSpells: ["animal friendship", "speak with animals", "barkskin", "spike growth"]
                }
            },
            5: {
                spellCasting: {
                    clericSpells: ["animal friendship", "speak with animals", "barkskin", "spike growth", "plant growth", "wind wall"]
                }
            },
            6: {
                features: ["Dampen Elements"]
            },
            7: {
                spells: ["dominate beast", "grasping vine"]
            },
            8: {
                features: ["Divine Strike"]
            },
            9: {
                spells: ["insect plague", "tree stride"]
            },
            17: {
                features: ["Master of Nature"]
            }
        },
        "Tempest": {
            1: {
                features: ["Bonus Proficiencies Tempest", "Wrath of the Storm"],
                spellCasting: {
                    clericSpells: ["fog cloud", "thunderwave"]
                }
            },
            2: {
                spellCasting: {
                    channelDivinity: ["Destructive Wrath"]
                }
            },
            3: {
                spellCasting: {
                    clericSpells: ["fog cloud", "thunderwave", "gust of wind", "shatter"]
                }
            },
            5: {
                spellCasting: {
                    clericSpells: ["fog cloud", "thunderwave", "gust of wind", "shatter", "call lightning", "sleet storm"]
                }
            },
            6: {
                features: ["Thunderbolt Strike"]
            },
            7: {
                spells: ["control water", "ice storm"]
            },
            8: {
                features: ["Divine Strike"]
            },
            9: {
                spells: ["destructive wave", "insect plague"]
            },
            17: {
                features: ["Stormborn"]
            }
        },
        "Trickery": {
            1: {
                features: ["Blessing of the Trickster"],
                spellCasting: {
                    clericSpells: ["charm person", "disguise self"]
                }
            },
            2: {
                spellcasting: {
                    channelDivinity: ["Invoke Duplicity"]
                }
            },
            3: {
                spellCasting: {
                    clericSpells: ["charm person", "disguise self", "mirror image", "pass without trace"]
                }
            },
            5: {
                spellCasting: {
                    clericSpells: ["charm person", "disguise self", "mirror image", "pass without trace", "blink", "dispel magic"]
                }
            },
            6: {
                features: ["Channel Divinity: Cloak of the Shadows"]
            },
            7: {
                spells: ["dimension door", "polymorph"]
            },
            8: {
                features: ["Divine Strike"]
            },
            9: {
                spells: ["dominate person", "modify memory"]
            },
            17: {
                features: ["Improved Duplicity"]
            }
        },
        "War": {
            1: {
                features: ["Bonus Proficiencies War", "War Priest"],
                spellCasting: {
                    clericSpells: ["divine favor", "shield of faith"]
                }
            },
            2: {
                spellCasting: {
                    channelDivinity: ["Cloud Strike"]
                }
            },
            3: {
                spellCasting: {
                    clericSpells: ["divine favor", "shield of faith", "magic weapon", "spiritual weapon"]
                }
            },
            5: {
                spellcasting: {
                    clericSpells: ["divine favor", "shield of faith", "magic weapon", "spiritual weapon", "crusader's mantle", "spirit guardians"]
                }
            },
            6: {
                features: ["Channel Divinity: War God's Blessing"]
            },
            7: {
                spells: ["freedom of movement", "stoneskin"]
            },
            8: {
                features: ["Divine Strike"]
            },
            9: {
                spells: ["flame strike", "hold monster"]
            },
            17: {
                features: ["Avatar of Battle"]
            }
        }
    },
    subClasses2: {}
}

const druid = {
    base: {
        class: 'Druid',
        hitDie: 8,
        primaryAbility: ["Wisdom"],
        savingThrows: ["Intelligence", "Wisdom"],
        skills: [2, ["Arcana (Int)", "Animal Handling (Wis)", "Insight (Wis)", "Perception (Wis)", "Religion (Int)", "Survival (Wis)"]],
        armor: ['light', 'medium', 'shield'],
        weapons: ['club', 'dagger', 'dart', 'javelin', 'mace', 'quarterstaff', 'scimitar', 'sickle', 'sling', 'spear'],
        tools: ["Herbalism Kit"],
        equipment: [
            ["wooden shield", "any simple weapon"],
            ["scimitar", "any simple melee weapon"],
            "leather armor", "explorer's pack", "druidic focus", "2d4 x 10 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        features: ["Druidic", "Spellcasting"],
        spellCasting: {
            cantripsKnown: 2,
            slots: [2]
        }
    },
    2: {
        proficiencyBonus: 2,
        features: ["Wild Shape", "Druid Circle"],
        spellCasting: {
            cantripsKnown: 2,
            slots: [3]
        }
    },
    3: {
        proficiencyBonus: 2,
        features: [],
        spellCasting: {
            cantripsKnown: 2,
            slots: [4, 2]
        }
    },
    4: {
        proficiencyBonus: 2,
        features: ["Wild Shape Improvement", "Ability Score Improvement"],
        spellCasting: {
            cantripsKnown: 3,
            slots: [4, 3]
        }
    },
    5: {
        proficiencyBonus: 3,
        features: [],
        spellCasting: {
            cantripsKnown: 3,
            slots: [4, 3, 2]
        }
    },
    subClasses: {
        "Circle of the Land": {
            2: {
                features: ["Circle of the Land", "Natural Recovery"],
                spellCasting: {
                    cantripsKnown: 1
                }
            },
            6: {
                features: ["Land's Stride"]
            },
            10: {
                features: ["Nature's Ward"]
            },
            14: {
                features: ["Nature's Sanctuary"]
            }
        },
        "Circle of the Moon": {
            2: {
                features: ["Combat Wild Shape", "Circle Forms"]
            },
            6: {
                features: ["Improved Circle Forms", "Primal Strike"]
            },
            10: {
                features: ["Elemental Wild Shape"]
            },
            14: {
                features: ["Thousand Forms"]
            }
        }
    },
    subClasses2: {
        "Arctic": {
            3: {
                spellCasting: {
                    druidSpells: ["hold person", "spike growth"]
                }
            },
            5: {
                spellCasting: {
                    druidSpells: ["hold person", "spike growth", "hold person", "spike growth"]
                }
            }
        },
        "Coast": {
            3: {
                spellCasting: {
                    druidSpells: ["mirror image", "misty step"]
                }
            },
            5: {
                spellCasting: {
                    druidSpells: ["mirror image", "misty step", "water breathing", "water walk"]
                }
            }
        },
        "Desert": {
            3: {
                spellCasting: {
                    druidSpells: ["blur", "silence"]
                }
            },
            5: {
                spellCasting: {
                    druidSpells: ["blur", "silence", "create food and water", "protection from energy"]
                }
            }
        },
        "Forest": {
            3: {
                spellCasting: {
                    druidSpells: ["barkskin", "spider climb"]
                }
            },
            5: {
                spellCasting: {
                    druidSpells: ["barkskin", "spider climb", "call lightning", "plant growth"]
                }
            }
        },
        "Grassland": {
            3: {
                spellCasting: {
                    druidSpells: ["invisibility", "pass without trace"]
                }
            },
            5: {
                spellCasting: {
                    druidSpells: ["invisibility", "pass without trace", "daylight", "haste"]
                }
            }
        },
        "Mountain": {
            3: {
                spellCasting: {
                    druidSpells: ["spider climb", "spike growth"]
                }
            },
            5: {
                spellCasting: {
                    druidSpells: ["spider climb", "spike growth", "lightning bolt", "meld into stone"]
                }
            }
        },
        "Swamp": {
            3: {
                spellCasting: {
                    druidSpells: ["darkness", "Melf's acid arrow"]
                }
            },
            5: {
                spellCasting: {
                    druidSpells: ["darkness", "Melf's acid arrow", "water walk", "stinking cloud"]
                }
            }
        },
        "Underdark": {
            3: {
                spellCasting: {
                    druidSpells: ["spider climb", "web"]
                }
            },
            5: {
                spellCasting: {
                    druidSpells: ["spider climb", "web", "gaseous form", "stinking cloud"]
                }
            }
        }
    }
}

const fighter = {
    base: {
        class: "Fighter",
        hitDie: 10,
        primaryAbility: ['Strength/Dexterity'],
        savingThrows: ["Strength", "Constitution"],
        skills: [2, ['Acrobatics (Dex)', "Animal Handling (Wis)", "Athletics (Str)", "History (Int)", "Insight (Wis)", "Intimidation (Cha)", "Perception (Wis)", "Survival (Wis)"]],
        armor: ['shield', 'light', 'medium', 'heavy'],
        weapons: ['simple', 'martial'],
        equipment: [
            ["chain mail", "leather armor & longbow & 20 arrows"],
            ["any martial weapon & shield", "any two martial weapons"],
            ["crossbow, light & 20 bolts", "two handaxes"],
            ["dungeoneer's pack", "explorer's pack"],
            "5d4 x 10 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        features: ["Fighting Style", "Second Wind"]
    },
    2: {
        proficiencyBonus: 2,
        features: ["Action Surge (1)"]
    },
    3: {
        proficiencyBonus: 2,
        features: ["Martial Archetype"]
    },
    4: {
        proficiencyBonus: 2,
        features: ["Ability Score Improvement"]
    },
    5: {
        proficiencyBonus: 3,
        features: ["Extra Attack"]
    },
    subClasses: {
        "Champion": {
            3: {
                features: ["Improved Critical"]
            },
            7: {
                features: ["Remarkable Athlete"]
            },
            8: {
                features: ["Additional Fighting Style"]
            },
            9: {
                features: ["Superior Critical"]
            },
            18: {
                features: ["Survivor"]
            }
        },
        "Battle Master": {
            3: {
                features: ["Combat Superiority", "Student of War"]
            },
            7: {
                features: ["Know Your Enemy"]
            },
            10: {
                features: ["Improved Combat Superiority"]
            },
            15: {
                features: ["Relentless"]
            },
            18: {
                features: ["Superior Combat Superiority"]
            }
        },
        "Eldritch Knight": {
            3: {
                features: ["Weapon Bond"],
                spellCasting: {
                    cantripsKnown: 2,
                    spellsKnown: 3,
                    slots: [2]
                }
            },
            4: {
                spellCasting: {
                    cantripsKnown: 2,
                    spellsKnown: 4,
                    slots: [3]
                }
            },
            5: {
                spellCasting: {
                    cantripsKnown: 2,
                    spellsKnown: 4,
                    slots: [3]
                }
            },
            6: {
                spellCasting: {
                    cantripsKnown: 2,
                    spellsKnown: 4,
                    slots: [3]
                }
            },
            7: {
                features: ["War Magic"],
                spellCasting: {
                    cantripsKnown: 2,
                    spellsKnown: 5,
                    slots: [4, 2]
                }
            },
            8: {
                spellCasting: {
                    cantripsKnown: 2,
                    spellsKnown: 6,
                    slots: [4, 2]
                }
            },
            9: {
                spellCasting: {
                    cantripsKnown: 2,
                    spellsKnown: 6,
                    slots: [4, 2]
                }
            },
            10: {
                features: ["Eldritch Strike"],
                spellCasting: {
                    cantripsKnown: 3,
                    spellsKnown: 7,
                    slots: [4, 3]
                }

            },
            //  FINISH LATER
            15: {
                features: ["Arcane Charge"]
            },
            18: {
                features: ["Improved War Magic"]
            }
        }
    },
    subClasses2: {
        "Archery": {
            1: {
                features: ["Archery Fighting Style"]
            } 
        },
        "Defense": {
            1: {
                features: ["Defense Fighting Style"]
            }
        },
        "Dueling": {
            1: {
                features: ["Dueling Fighting Style"]
            }
        },
        "Great Weapon Fighting": {
            1: {
                features: ["Great Weapon Fighting Style"]
            }
        },
        "Protection": {
            1: {
                features: ["Protection Fighting Style"]
            }
        },
        "Two-Weapon Fighting": {
            1: {
                features: ["Two-Weapon Fighting Style"]
            }
        }
    }
    
}

const monk = {
    base: {
        class: 'Monk',
        hitDie: 8,
        primaryAbility: ["Dexterity", "Wisdom"],
        savingThrows: ["Strength", "Dexterity"],
        skills: [2, ["Acrobatics (Dex)", "Athletics (Str)", "History (Int)", "Insight (Wis)", "Religion (Int)", "Stealth (Dex)"]],
        armor: [],
        weapons: ['simple', 'shortsword'],
        tools: [1, ["artisan's tools", "musical instrument"]],
        equipment: [
            ["shortsword", "any simple weapon"],
            ["dungeoneer's pack", "explorer's pack"],
            "10 darts",
            "5d4 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        martialArts: "1d4",
        kiPoints: 0,
        unarmoredMovement: 0,
        features: ["Unarmored Defense", "Martial Arts"],
        AC: [10, "Dex", "Wis"]
    },
    2: {
        proficiencyBonus: 2,
        martialArts: "1d4",
        kiPoints: 2,
        unarmoredMovement: 10,
        features: ["Ki", "Unarmored Movement"]
    },
    3: {
        proficiencyBonus: 2,
        martialArts: "1d4",
        kiPoints: 3,
        unarmoredMovement: 10,
        features: ["Monastic Tradition", "Deflect Missiles"]
    },
    4: {
        proficiencyBonus: 2,
        martialArts: "1d4",
        kiPoints: 4,
        unarmoredMovement: 10,
        features: ["Ability Score Improvement", "Slow Fall"]
    },
    5: {
        proficiencyBonus: 3,
        martialArts: "1d6",
        kiPoints: 5,
        unarmoredMovement: 10,
        features: ["Extra Attack", "Stunning Strike"]
    },
    subClasses: {
        "Way of the Open Hand": {
            3: {
                features: ["Open Hand Technique"]
            },
            6: {
                features: ["Wholeness of Body"]
            },
            11: {
                features: ["Tranquility"]
            },
            17: {
                features: ["Quivering Palm"]
            }
        },
        "Way of the Shadow": {
            3: {
                features: ["Shadow Arts"]
            },
            6: {
                features: ["Shadow Step"]
            },
            11: {
                features: ["Cloak of Shadows"]
            },
            17: {
                features: ["Opportunist"]
            }
        },
        "Way of the Four Elements": {
            3: {
                features: ["Disciple of the Elements"]
            }
        }
    },
    subClasses2: {}
}

const paladin = {
    base: {
        class: "Paladin",
        hitDie: 10,
        primaryAbility: ['Strength', 'Charisma'],
        savingThrows: ['Wisdom', 'Charisma'],
        skills: [2, ["Athletics (Str)", "Insight (Wis)", "Intimidation (Cha)", "Medicine (Wis)", "Persuasion (Cha)", "Religion (Int)"]],
        armor: ['shield', 'light', 'medium', 'heavy'],
        weapons: ['simple', 'martial'],
        equipment: [
            ["any martial weapon & shield", "any two martial weapons"],
            ["5 javelins", "any simple melee weapon"],
            ["priest's pack", "explorer's pack"],
            "chain mail",
            "holy symbol",
            "5d4 x 10 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        features: ["Divine Sense", "Lay on Hands"],
        spellCasting: {}
    },
    2: {
        proficiencyBonus: 2,
        features: ["Fighting Style", "SpellCasting", "Divine Smite"],
        spellCasting: {
            slots: [2]
        }
    },
    3: {
        proficiencyBonus: 2,
        features: ["Divine Health", "Sacred Oath"],
        spellCasting: {
            slots: [3]
        }
    },
    4: {
        proficiencyBonus: 2,
        features: ["Ability Score Improvement"],
        spellCasting: {
            slots: [3]
        }
    },
    5: {
        proficiencyBonus: 3,
        features: ["Extra Attack"],
        spellCasting: {
            slots: [4, 2]
        }
    },
    subClasses: {
        "Oath of Devotion": {
            3: {
                features: ["Oath Spells", "Channel Divinity"],
                spellCasting: {
                    oathSpells: ["protection from evil and good", "sanctuary"],
                    channelDivinity: ["Sacred Weapon", "Turn the Unholy"]
                }
                
            },
            5: {
                spellCasting: {
                    oathSpells: ["lesser restoration", "zone of truth"]
                }
                
            },
            7: {
                features: ["Aura of Devotion"]
            },
            9: {
                spellCasting: {
                    oathSpells: ["beacon of hope", "dispel magic"]
                }
            },
            13: {
                spellCasting: {
                    oathSpells: ["freedom of movement", "guardian of faith"]
                }
            },
            15: {
                features: ["Purity of Spirit"]
            },
            17: {
                spellCasting: {
                    oathSpells: ["commune", "flame strike"]
                }
            },
            18: {
                features: ["Improved Aura of Devotion"]
            },
            20: {
                features: ["Holy Nimbus"]
            }
        },
        "Oath of the Ancients": {
            3: {
                features: ["Channel Divinity", "Oath Spells"],
                spellCasting: {
                    oathSpells: ["ensnaring strike", "speak with animals"],
                    channelDivinity: ["Nature's Wrath", "Turn the Faithless"]
                }
            },
            5: {
                spellCasting: {oathSpells: ["moonbeam", "misty step"]}
            },
            7: {
                features: ["Aura of Warding"]
            },
            9: {
                spellCasting: {oathSpells: ["plant growth", "protection from energy"]}
            },
            13: {
                spellCasting: {oathSpells: ["ice storm", "stoneskin"]}
            },
            15: {
                features: ["Undying Sentinel"]
            },
            17: {
                spellCasting: {oathSpells: ["commune with nature", "tree stride"]}
            },
            18: {
                features: ["Improved Aura of Warding"]
            },
            20: {
                features: ["Elder Champion"]
            }
        },
        "Oath of Vengeance": {
            3: {
                features: ["Oath Spells", "Channel Divinity"],
                spellCasting: {
                    oathSpells: ["bane", "hunter's mark"],
                    channelDivinity: ["Abjure Enemy", "Vow of Enmity"]
                }
                
            },
            5: {
                spellCasting: {
                    oathSpells: ["bane", "hunter's mark", "hold person", "misty step"]
                }
                
            },
            7: {
                features: ["Relentless Avenger"]
            },
            9: {
                spellCasting: {
                    oathSpells: ["bane", "hunter's mark", "hold person", "misty step", "haste", "protection from energy"]
                }
            },
            13: {
                spellCasting: {
                    oathSpells: ["bane", "hunter's mark", "hold person", "misty step", "haste", "protection from energy", "banishment", "dimension door"]
                }
            },
            15: {
                features: ["Soul of Vengeance"]
            },
            17: {
                spellCasting: {
                    oathSpells: ["bane", "hunter's mark", "hold person", "misty step", "haste", "protection from energy", "banishment", "dimension door", "hold monster", "scrying"]
                }
                
            },
            20: {
                features: ["Avenging Angel"]
            }
        }
    },
    subClasses2: {
        "Archery": {
            1: {
                features: ["Archery Fighting Style"]
            } 
        },
        "Defense": {
            1: {
                features: ["Defense Fighting Style"]
            }
        },
        "Dueling": {
            1: {
                features: ["Dueling Fighting Style"]
            }
        },
        "Great Weapon Fighting": {
            1: {
                features: ["Great Weapon Fighting Style"]
            }
        },
        "Protection": {
            1: {
                features: ["Protection Fighting Style"]
            }
        },
        "Two-Weapon Fighting": {
            1: {
                features: ["Two-Weapon Fighting Style"]
            }
        }
    }
}

const ranger = {
    base: {
        class: "Ranger",
        hitDie: 10,
        primaryAbility: ["Dexterity", "Wisdom"],
        savingThrows: ['Strength', "Dexterity"],
        skills: [3, ["Animal Handling (Wis)", "Athletics (Str)", "Insight (Wis)", "Investigation (Int)", "Nature (Int)", "Perception (Wis)", "Stealth (Dex)", "Survival (Wis)"]],
        armor: ['light', 'medium'],
        weapons: ['simple', 'martial'],
        equipment: [
            ["scale mail", "leather armor"],
            ["two shortswords", "two simple melee weapons"],
            ["dungeoneer's pack", "explorer's pack"],
            "longbow & 20 arrows",
            "5d4 x 10 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        features: ["Favored Enemy", "Natural Explorer"]
    },
    2: {
        proficiencyBonus: 2,
        features: ["Fighting Style", "Spellcasting"],
        spellCasting: {
            spellsKnown: 2,
            slots: [2]
        }
    },
    3: {
        proficiencyBonus: 2,
        features: ["Ranger Archetype", "Primeval Awareness"],
        spellCasting: {
            spellsKnown: 3,
            slots: [3]
        }
    },
    4: {
        proficiencyBonus: 2,
        features: ["Ability Score Improvement"],
        spellCasting: {
            spellsKnown: 3,
            slots: [3]
        }
    },
    5: {
        proficiencyBonus: 3,
        features: ["Extra Attack"],
        spellCasting: {
            spellsKnown: 4,
            slots: [4, 2]
        }
    },
    subClasses: {
        "Hunter": {
            3: {
                features: ["Hunter's Prey"],
                options: ["Colossus Slayer", "Giant Killer", "Horde Breaker"]
            },
            7: {
                features: ["Defensive Tactics"],
                options: ["Escape the Horde", "Multiattack Defense", "Steel Will"]
            },
            11: {
                features: ["Multiattack"],
                options: ["Volley", "Whirlwind Attack"]
            },
            15: {
                features: ["Superior Hunter's Defense"],
                options: ["Evasion", "Stand Against the Tide", "Uncanny Dodge"]
            }
        },
        "Beast Master": {

            3: {
                features: ["Ranger's Companion"]
            },
            7: {
                features: ["Exceptional Training"]
            },
            11: {
                features: ["Bestial Fury"]
            },
            15: {
                features: ["Share Spells"]
            }
        }
    },
    subClasses2: {
        "Archery": {
            features: ["Archery Fighting Style"]
        },
        "Defense": {
            features: ["Defense Fighting Style"]
        },
        "Dueling": {
            features: ["Dueling Fighting Style"]
        },
        "Two-Weapon Fighting": {
            features: ["Two-Weapon Fighting Style"]
        }
    }
}

const rogue = {
    base: {
        class: "Rogue",
        hitDie: 8,
        primaryAbility: ['Dexterity'],
        savingThrows: ["Dexterity", "Intelligence"],
        skills: [4, ["Acrobatics (Dex)", "Athletics (Str)", "Deception (Cha)", "Insight (Wis)", "Intimidation (Cha)", "Investigation (Int)", "Perception (Wis)", "Performance (Cha)", "Persuasion (Cha)", "Sleight of Hand (Dex)", "Stealth (Dex)"]],
        armor: ['light', 'medium'],
        weapons: ['simple', 'hand crossbow', 'longsword', 'rapier', 'shortsword'],
        tools: ["thieves's tools"],
        equipment: [
            ["rapier", "shortsword"],
            ["shortbow & 20 arrows", "shortsword"],
            ["burglar's pack", "dungeoneer's pack", "explorer's pack"],
            "leather armor", "two daggers", "thieve's tools", "4d4 x 10 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        sneakAttack: "1d6",
        features: ["Expertise", "Sneak Attack", "Thieves' Cant"]
    },
    2: {
        proficiencyBonus: 2,
        sneakAttack: "1d6",
        features: ["Cunning Action"]
    },
    3: {
        proficiencyBonus: 2,
        sneakAttack: "2d6",
        features: ["Rogueish Archetype"]
    },
    4: {
        proficiencyBonus: 2,
        sneakAttack: "2d6",
        features: ["Ability Score Improvement"]
    },
    5: {
        proficiencyBonus: 3,
        sneakAttack: "3d6",
        features: ["Uncanny Dodge"]
    },
    subClasses: {
        "Thief": {
            3: {
                features: ["Fast Hands", "Second-Story Work"]
            },
            9: {
                features: ["Supreme Sneak"]
            },
            13: {
                features: ["Use Magic Defense"]
            },
            17: {
                features: ["Thief's Reflexes"]
            }
        },
        "Assassin": {
            3: {
                features: ["Bonus Proficiencies Assassin", "Assassinate"]
            },
            9: {
                features: ["Infiltration Expertise"]
            },
            13: {
                features: ["Impostor"]
            },
            17: {
                features: ["Death Strike"]
            }
        },
        "Arcane Trickster": {
            3: {
                features: ["Spellcasting", "Mage Hand Legerdemain"],
                spellCasting: {
                    cantripsKnown: 3,
                    spellsKnown: 3,
                    slots: [2]
                }
            },
            4: {
                spellCasting: {
                    cantripsKnown: 3,
                    spellsKnown: 4,
                    slots: [3]
                }
            },
            5: {
                spellCasting: {
                    cantripsKnown: 3,
                    spellsKnown: 4,
                    slots: [3]
                }
            },
            9: {
                features: ["Magical Ambush"]
            },
            13: {
                features: ["Versatile Trickster"]
            },
            17: {
                features: ["Spell Thief"]
            }

        }
    },
    subClasses2: {}
}

const sorcerer = {
    base: {
        class: "Sorcerer",
        hitDie: 6,
        primaryAbility: ['Charisma'],
        savingThrows: ['Constitution', 'Charisma'],
        armor: [],
        weapons: ['dagger', 'dart', 'sling', 'quarterstaff', 'light crossbow'],
        skills: [2, ["Arcana (Int)", "Deception (Cha)", "Insight (Wis)", "Intimidation (Cha)", "Persuasion (Cha)", "Religion (Int)"]],
        equipment: [
            ["light crossbow & 20 bolts", "any simple weapon"],
            ["component pouch", "arcane focus"],
            ["dugeoneer's pack", "explorer's pack"],
            "two daggers", 
            "3d4 x 10 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        sorceryPoints: 0,
        features: ["Spellcasting", "Sorcerous Origins"],
        spellCasting: {
            cantripsKnown: 4,
            spellsKnown: 2,
            slots: [2]
        }
    },
    2: {
        proficiencyBonus: 2,
        sorceryPoints: 2,
        features: ["Font of Magic"],
        spellCasting: {
            cantripsKnown: 4,
            spellsKnown: 3,
            slots: [3]
        }
    },
    3: {
        proficiencyBonus: 2,
        sorceryPoints: 3,
        features: ["Metamagic"],
        spellCasting: {
            cantripsKnown: 4,
            spellsKnown: 4,
            slots: [4, 2]
        }
    },
    4: {
        proficiencyBonus: 2,
        sorceryPoints: 4,
        features: ["Ability Score Improvement"],
        spellCasting: {
            cantripsKnown: 5,
            spellsKnown: 5,
            slots: [4, 3]
        }
    },
    5: {
        proficiencyBonus: 2,
        sorceryPoints: 5,
        features: [],
        spellCasting: {
            cantripsKnown: 5,
            spellsKnown: 6,
            slots: [4, 3, 2]
        }
    },
    subClasses: {
        "Draconic Bloodline": {
            1: {
                features: ["Draconic Ancestor", "Draconic Resilience"],
                options: [
                    ["Black", "Acid"], 
                    ["Blue", "Lightning"], 
                    ["Brass", "Fire"],
                    ["Bronze", "Lightning"],
                    ["Copper", "Acid"],
                    ["Gold", "Fire"],
                    ["Green", "Poison"],
                    ["Red", "Fire"],
                    ["Silver", "Cold"],
                    ["White", "Cold"]
                ]
            },
            6: {
                features: ["Elemental Affinity"]
            },
            14: {
                features: ["Dragon Wings"]
            },
            18: {
                features: ["Draconic Presence"]
            }
        },
        "Wild Magic": {
            1: {
                features: ["Wild Magic Surge", "Tides of Chaos"]
            },
            6: {
                features: ["Bend Luck"]
            },
            14: {
                features: ["Controlled Chaos"]
            },
            18: {
                features: ["Spell Bombardment"]
            }
        }
    },
    subClasses2: {}
}

const warlock = {
    base: {
        class: "Warlock",
        hitDie: 8,
        primaryAbility: "Charisma",
        savingThrows: ["Wisdom", "Charisma"],
        skills: [2, ["Arcana (Int)", "Deception (Cha)", "History (Int)", "Intimidation (Cha)", "Investigation (Int)", "Nature (Int)", "Religion (Int)"]],
        armor: ["light"],
        weapons: ['simple'],
        equipment: [
            ["light crossbow & 20 bolts", "any simple weapon"],
            ["component pouch", "arcane focus"],
            ["scholar's pack", "dungeoneer's pack"],
            "leather armor",
            "any simple weapon",
            "two daggers",
            "4d4 x 10 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        features: ["Otherworldly Patron", "Pact Magic", "Spellcasting"],
        spellCasting: {
            cantripsKnown: 2,
            spellsKnown: 2,
            slots: [1]
        }
    },
    2: {
        proficiencyBonus: 2,
        features: ["Eldritch Invocations"],
        spellCasting: {
            cantripsKnown: 2,
            spellsKnown: 3,
            slots: [2],
            invocations: 2
        }
    },
    3: {
        proficiencyBonus: 2,
        features: ["Pact Boon"],
        spellCasting: {
            cantripsKnown: 2,
            spellsKnown: 4,
            slots: [0, 2],
            invocations: 2
        }
    },
    4: {
        proficiencyBonus: 2,
        features: ["Ability Score Improvement"],
        spellCasting: {
            cantripsKnown: 3,
            spellsKnown: 5,
            slots: [0, 2],
            invocations: 2
        }
    },
    5: {
        proficiencyBonus: 3,
        features: [],
        spellCasting: {
            cantripsKnown: 3,
            spellsKnown: 6,
            slots: [0, 0, 2],
            invocations: 3
        }
    },
    subClasses: {
        "Archfey": {
            1: {
                features: ["Fey Presence"],
                spellCasting: {
                    warlockSpells: ["faerie fire", "sleep"]
                }
            },
            2: {
                spellCasting: {
                    warlockSpells: ["faerie fire", "sleep", "calm emotions, phantasmal force"]
                }
            },
            3: {
                spellCasting: {
                    warlockSpells: ["faerie fire", "sleep", "calm emotions, phantasmal force", "blink", "plant growth"]
                }
            },
            4: {
                spellCasting: {
                    warlockSpells: ["faerie fire", "sleep", "calm emotions, phantasmal force", "blink", "plant growth", "dominate beast", "greater invisibility"]
                }
            },
            5: {
                spellCasting: {
                    warlockSpells: ["faerie fire", "sleep", "calm emotions, phantasmal force", "blink", "plant growth", "dominate beast", "greater invisibility", "dominate person", "seeming"]
                }
            },
            6: {
                features: ["Misty Escape"]
            },
            10: {
                features: ["Beguiling Defenses"]
            },
            14: {
                features: ["Dark Delirium"]
            }
        },
        "Fiend": {
            1: {
                features: ["Dark One's Blessing"],
                spellCasting: {
                    warlockSpells: ["burning hands", "command"]
                }
            },
            2: {
                spellCasting: {
                    warlockSpells: ["burning hands", "command", "blindness/deafness", "scorching ray"]
                }
            },
            3: {
                spellCasting: {
                    warlockSpells: ["burning hands", "command", "blindness/deafness", "scorching ray", "fireball", "stinking cloud"]
                }
            },
            4: {
                spellCasting: {
                    warlockSpells: ["burning hands", "command", "blindness/deafness", "scorching ray", "fireball", "stinking cloud", "fire shield", "wall of fire"]
                }
            },
            5: {
                spellCasting: {
                    warlockSpells: ["burning hands", "command", "blindness/deafness", "scorching ray", "fireball", "stinking cloud", "fire shield", "wall of fire", "flame strike", "hallow"]
                }
            },
            6: {
                features: ["Dark One's Own Luck"]
            },
            10: {
                features: ["Fiendish Resilience"]
            },
            14: {
                features: ["Hurl Through Hell"]
            }
        },
        "The Great Old One": {
            1: {
                features: ["Awakened Mind"],
                spellCasting: {
                    warlockSpells: ["dissonant whispers", "Tasha's hideous laughter"]
                }
            },
            2: {
                spellCasting: {
                    warlockSpells: ["dissonant whispers", "Tasha's hideous laughter", "detect thoughts", "phantasmal force"]
                }
            },
            3: {
                spellCasting: {
                    warlockSpells: ["dissonant whispers", "Tasha's hideous laughter", "detect thoughts", "phantasmal force", "clairvoyance", "sending"]
                }
            },
            4: {
                spellCasting: {
                    warlockSpells: ["dissonant whispers", "Tasha's hideous laughter", "detect thoughts", "phantasmal force", "clairvoyance", "sending", "dominate beast", "Evard's black tentacles"]
                }
            },
            5: {
                spellCasting: {
                    warlockSpells: ["dissonant whispers", "Tasha's hideous laughter", "detect thoughts", "phantasmal force", "clairvoyance", "sending", "dominate beast", "Evard's black tentacles", "dominate person", "telekinesis"]
                }
            }
        }
    },
    subClasses2: {}
}

const wizard = {
    base: {
        class: "Wizard",
        hitDie: 6,
        primaryAbility: "Intelligence",
        savingThrows: ["Intelligence", "Wisdom"],
        skills: [2, ["Arcana (Int)", "History (Int)", "Insight (Wis)", "Investigation (Int)", "Medicine (Wis)", "Religion (Int)"]],
        armor: [],
        weapons: ['dagger', 'dart', 'sling', 'quarterstaff', 'light crossbow'],
        equipment: [
            ["quarterstaff", "dagger"],
            ["component pouch", "arcane focus"],
            ["scholar's pack", "explorer's pack"],
            "spellbook",
            "4d4 x 10 gp"
        ]
    },
    1: {
        proficiencyBonus: 2,
        features: ["Spellcasting", "Arcane Recovery", "Spellbook"],
        spellCasting: {
            cantripsKnown: 3,
            spellbook: [6],
            slots: [2]
        }
    },
    2: {
        proficiencyBonus: 2,
        features: ["Arcane Tradition"],
        spellCasting: {
            cantripsKnown: 3,
            spellbook: [6],
            slots: [3]
        }
    },
    3: {
        proficiencyBonus: 2,
        features: [],
        spellCasting: {
            cantripsKnown: 3,
            spellbook: [6],
            slots: [4, 2]
        }
    },
    4: {
        proficiencyBonus: 2,
        features: ["Ability Score Improvement"],
        spellCasting: {
            cantripsKnown: 4,
            spellbook: [6],
            slots: [4, 3]
        }
    },
    5: {
        proficiencyBonus: 2,
        features: [],
        spellCasting: {
            cantripsKnown: 4,
            spellbook: [6],
            slots: [4, 3, 2]
        }
    },
    subClasses: {
        "Abjuration": {
            2: {
                features: ["Abjuration Savant", "Arcane Ward"]
            },
            6: {
                features: ["Projected Ward"]
            },
            10: {
                features: ["Improved Abjuration"]
            },
            14: {
                features: ["Spell Resistance"]
            }
        },
        "Conjuration": {
            2: {
                features: ["Conjuration Savant", "Minor Conjuration"]
            },
            6: {
                features: ["Benign Transposition"]
            },
            10: {
                features: ["Focused Conjuration"]
            },
            14: {
                features: ["Durable Summons"]
            }
        },
        "Divination": {
            2: {
                features: ["Divination Savant", "Portent"]
            },
            6: {
                features: ["Expert Divination"]
            },
            10: {
                features: ["The Third Eye"]
            },
            14: {
                features: ["Greater Portent"]
            }
        },
        "Enchantment": {
            2: {
                features: ["Enchantment Savant", "Hypnotic Gaze"]
            },
            6: {
                features: ["Instinctive Charm"]
            },
            10: {
                features: ["Split Enchantment"]
            },
            14: {
                features: ["Alter Memories"]
            }
        },
        "Evocation": {
            2: {
                features: ["Evocation Savant", "Sculpt Spells"]
            },
            6: {
                features: ["Potent Cantrip"]
            },
            10: {
                features: ["Empowered Evocation"]
            },
            14: {
                features: ["Overchannel"]
            }
        },
        "Illusion": {
            2: {
                features: ["Illusion Savant", "Improved Minor Illusion"]
            },
            6: {
                features: ["Malleable Illusions"]
            },
            10: {
                features:  ["Illusory Self"]
            },
            14: {
                features: ["Illusory Reality"]
            }
        },
        "Necromancy": {
            2: {
                features: ["Necromancy Savant", "Grim Harvest"]
            },
            6: {
                features: ["Undead Thralls"]
            },
            10: {
                features: ["Injured to Undeath"]
            },
            14: {
                features: ["Command Undead"]
            }
        },
        "Transmutation": {
            2: {
                features: ["Transmutation Savant", "Minor Alchemy"]
            },
            6: {
                features: ["Transmuter's Stone"]
            },
            10: {
                features: ["Shapechanger"]
            },
            14: {
                features: ["Master Transmuter"]
            }
        }
    },
    subClasses2: {}
}

export { 
    bard,
    cleric,
    druid,
    fighter,
    monk,
    paladin,
    rogue,
    ranger,
    sorcerer,
    warlock,
    wizard
}
export default barbarian