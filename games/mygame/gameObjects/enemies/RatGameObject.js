// setting up basic enemies, this will be replaced with an interchangeable enemy system later
class RatGameObject extends GameObject{
    constructor(){
        super("RatGameObject", [], "characters")
        // little pink tail for the rat
        this.addComponent(new Polygon(), {
            fillStyle: "pink",
            points: [
                new Vector2(-0.15, 0.8),
                new Vector2(0.15, 0.8),
                new Vector2(0.2, 1.6),
                new Vector2(0.6, 2.2),
                new Vector2(0.5, 2.3),
                new Vector2(-0.05, 1.7)
            ]
        })
        // rat body
        this.addComponent(new Polygon(), { fillStyle: "gray", points: Assets.triangle })
        
        this.addComponent(new Health())
        this.addComponent(new MovementComponent())
        this.addComponent(new RatController())
        this.transform.scale = new Vector2(15, 15)
    }
}
