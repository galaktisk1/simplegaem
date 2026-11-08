class DirectorGameObject extends GameObject {
    constructor() {
        super("Director")
        this.addComponent(new Director())
    }
}