class ConveyorBeltGameObject extends GameObject{
    constructor(){
        super("ConveyorBeltGameObject", ["ConveyorBelt"], "machines")
        this.addComponent(new Polygon(), {fillStyle: "gray", points:Assets.square})
        this.addComponent(new ConveyorBeltController())
        this.transform.scale = new Vector2(1, 1)
    }
}