class TooltipManager extends Component {
    start() {
        this.label = new TextLabel()
        this.label.text = ""
        this.tooltip = new GameObject("Tooltip", [], "ui")
        this.tooltip.addComponent(this.label)
        SceneManager.currentScene.instantiate(this.tooltip)
    }
    update() {
        const mousePos = SceneManager.currentScene.mouseWorldPosition
        if (!mousePos || !this.tooltip) return
        this.tooltip.transform.position = mousePos.plus(new Vector2(0, -20))
        const label = this.tooltip.getComponent(TextLabel)
        label.text = this.pendingText || ""   
        this.pendingText = ""                      
    }
    show(text) { this.pendingText = text }
}