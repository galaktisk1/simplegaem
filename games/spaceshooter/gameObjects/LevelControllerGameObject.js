class LevelControllerGameObject extends GameObject {
    constructor() {
        super("LevelController")
        this.addComponent(new LevelController())
    }
}