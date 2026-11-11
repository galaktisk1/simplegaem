// Prefab UI element for Button
class UIButtonGameObject extends GameObject {
    constructor() {
        super("button", ["button"], "UI")
        this.addComponent(new RectTransform())
        this.addComponent(new UIButton())

        const text = new GameObject("Text", ["text"], "UI")
        text.addComponent(new UIText(),
            {
                text: "Button",
                horizontal: "center",
                vertical: "middle"
            })

        // place the text as a child of the button and stretch it to fit
        const rect = text.transform
        rect.anchorMin = Vector2.zero
        rect.anchorMax = Vector2.one
        rect.sizeDelta = Vector2.zero

        text.transform.setParent(this.transform)
    }
}