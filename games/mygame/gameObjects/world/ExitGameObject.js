class ExitGameObject extends GameObject {
    constructor() {
        super("Exit", ["Exit"], "world")
        this.addComponent(new Polygon(), {
            fillStyle: 'blue',
            points: Assets.square
        })
        this.addComponent(new Collider(), { isTrigger: true })
        this.addComponent(new ExitComponent())
    }
}
