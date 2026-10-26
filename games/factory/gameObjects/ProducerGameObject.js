class ProducerGameObject extends GameObject{
    constructor(){
        super("GameObject")
        this.addComponent(new Polygon(), {fillStyle: "red", points:Assets.triangle})
        this.addComponent(new ProducerController())
        this.addComponent(new Inventory())
        this.transform.scale = new Vector2(1, 1)
    }
}