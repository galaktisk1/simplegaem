class KnownSpells extends Component {
    spells = []

    awake() {
        this.attributes = this.gameObject.getComponent(Attributes)
    }

    start() {
        if (!this.attributes || this.attributes.maxSpellPoints <= 0) return

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