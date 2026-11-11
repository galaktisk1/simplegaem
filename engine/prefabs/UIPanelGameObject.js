// Prefab UI element for Panel
class UIPanelGameObject extends GameObject {
    constructor() {
        super("Panel", ["Panel"], "UI")
        this.addComponent(new RectTransform(),
            {
                anchorMin: Vector2.zero,
                anchorMax: Vector2.one,
                sizeDelta: Vector2.zero
            })
        this.addComponent(new UIImage())
    }
}