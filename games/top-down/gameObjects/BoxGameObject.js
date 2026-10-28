class BoxGameObject extends GameObject{
    constructor(){
        super("BoxGameObject")
        this.addComponent(new Polygon(), { fillStyle: "orange", points: Assets.square })
        this.addComponent(new Collider())
        this.addComponent(new Rigidbody())
        // this.addComponent(new BoxController())
        this.transform.scale = new Vector2(11, 11)
    }
}