class UIPanelGameObject extends GameObject {
    constructor() {
        super("Panel", ["Panel"], "UI")
        // span 65% of the screen width
        this.addComponent(new RectTransform(), { anchorMin: new Vector2(0, 0), anchorMax: new Vector2(0.65, 1), sizeDelta: new Vector2(0, 0) })
        this.addComponent(new UIImage(), { color: Color.from32(40, 85, 105)})
    }
}