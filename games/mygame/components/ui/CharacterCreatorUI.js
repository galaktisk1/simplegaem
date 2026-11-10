class CharacterCreatorUI extends Component {
    attributes = null
    health = null
    mode = "create"
    
    start() {
        if(this.mode === "create") 
            this.attributes.rollCharacter()
        if (this.mode === "levelUp") Time.timeScale = 0
        this.rolled = this.attributes.save()


        this.panel = SceneManager.currentScene.instantiate(new UIPanelGameObject())

        // get the attributes on screen with their buttons
        this.rows = Attributes.NAMES.map((name, i) => {
            // set up what a row looks like
            const row = {}
            row.text = this.buildText("", Vector2.topCenter, new Vector2(0, 180 + i * 32), { font: "20px Arial" })
            row.minus = this.buildButton("-", Vector2.topCenter, new Vector2(100, 180 + i * 32))
            row.plus = this.buildButton("+", Vector2.topCenter, new Vector2(135, 180 + i * 32))
            
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
            return row
        })

        // build the title and other UI elements
        this.title = this.buildText(this.mode === "levelUp" ? "Level Up!" : "Character Creator", Vector2.topCenter, new Vector2(0, 20), { font: "bold 32px Arial", horizontal: "center" })
        this.classText = this.buildText("", Vector2.topCenter, new Vector2(0, 70), { font: "20px Arial", horizontal: "center" })
        this.pointsText = this.buildText("", Vector2.topCenter, new Vector2(0, 100), { font: "20px Arial", horizontal: "center" })
        this.healthText = this.buildText("", Vector2.topCenter, new Vector2(0, 130), { font: "20px Arial", horizontal: "center" })
        this._ = this.buildText(this.mode === "levelUp" ? "Press Enter once all bonus points are spent" : "Press Enter once all bonus points are spent, Press R to reroll", Vector2.bottomCenter, new Vector2(0, -20), { font: "20px Arial", horizontal: "center" })
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
        Object.assign(rect, {
            anchorMax: anchor.clone(),
            anchorMin: anchor.clone(),
            pivot: anchor.clone(),
            anchoredPosition: position
        })
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
        Object.assign(rect, {
            anchorMax: anchor.clone(),
            anchorMin: anchor.clone(),
            pivot: anchor.clone(),
            anchoredPosition: position
        })
        return buttonGO
    }

    update() {
        // update values
        this.classText.getComponent(UIText).text = `Class: ${this.attributes.characterClass.name}`
        this.pointsText.getComponent(UIText).text = `Bonus points: ${this.attributes.bonusPoints}`
        this.healthText.getComponent(UIText).text = `Max health: ${this.health.maxHealth}`

        if (!this.rows) return

        this.rows.forEach(({ text, minus, plus }, i) => {
            const name = Attributes.NAMES[i]
            text.getComponent(UIText).text = `${name[0].toUpperCase() + name.slice(1)}: ${this.attributes[name]}`
            minus.getComponent(UIButton).interactable = this.canDecrease(name)
            plus.getComponent(UIButton).interactable = this.canIncrease(name)
        })

        if (this.mode === "create" && Input.getKeyDown("KeyR")) {
            // rollCharacter adds its 4d6 onto bonusPoint
            this.attributes.bonusPoints = 0
            this.attributes.rollCharacter()
            this.rolled = this.attributes.save()
        }

        // Arena makes you spend every point before starting
        if (Input.getKeyDown("Enter") && this.attributes.bonusPoints === 0) {
            if (this.mode === "create") {
                GameSession.playerattributes = this.attributes.save()
                GameSession.playermaxhealth = this.health.maxHealth
                GameSession.playerhealth = this.health.maxHealth
                SceneManager.loadScene(TestRoom)
            } else if (this.mode === "levelUp") {
                this.panel.destroy()
                this.gameObject.destroy()
                Time.timeScale = 1
            }
        }
    }

    canIncrease(name) {
        return this.attributes.bonusPoints > 0 && this.attributes[name] < 100
    }
    
    canDecrease(name) {
        return this.attributes[name] > this.rolled[name]
    }
}
