class AttributeRowController extends Component {
    attributeName = ""

    start() {
        this.label = this.gameObject.getComponent(TextLabel)
        this.attributes = GameObject.find("CharacterCreator").getComponent(Attributes)
        this.displayName = this.attributeName[0].toUpperCase() + this.attributeName.slice(1)
    }

    update() {
        this.label.text = `${this.displayName}   ${this.attributes[this.attributeName]}`
    }

    onMouseEnter() {
        this.label.fillStyle = "gold"
    }

    onMouseExit() {
        this.label.fillStyle = "white"
    }

    // click to spend one bonus point here, attributes cap at 100
    onMouseOver() {
        if (!Input.getMouseButtonDown(0)) return
        const attributes = this.attributes
        if (attributes.bonusPoints <= 0 || attributes[this.attributeName] >= 100) return
        attributes[this.attributeName]++
        attributes.bonusPoints--
    }
}
