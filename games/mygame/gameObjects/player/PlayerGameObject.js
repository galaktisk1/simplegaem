class PlayerGameObject extends GameObject {
    constructor() {
        super("Player", [], "characters")
        this.addComponent(new PlayerUpdateComponent())
        this.addComponent(new MovementComponent())
        // player circle
        this.addComponent(new Circle(), {
            fillStyle: "grey", 
            radius: 75
        })
        // health probably doesnt either
        this.addComponent(new Health())
        // inventory currently doesnt persist between scenes
        this.addComponent(new Inventory())
    }
}
