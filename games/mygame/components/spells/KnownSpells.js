class KnownSpells extends Component {
    spells = []

    start() {
        const attributes = this.gameObject.getComponent(Attributes)
        
        if (!attributes || attributes.maxSpellPoints <= 0) return

        this.spells = [
            Spellbook.heal,
            Spellbook.fireDart,
            Spellbook.fireball,
        ]
    }

    add(spell) {
        this.spells.push(spell)
    }
    knows(spell) {
        return this.spells.includes(spell)
    }

}