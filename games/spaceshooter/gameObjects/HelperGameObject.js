class HelperGameObject extends GameObject{
    constructor(){
        super("HelperGameObject",[], "ships")
        this.addComponent(new Polygon(), {fillStyle: "purple", points:Assets.triangle})
        this.transform.scale = new Vector2(0.25, 0.25)
    }
}