class Spell {
    static castCost(spell, level) {
        return Math.floor(spell.cost / level)
    }
    
    static rollRange(min, max) {
        return min + GameSession.randomE.nextInt(max - min + 1)
    }
    
    static rollAmount(effect, level) {
        const base = Spell.rollRange(effect.min, effect.max)
        const perLevel = Spell.rollRange(effect.perLevelMin, effect.perLevelMax)
        return base + level * perLevel
    }
}