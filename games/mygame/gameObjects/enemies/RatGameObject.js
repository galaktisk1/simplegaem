// setting up basic enemies, this will be replaced with an interchangeable enemy system later
class RatGameObject extends GameObject{
    constructor(){
        super("RatGameObject")
        this.addComponent(new Polygon(), { fillStyle: "gray", points: Assets.triangle })
        this.addComponent(new Health())
        this.addComponent(new MovementComponent())
        this.addComponent(new RatController())
        this.transform.scale = new Vector2(15, 15)
    }
}