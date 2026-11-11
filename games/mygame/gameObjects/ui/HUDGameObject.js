class HUDGameObject extends GameObject {
    constructor() {
        super("HUD", [], "UI")
        this.addComponent(new HUDController())
    }
}