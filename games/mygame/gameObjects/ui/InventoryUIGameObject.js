class InventoryUIGameObject extends GameObject {
    constructor() {
        super("InventoryUI", [], "UI")
        this.addComponent(new InventoryUI())
    }
}