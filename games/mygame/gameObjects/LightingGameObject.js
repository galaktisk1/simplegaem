class LightingGameObject extends GameObject {
    constructor() {
        super("Light")
        // light
        this.addComponent(new Circle(), {
            radius: 300,
            fillStyle: 'rgba(255, 255, 255, 0.1)',
        })
    }
}