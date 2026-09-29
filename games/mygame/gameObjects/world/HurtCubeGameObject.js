class HurtCubeGameObject extends GameObject{
    constructor(){
        super("HurtCubeGameObject")
        this.addComponent(new Polygon(), {fillStyle: "red", points:Assets.square})
        this.addComponent(new HurtCubeController())
        this.transform.scale = new Vector2(25, 25)
    }
}