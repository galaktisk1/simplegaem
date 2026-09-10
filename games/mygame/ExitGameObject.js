class ExitGameObject extends GameObject{
    constructor() {
        super()
        this.addComponent(new Polygon(), {
            fillstyle: 'red',
            points: [
                new Vector2(0, 0),
                new Vector2(120, 0),
                new Vector2(120, 120),
                new Vector2(0, 120)
            ]
        })
        this.addComponent(new ExitComponent())
    }
}