class TooltipManagerGameObject extends GameObject {
    constructor() {
        super("TooltipManagerGameObject", [], "background")
        this.addComponent(new TooltipManager())
    }
}