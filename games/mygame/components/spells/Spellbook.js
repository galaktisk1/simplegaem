const Spellbook = {
    // formula for a spell is 
    // name, 
    // cost, 
    // target (caster|touch|range|area_caster|area_range), 
    // save, 
    // (opt) radius, 
    // effects[]
    
    heal: {
        name: "Heal",
        cost: 125,
        target: "caster", // cast on self
        save: null,
        effects: [
            { type: "heal", attribute: "health", min: 1, max: 15, perLevelMin: 1, perLevelMax: 5 },
        ],
    },
    fireDart: {
        name: "Fire Dart",
        cost: 164, // how much it costs to buy from a vendor
        target: "range", // cast on a target at range, only hits one target
        save: "fire", // this tells the spell which resistance table the target rolls when this spell hits them
        effects: [
            { type: "damage", attribute: "health", min: 1, max: 2, perLevelMin: 3, perLevelMax: 4 },
        ],
    },
    fireball: {
        name: "Fireball",
        cost: 325,
        target: "area_range",
        save: "fire",
        radius: 120,
        effects: [
            { type: "damage", attribute: "health", min: 1, max: 1, perLevelMin: 4, perLevelMax: 12 },
        ],
    },
};