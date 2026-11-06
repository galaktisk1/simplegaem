class ItemBagGameObject extends GameObject{
    // items: [{ itemDef, amount }], leave empty for the test bag
    constructor(items){
        super("ItemBagGameObject", [], "items")
        this.items = items
        this.addComponent(new Polygon(), {fillStyle: "brown", points:Assets.triangle})
        this.addComponent(new Inventory())
        this.addComponent(new Collider(), {isTrigger: true})
        this.addComponent(new ItemBagController())
        this.transform.scale = new Vector2(30, 30)
    }
}
