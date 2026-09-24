class ExitGameObject extends GameObject{
    constructor() {
        super("Exit", ["Exit"])
        this.addComponent(new Polygon(), {
            fillStyle: 'blue',
            points: Assets.square
        })
        this.addComponent(new ExitComponent())
    }
}
