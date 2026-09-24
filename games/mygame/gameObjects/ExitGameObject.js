class ExitGameObject extends GameObject{
    constructor() {
        super("Exit", ["Exit"])
        this.addComponent(new Polygon(), {
            fillStyle: 'red',
            points: Assets.square
        })
        this.addComponent(new ExitComponent())
    }
}
