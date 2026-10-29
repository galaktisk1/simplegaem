class FollowerGameObject extends GameObject{
    constructor(){
        super("FollowerGameObject", [], "default")
        this.addComponent(new Polygon(), {fillStyle: 'blue', points: Assets.square})
        this.addComponent(new FollowerController)
        this.transform.scale = new Vector2(10,10)
    }
}
