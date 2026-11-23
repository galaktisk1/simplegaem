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
        let panelRect = this.panel.getComponent(RectTransform)
        const pad = 8
        const rowHeight = 36
        let y = pad

        this.buttons = []
        for (const spell of known.spells) {
            const cost = Spell.castCost(spell, this.controller.attributes.level)
            const btn = SceneManager.currentScene.instantiate(new MenuRowButtonGameObject())
            btn.transform.setParent(this.panel.transform)
            
            const btnRect = btn.getComponent(RectTransform)
            btnRect.setSizeWithCurrentAnchors(RectTransform.axis.horizontal, panelRect.rect.width - 20)
            btnRect.anchoredPosition = new Vector2(0, y)

            btn.getComponent(UIText).text = `${spell.name} (${cost})`
            const canCast = this.controller.attributes.currentSpellPoints >= cost
            const button = btn.getComponent(UIButton)
            button.interactable = canCast
            if (canCast) button.addListener(() => this.pickSpell(spell))
            
            this.buttons.push(button)
            y = btnRect.localBottom + pad
        }
        panelRect.setSizeWithCurrentAnchors(
            RectTransform.axis.vertical,
            y + pad
        )
    }

    closeMenu() {
        this.panel?.destroy()
        this.panel = null
        this.buttons = []
    }
}