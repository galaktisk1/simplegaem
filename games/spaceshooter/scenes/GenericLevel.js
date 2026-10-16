class GenericLevel extends Scene {
    constructor() {
        super()
        let main = this.instantiate(new MainGameObject(), new Vector2(300, 300))
        this.instantiate(new PointsGameObject(), new Vector2(10, 10))
        // Camera.main.backgroundColor = "cyan"
        let helper = this.instantiate(new HelperGameObject(), new Vector2(2, 1))

        helper.transform.setParent(main.transform)

        const sceneTimer = new GameObject("SceneTimer", [], "UI")
        sceneTimer.addComponent(new TextLabel(), { fillStyle: "white", font: "30px Times" })
        sceneTimer.addComponent(new SceneTimerController())
        this.instantiate(sceneTimer, new Vector2(10, 50))

        const wrappedText = new GameObject("WrappedText", [], "UI")
        wrappedText.addComponent(new MultiLineTextLabel(), {
            fillStyle: "white",
            font: "30px Times",
            lineHeight: 36,
            text: "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.",
        })
        this.instantiate(wrappedText, new Vector2(10, 100))
    }
}
