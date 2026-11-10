class UITextGameObject extends GameObject {
    constructor() {
        super("txt", ["txt"], "UI")
        this.addComponent(new RectTransform(), { sizeDelta: new Vector2(300, 30) })
        this.addComponent(new UIText())
    }
}