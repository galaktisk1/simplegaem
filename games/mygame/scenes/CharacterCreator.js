class CharacterCreator extends Scene {
    constructor() {
        super("black")
        this.instantiate(new CharacterCreatorGameObject())
    }
}
