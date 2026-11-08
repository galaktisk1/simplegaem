const WeaponTypes = {
    dagger: { name: "dagger", damageMin: 1, damageMax: 6, weight: 28 },
    shortsword: { name: "shortsword", damageMin: 1, damageMax: 8, weight: 24 },
    wakizashi: { name: "wakizashi", damageMin: 1, damageMax: 10, weight: 4 },
    broadsword: { name: "broadsword", damageMin: 1, damageMax: 12, weight: 14 },
    mace: { name: "mace", damageMin: 1, damageMax: 12, weight: 14 },
    saber: { name: "saber", damageMin: 3, damageMax: 12, weight: 8 },
    longsword: { name: "longsword", damageMin: 2, damageMax: 16, weight: 6 },
    katana: { name: "katana", damageMin: 3, damageMax: 16, weight: 2 },
}
const WeaponMaterials = {
    unnamed: { name: "", addToMin: 0, addToMax: 0, addToHit: 0, weight: 400 },
    // iron is the only one to contain a penalty
    iron: { name: "iron", addToMin: 0, addToMax: -2, addToHit: -1, weight: 250 },
    steel: { name: "steel", addToMin: 0, addToMax: 0, addToHit: 0, weight: 150 },
    // identical to steel in terms of stats but has an effect on undead
    silver: { name: "silver", addToMin: 0, addToMax: 0, addToHit: 0, weight: 100 },
    elven: { name: "elven", addToMin: 1, addToMax: 1, addToHit: 1, weight: 50 },
    dwarven: { name: "dwarven", addToMin: 2, addToMax: 2, addToHit: 2, weight: 30 },
    mithril: { name: "mithril", addToMin: 3, addToMax: 3, addToHit: 3, weight: 12 },
    adamantium: { name: "adamantium", addToMin: 4, addToMax: 4, addToHit: 4, weight: 6 },
    ebony: { name: "ebony", addToMin: 5, addToMax: 5, addToHit: 5, weight: 2 }
}

// make the weapon from the two tables
// currently a weapon can be made twice, ill need a way to ensure uniqueness between generations
function generateWeapon(random = GameSession.randomL) {
    const weaponType = random.nextWeighted(WeaponTypes);
    const weaponMaterial = random.nextWeighted(WeaponMaterials);
    const id = `${weaponMaterial.name ? weaponMaterial.name + "_" : ""}${weaponType.name}`
    itemLibrary.defs[id] ??= {
        name: `${weaponMaterial.name} ${weaponType.name}`.trim(),
        id,
        type: weaponType,
        stackable: false,
        material: weaponMaterial,
        damageMin: weaponType.damageMin + weaponMaterial.addToMin,
        damageMax: weaponType.damageMax + weaponMaterial.addToMax,
        hitBonus: weaponMaterial.addToHit
    };
    return itemLibrary.defs[id];
}