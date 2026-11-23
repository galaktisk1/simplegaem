class HeldWeaponGameObject extends GameObject {
    constructor() {
        super("HeldWeapon", [], "spells")
        //grip
        this.addComponent(Polygon, {
            points: [new Vector2(-2, -10), new Vector2(2, -10), new Vector2(2, 0), new Vector2(-2, 0)]
        })
        //guard
        this.addComponent(Polygon, {
            points: [new Vector2(-6, -11), new Vector2(6, -11), new Vector2(6, -9), new Vector2(-6, -9)]
        })
        //blade
        this.addComponent(Polygon, {
            points: [new Vector2(-1, -20), new Vector2(1, -20), new Vector2(2, -10), new Vector2(-2, -10)]
        })
    }
}