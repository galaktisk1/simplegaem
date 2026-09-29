class PlayerGameObject extends GameObject {
    constructor() {
        super("Player")
        this.addComponent(new PlayerUpdateComponent())
        this.addComponent(new MovementComponent())
        // player circle
        this.addComponent(new Circle(), {
            fillStyle: "grey", 
            radius: 50
        })
        // lantern
        this.addComponent(new Polygon(), {
            fillStyle: "yellow", points: [
                new Vector2(-48, -10),
                new Vector2(-28, -10),
                new Vector2(-28, 10),
                new Vector2(-48, 10),
            ]
        })
        // health probably doesnt either
        this.addComponent(new Health())
        // inventory currently doesnt persist between scenes
        this.addComponent(new Inventory())
    }
}
