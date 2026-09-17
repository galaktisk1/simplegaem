class KeyGameObject extends GameObject {
    constructor() {
        super("Key")
        this.itemDef = itemLibrary.getDefinition("key")
        this.addComponent(new Polygon(), {
            fillstyle: 'gold',
            points: [
                new Vector2(0, 0),
                new Vector2(40, 0),
                new Vector2(40, 40),
                new Vector2(0, 40),
            ],
        })
        this.addComponent(new ItemPickupComponent())
    }
}
