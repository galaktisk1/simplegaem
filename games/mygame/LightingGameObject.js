class LightingGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new Circle(), {
            radius: 300,
            fillstyle: ['rgba(255, 255, 255, 0.0)', 'rgba(255, 255, 255, 0.1)'],
            useGradient: true,
        })
    }
}