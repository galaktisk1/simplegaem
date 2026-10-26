class PlayerGameObject extends GameObject {
    constructor() {
        super("Player", [], "characters")
        this.addComponent(new PlayerUpdateComponent())
        this.addComponent(new MovementComponent())
        this.addComponent(new Collider(), {
            points: [
                new Vector2(-75, -75),
                new Vector2(75, -75),
                new Vector2(75, 75),
                new Vector2(-75, 75)
            ]
        })
        this.addComponent(new Circle(), {
            fillStyle: "grey", 
            radius: 75
        })
        this.addComponent(new Health())
        this.addComponent(new Inventory())
        this.addComponent(new Experience())
    }
}
