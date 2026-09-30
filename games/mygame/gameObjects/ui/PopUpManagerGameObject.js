class PopUpManagerGameObject extends GameObject {
    constructor() {
        super("PopUpManager")
        this.addComponent(new PopUpManager())
    }
}
