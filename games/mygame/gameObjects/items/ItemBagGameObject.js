class ItemBagGameObject extends GameObject{
    constructor(){
        super("ItemBagGameObject")
        // TODO: Replace the triangle with a bag shape when ready.
        this.addComponent(new Polygon(), {fillStyle: "brown", points:Assets.triangle})
        this.addComponent(new Inventory())
        this.addComponent(new ItemBagController())
        this.transform.scale = new Vector2(30, 30)
    }
}
