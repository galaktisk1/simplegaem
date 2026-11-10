class TestImageGameObject extends GameObject {
    constructor() {
        super("img", ["img"], "UI")
        this.addComponent(new RectTransform(), { anchorMin: Vector2.topRight, anchorMax: Vector2.topRight, pivot: Vector2.topRight, anchoredPosition: new Vector2(-20, 20) })
        // use Color for colors in UI elements
        this.addComponent(new UIImage(), { color: Color.red })
        this.addComponent(new UIText(), { text: "Hi", horizontal: "center", vertical: "middle" })
        this.addComponent(new UIButton())
    }
}