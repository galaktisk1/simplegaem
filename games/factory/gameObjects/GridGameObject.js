class GridGameObject extends GameObject{
    constructor(){
        super("Grid", ["Grid"], "background")
        this.addComponent(new GridComponent())
        this.addComponent(new Collider(), {
            points: [
                new Vector2(0, 0),
                new Vector2(600, 0),
                new Vector2(600, 400),
                new Vector2(0, 400)
            ]
            })
    }
}