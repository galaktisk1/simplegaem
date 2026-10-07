class GenericLevel extends Scene {
    constructor() {
        super()
        let main = this.instantiate(new MainGameObject(), new Vector2(300, 300))
        this.instantiate(new PointsGameObject(), new Vector2(10, 10))
        // Camera.main.backgroundColor = "cyan"
        let helper = this.instantiate(new HelperGameObject(), new Vector2(2, 1))

        helper.transform.setParent(main.transform)
    }
}