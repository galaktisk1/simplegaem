class CharacterCreatorUI extends Component {
    attributes
    health
    mode = "create"
    // attr index → same y as that primary; col 0|1 = left/right derived pair
    static DERIVED = [
        { i: 0, col: 0, label: "Damage:", key: "bonusDamage", fmt: true },
        { i: 0, col: 1, label: "Max Kilos:", key: "maxKilos", fmt: false },
        { i: 1, col: 0, label: "Spell Pts:", key: "spellPts", fmt: false },
        { i: 2, col: 0, label: "Magic Def:", key: "magicDefense", fmt: true },
        { i: 3, col: 0, label: "To Hit:", key: "bonusToHit", fmt: true },
        { i: 3, col: 1, label: "To Defend:", key: "bonusToDefend", fmt: true },
        { i: 5, col: 0, label: "Health:", key: "bonusToHealth", fmt: true },
        { i: 5, col: 1, label: "Heal Mod:", key: "healMod", fmt: true },
        { i: 6, col: 0, label: "Charisma:", key: "charisma", fmt: true },
    ]

    start() {
        if (this.mode === "create")
            this.attributes.rollCharacter()
        if (this.mode === "levelUp") Time.timeScale = 0
        if (this.mode === "sheet") Time.timeScale = 0
        this.rolled = this.attributes.save()

        const gold = Color.from32(255, 200, 80)
        const white = Color.white


        this.panel = SceneManager.currentScene.instantiate(new UIPanelGameObject())
        const leftX = 24
        const attrValueX = 90
        const minusX = 130
        const plusX = 165
        const row0 = 160
        const attrStep = 28
        const styleATTR = { font: "20px Arial", color: gold }
        const styleVALUE = { font: "20px Arial", color: white }

        // get the attributes on screen with their buttons
        this.rows = Attributes.NAMES.map((name, i) => {
            // set up what a row looks like
            const row = {}
            const y = row0 + i * attrStep
            const abbr = name.slice(0, 3).replace(/^./, c => c.toUpperCase())
            row.text = this.buildText(abbr, Vector2.topLeft, new Vector2(leftX, y), {
                ...styleATTR
            })
            row.value = this.buildText("", Vector2.topLeft, new Vector2(attrValueX, y), {
                ...styleVALUE
            })
            if (this.mode !== "sheet") {
                row.minus = this.buildButton("-", Vector2.topLeft, new Vector2(minusX, y))
                row.plus = this.buildButton("+", Vector2.topLeft, new Vector2(plusX, y))
                // add listener to minus button
                // decrease the attribute
                row.minus.getComponent(UIButton).addListener(() => {
                    this.attributes[name]--
                    this.attributes.bonusPoints++
                })

                // add listener to plus button
                // increase the attribute
                row.plus.getComponent(UIButton).addListener(() => {
                    this.attributes[name]++
                    this.attributes.bonusPoints--
                })
            }
            return row
        })

        const dLabelX = [220, 360]
        const dValueX = [300, 440]
        const styleL = { font: "16px Arial", color: gold }
        const styleV = { font: "16px Arial", color: white }

        this.derivedRows = CharacterCreatorUI.DERIVED.map(({ i, col, label }) => {
            const y = row0 + i * attrStep + 8
            return {
                label: this.buildText(label, Vector2.topLeft, new Vector2(dLabelX[col], y), styleL),
                value: this.buildText("", Vector2.topLeft, new Vector2(dValueX[col], y), styleV),
            }
        })

        const bonusY = row0 + 8 * attrStep + 20
        this.pointsText = this.buildText("", Vector2.topLeft, new Vector2(leftX, bonusY), {
            ...styleATTR,
            font: "bold 20px Arial",
        })

        this.classText = this.buildText("", Vector2.topLeft, new Vector2(leftX, 24), {
            font: "20px Arial",
        })
        this.title = this.buildText(
            this.mode === "sheet" ? "Character Sheet" : this.mode === "levelUp" ? "Level Up!" : "Character Creator",
            Vector2.topLeft, new Vector2(leftX, 48),
            { font: "16px Arial" }
        )

        // VITAL STATS ROWS
        this.vitalRows = []
        const vitalLabels = 4
        for (let i = 0; i < vitalLabels; i++) {
            this.vitalRows.push(
                this.buildText("", Vector2.bottomLeft, new Vector2(leftX, -80 + i * 22), {
                    font: "16px Arial",
                })
            )
        }
        
        // HINT TEXT
        // text that tells you what to do
        this.hint = this.buildText(
            this.mode === "levelUp"
                ? "Press Enter once all bonus points are spent"
                : "Enter when bonus is 0 — R to reroll",
            Vector2.bottomRight, new Vector2(-leftX, -20),
            { font: "14px Arial", horizontal: "right" }
        )

        // CHARACTER SHEET MODE

        if (this.mode === "sheet") {
            this.doneBtn = this.buildButton("Done", Vector2.bottomLeft, new Vector2(24, -20))
            this.nextBtn = this.buildButton("Next Page", Vector2.bottomRight, new Vector2(-24, -20))
            this.doneBtn.getComponent(UIButton).addListener(() => this.closeSheet())
            // next: stub for now
        }
    }

    init(attributes, health, mode) {
        this.attributes = attributes
        this.health = health
        this.mode = mode
    }

    // make each text object and return it
    // text: the text to display
    // anchor: the anchor point for the text
    // position: the anchored position relative to the anchor
    // textSettings: additional settings for the UIText component
    // returns: the created UITextGameObject
    buildText(text, anchor, position, textSettings = {}) {
        const textGO = SceneManager.currentScene.instantiate(new UITextGameObject())
        textGO.transform.setParent(this.panel.transform)
        const uiText = textGO.getComponent(UIText)
        // same way addComponent assigns properties
        Object.assign(uiText, { text, ...textSettings })

        const rect = textGO.getComponent(RectTransform)
        rect.setPivotAndAnchors(anchor)
        rect.anchoredPosition = position
        return textGO
    }

    // make a button and return it
    // label: the text to display on the button
    // anchor: the anchor point for the button
    // position: the anchored position relative to the anchor
    // returns: the created UIButtonGameObject
    buildButton(label, anchor, position) {
        const buttonGO = SceneManager.currentScene.instantiate(new UIButtonGameObject())
        buttonGO.transform.setParent(this.panel.transform)
        const uiText = buttonGO.getComponent(UIText)
        uiText.text = label

        const rect = buttonGO.getComponent(RectTransform)
        rect.setPivotAndAnchors(anchor)
        rect.anchoredPosition = position
        return buttonGO
    }

    update() {
        // update values
        const a = this.attributes
        this.pointsText.getComponent(UIText).text = `BONUS PTS: ${a.bonusPoints}`
        this.classText.getComponent(UIText).text =
            `${a.characterClass.name}`  // later: name / race / class

        const vitals = [
            `Health: ${this.health.currentHealth}/${this.health.maxHealth}`,
            `Fatigue: ${Math.floor(a.currentFatigue)}/${a.maxFatigue}`,
            `Gold: ${GameSession.gold ?? 0}`,
            `Experience: ${a.currentExperience}`,
            `Level: ${a.level}`,
        ]

        this.vitalRows.forEach((go, i) => {
            go.getComponent(UIText).text = vitals[i]
        })

        /** @param {number} n */
        const fmt = n => (n >= 0 ? `+${n}` : `${n}`)
        this.derivedRows.forEach((row, idx) => {
            const def = CharacterCreatorUI.DERIVED[idx]
            if (!def) return
            let text
            if (def.key === "spellPts")
                text = `${a.currentSpellPoints}/${a.maxSpellPoints}`
            else
                text = def.fmt ? fmt(a[def.key]) : `${a[def.key]}`
            row.value.getComponent(UIText).text = text
        })

        if (!this.rows) return

        // ATTRIBUTE ROWS
        this.rows.forEach(({ value, minus, plus }, i) => {
            const name = Attributes.NAMES[i]
            value.getComponent(UIText).text = this.attributes[name]
            if (minus) minus.getComponent(UIButton).interactable = this.canDecrease(name)
            if (plus) plus.getComponent(UIButton).interactable = this.canIncrease(name)
        })
        
        // REROLL FUNCTIONALITY
        if (this.mode === "create" && Input.getKeyDown("KeyR")) {
            // rollCharacter adds its 4d6 onto bonusPoint
            this.attributes.bonusPoints = 0
            this.attributes.rollCharacter()
            this.rolled = this.attributes.save()
        }

        // Arena makes you spend every point before starting
        if (Input.getKeyDown("Enter") && this.attributes.bonusPoints === 0) {
            if (this.mode === "create") {
                this.attributes.currentFatigue = this.attributes.maxFatigue
                this.attributes.currentSpellPoints = this.attributes.maxSpellPoints
                GameSession.playerattributes = this.attributes.save()
                GameSession.playermaxhealth = this.health.maxHealth
                GameSession.playerhealth = this.health.maxHealth
                SceneManager.loadScene(TestRoom)
            } else if (this.mode === "levelUp") {
                this.closeSheet()
            }
        }
    }

    closeSheet() {
        this.panel.destroy()
        this.gameObject.destroy()
        Time.timeScale = 1
    }

    canIncrease(name) {
        return this.attributes.bonusPoints > 0 && this.attributes[name] < 100
    }

    canDecrease(name) {
        return this.attributes[name] > this.rolled[name]
    }
}
