class CastAction extends PlayerAction {
    phase
    spell
    buttons = []

    enter() {
        const known = this.controller.player.getComponent(KnownSpells)
        if (!known?.spells.length) {
            this.controller.msgmanager.showMessage("You don't know any spells.")
            return this.controller.setAction("move")
        }
        Time.timeScale = 0
        this.phase = "selectSpell"
        this.openMenu(known)
    }

    update() {
        if (this.phase === "selectSpell" && Input.getKeyDown("Escape")) {
            this.closeMenu()
            Time.timeScale = 1
            return this.controller.setAction("move")
        }
        return false
    }

    exit() {
        this.closeMenu()
        Time.timeScale = 1
    }

    resolve() {
        const attr = this.controller.attributes
        const cost = Spell.castCost(this.spell, attr.level)
        if (attr.currentSpellPoints < cost) {
            this.controller.msgmanager.showMessage("Not enough spell points")
            Time.timeScale = 1
            return this.controller.setAction("move")
        }
        attr.currentSpellPoints -= cost
        Time.timeScale = 1
        if (this.spell.target === "caster") {
            for (const effect of this.spell.effects) {
                if (effect.type === "heal" && effect.attribute === "health") {
                    const amount = Spell.rollAmount(effect, attr.level)
                    this.controller.health.heal(amount)
                }
            }
        }
        this.phase = "recover"
        return this.controller.setAction("move")
    }

    pickSpell(spell) {
        this.spell = spell
        this.closeMenu()
        if (this.spell.target === "caster") return this.resolve() 
        this.phase = "aim"
    }

    // open the spell menu
    openMenu(known) {
        this.panel = SceneManager.currentScene.instantiate(new MenuPanelGameObject())
        this.panel.getComponent(RectTransform).sizeDelta =
            new Vector2(220, 28 + known.spells.length * 36)

        this.buttons = []
        known.spells.forEach((spell, i) => {
            const cost = Spell.castCost(spell, this.controller.attributes.level)
            const btn = SceneManager.currentScene.instantiate(new MenuRowButtonGameObject())
            btn.transform.setParent(this.panel.transform)
            btn.getComponent(UIText).text = `${spell.name} (${cost})`
            btn.getComponent(RectTransform).anchoredPosition = new Vector2(0, -8 - i * 36)
            btn.getComponent(UIButton).addListener(() => this.pickSpell(spell))
            this.buttons.push(btn)
        })
    }

    closeMenu() {
        this.panel?.destroy()
        this.panel = null
        this.buttons = []
    }
}