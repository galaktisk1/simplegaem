class CharacterCreatorUI extends Component {
    start() {
        this.attributes = this.gameObject.getComponent(Attributes)
        this.health = this.gameObject.getComponent(Health)
        this.attributes.rollCharacter()

        // build the screen out of text objects, update() places them
        this.title = this.makeText("txtTitle", { text: "Character Creator", font: "bold 32px Arial" })
        this.classText = this.makeText("txtClass")
        this.pointsText = this.makeText("txtPoints")
        this.healthText = this.makeText("txtHealth")
        this.hint = this.makeText("txtHint", {
            text: "Click an attribute to add a point, R to reroll, Enter to begin",
            font: "16px Arial",
        })

        // one clickable row per attribute
        this.rows = Attributes.NAMES.map(name => {
            const row = instantiate(new AttributeRowGameObject())
            row.name = "Row" + name
            row.getComponent(AttributeRowController).attributeName = name
            return row
        })
    }

    // instantiate a centred text prefab, then set its name and label, the way you would in Unity
    makeText(name, label = {}) {
        const text = instantiate(new UITextGameObject())
        text.name = name
        Object.assign(text.getComponent(TextLabel), { textAlign: "center", ...label })
        return text
    }

    update() {
        this.layout()

        this.classText.getComponent(TextLabel).text = `Class: ${this.attributes.characterClass.name}`
        this.pointsText.getComponent(TextLabel).text = `Bonus points: ${this.attributes.bonusPoints}`
        this.healthText.getComponent(TextLabel).text = `Max health: ${this.health.maxHealth}`

        if (Input.getKeyDown("KeyR")) {
            // rollCharacter adds its 4d6 onto bonusPoints, so clear them first
            this.attributes.bonusPoints = 0
            this.attributes.rollCharacter()
        }

        // Arena makes you spend every point before starting
        if (Input.getKeyDown("Enter") && this.attributes.bonusPoints === 0) {
            GameSession.playerattributes = this.attributes.save()
            GameSession.playermaxhealth = this.health.maxHealth
            GameSession.playerhealth = this.health.maxHealth
            SceneManager.loadScene(TestRoom)
        }
    }

    // anchor everything to the canvas every frame, it is resized after start and with the window
    layout() {
        const centre = Engine.canvas.width / 2
        this.title.transform.position = new Vector2(centre, 48)
        this.classText.transform.position = new Vector2(centre, 82)
        this.pointsText.transform.position = new Vector2(centre, 112)
        this.healthText.transform.position = new Vector2(centre, 138)
        this.hint.transform.position = new Vector2(centre, Engine.canvas.height - 24)
        this.rows.forEach((row, i) => {
            row.transform.position = new Vector2(centre - 125, 190 + i * 32)
        })
    }
}
