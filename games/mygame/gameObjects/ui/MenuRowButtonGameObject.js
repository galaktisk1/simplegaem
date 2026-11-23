class MenuRowButtonGameObject extends GameObject {
    constructor() {
        super("MenuRowButton", ["button"], "UI")
        
        // add a rect transform , anchored to the top center of the parent
        this.addComponent(new RectTransform(), {
            anchorMin: Vector2.bottomCenter,
            anchorMax: Vector2.bottomCenter,
            pivot: Vector2.bottomCenter,
            sizeDelta: new Vector2(200, 32),
        })
        
        // add a transparent image for the button background
        this.addComponent(new UIImage(), { color: Color.from32(0, 0, 0, 0) })
        const button = this.addComponent(new UIButton())
        button.normalColor = Color.from32(0, 0, 0, 0)
        button.highlightedColor = Color.from32(255, 255, 255, 40)
        button.pressedColor = Color.from32(0, 0, 0, 0)
        
        // add the text component for the button label
        this.addComponent(new UIText(), {
            horizontal: "center",
            vertical: "middle",
            color: Color.white,
        })
    }
}