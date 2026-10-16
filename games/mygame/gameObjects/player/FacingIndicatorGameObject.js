class FacingIndicatorGameObject extends GameObject{
    constructor(){
        super("FacingIndicatorGameObject", [], "characters")
        this.addComponent(new Polygon(), {fillStyle: "white", points:Assets.triangle})
        this.transform.scale = new Vector2(8, 8)
    }
}