class CharacterCreator extends Scene {
    constructor() {
        super("black")
        const standin = this.instantiate(new CharacterCreatorGameObject())
        this.instantiate(new StatsScreenGameObject()).getComponent(CharacterCreatorUI).init(
            standin.getComponent(Attributes),
            standin.getComponent(Health),
            "create"
        )
    }
}
