class UIButtonGameObject extends GameObject {
    constructor() {
        super("button", ["button"], "UI")
        this.addComponent(new RectTransform(), { sizeDelta: new Vector2(28, 28) })
        this.addComponent(new UIImage(), { color: Color.yellow })
        this.addComponent(new UIButton())
        // fill text elsewhere
        this.addComponent(new UIText(), { horizontal: "center", vertical: "middle", color: Color.black })
    }
}