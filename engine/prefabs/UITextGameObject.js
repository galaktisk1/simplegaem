// Prefab UI element for Text
class UITextGameObject extends GameObject {
    constructor() {
        super("txt", ["txt"], "UI")
        
        this.addComponent(new RectTransform(),
            {
                // this size delta is a preset size for the text element
                sizeDelta: new Vector2(300, 30)
            })
        this.addComponent(new UIText())
    }
}