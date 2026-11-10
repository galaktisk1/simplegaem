class LanternGameObject extends GameObject {
    constructor() {
        super("Lantern", [], "characters")
        this.addComponent(new Circle(), {
            fillStyle: "turquoise",
            radius: 12
        })
        this.addComponent(new LanternGlow())
        this.addComponent(new LanternController())
    }
}
