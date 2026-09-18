class PlayerGameObject extends GameObject {
    constructor() {
        super("Player")
        this.addComponent(new PlayerUpdateComponent())
        this.addComponent(new MovementComponent())
        // player circle
        this.addComponent(new Circle(), {
            fillstyle: "grey", 
            radius: 50
        })
        // lantern
        this.addComponent(new Polygon(), {
            fillstyle: "yellow", points: [
                new Vector2(-48, -10),
                new Vector2(-28, -10),
                new Vector2(-28, 10),
                new Vector2(-48, 10),
            ]
        })
        this.addComponent(new Health())
        this.addComponent(new Inventory())
    }
}
