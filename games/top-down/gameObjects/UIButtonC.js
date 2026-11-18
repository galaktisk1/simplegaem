class UIButtonC extends RectGameObject{
    constructor(){
        super("UIButtonC", [], "default")
        this.addComponent(new Polygon(), {fillStyle: 'purple', points: Assets.square, alpha: 0.5})
        //this.addComponent(new Collider())
        //this.addComponent(new RigidBody())
        //this.addComponent(new UIButtonController)
        //this.transform.scale = new Vector2(1,1)
    }
}
