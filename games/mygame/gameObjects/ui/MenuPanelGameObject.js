class MenuPanelGameObject extends GameObject {
    constructor() {
        super("MenuPanel", ["Panel"], "UI")
        let rect = this.addComponent(new RectTransform())
        rect.pivot = Vector2.bottomRight
        rect.setInsetAndSizeFromParentEdge(RectTransform.edge.right, 20, 220)
        rect.setInsetAndSizeFromParentEdge(RectTransform.edge.bottom, 20, 160)
        this.addComponent(new UIImage(), { color: Color.from32(20, 20, 20, 220) })
    }
}