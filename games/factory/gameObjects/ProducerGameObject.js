class ProducerGameObject extends GameObject{
    // miner game object that will mine below on the grid
    constructor() {
        super("ProducerGameObject", ["Producer"], "machines")
        this.addComponent(new Polygon(), {fillStyle: "red", points:Assets.triangle})
        this.addComponent(new ProducerController())
        this.addComponent(new Inventory())
        this.transform.scale = new Vector2(1, 1)
    }
}