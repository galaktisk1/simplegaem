// loot bag prefab, ItemBagController.init(items) fills it, without init it becomes the test bag
class ItemBagGameObject extends GameObject {
    constructor() {
        super("ItemBagGameObject", [], "items")
        this.addComponent(new Polygon(), { fillStyle: "brown", points: Assets.triangle })
        this.addComponent(new Inventory())
        this.addComponent(new Collider(), { isTrigger: true })
        this.addComponent(new ItemBagController())
        this.transform.scale = new Vector2(30, 30)
    }
}
