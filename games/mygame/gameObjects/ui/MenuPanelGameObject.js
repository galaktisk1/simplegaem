class MenuPanelGameObject extends GameObject {
    constructor() {
        super("MenuPanel", ["Panel"], "UI")
        this.addComponent(new RectTransform(), {
            anchorMin: Vector2.bottomRight,
            anchorMax: Vector2.bottomRight,
            pivot: Vector2.bottomRight,
            anchoredPosition: new Vector2(-20, -20),
            sizeDelta: new Vector2(220, 160),
        })
        this.addComponent(new UIImage(), { color: Color.from32(20, 20, 20, 220) })
    }
}