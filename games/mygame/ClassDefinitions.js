class ClassDefinitions {

    static thief = {
        // in place of an actual race system, the thief is based on the male Khajiit from Elder Scrolls Arena
        name: "Thief",
        experienceTable: "A",
        experienceStart: 800,
        healthDie: 14,
        baseAttributes: {
            STR: 40,
            INT: 40,
            WIL: 30,
            AGI: 50,
            SPD: 40,
            END: 30,
            PER: 40,
            LUC: 50,
        },
        critChancePerLevel: 0.02, // 2% per level
        allowedWeapons: ["dagger", "shortsword", "broadsword", "saber"],
        startingWeapon: "shortsword",
        spellPoints: 0
    }

    static warrior = {
        // in place of an actual race system, the warrior is based on the male Redguard from Elder Scrolls Arena
        name: "Warrior",
        experienceTable: "B",
        experienceStart: 900,
        healthDie: 20,
        baseAttributes: {
            STR: 40,
            INT: 30,
            WIL: 30,
            AGI: 40,
            SPD: 50,
            END: 50,
            PER: 40,
            LUC: 40,
        },
        critChancePerLevel: 0.00, // 0% per level
        allowedWeapons: ["all"],
        startingWeapon: "broadsword",
        spellPoints: 0,
    }

    static mage = {
        // in place of an actual race system, the mage is based on the male Breton from Elder Scrolls Arena
        name: "Mage",
        experienceTable: "C",
        experienceStart: 1000,
        healthDie: 6,
        baseAttributes: {
            STR: 30,
            INT: 50,
            WIL: 50,
            AGI: 40,
            SPD: 40,
            END: 30,
            PER: 40,
            LUC: 40,
        },
        critChancePerLevel: 0.00, // 0% per level
        allowedWeapons: ["dagger", "staff"],
        startingWeapon: "dagger",
        spellPoints: 2, // 2 * INT modifier
    }

}