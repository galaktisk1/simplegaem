class StatsScreenGameObject extends GameObject {
    constructor() {
        super("StatsScreen", [], "UI")
        this.addComponent(new CharacterCreatorUI())
    }
}