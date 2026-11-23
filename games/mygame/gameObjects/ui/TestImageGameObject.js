class TestImageGameObject extends GameObject {
    constructor() {
        super("img", ["img"], "UI")
        let rect = this.addComponent(new RectTransform())
        rect.setPivotAndAnchors(Vector2.topRight)
        rect.anchoredPosition = new Vector2(-20, 20)
        // use Color for colors in UI elements
        this.addComponent(new UIImage(), { color: Color.red })
        this.addComponent(new UIText(), { text: "Hi", horizontal: "center", vertical: "middle" })
        this.addComponent(new UIButton())
    }
}