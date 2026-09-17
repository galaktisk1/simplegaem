class ExitGameObject extends GameObject{
    constructor() {
        super("Exit")
        this.addComponent(new Polygon(), {
            fillstyle: 'red',
            points: Assets.square
        })
        this.addComponent(new ExitComponent())
    }
}