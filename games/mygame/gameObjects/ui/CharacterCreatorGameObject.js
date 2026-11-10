class CharacterCreatorGameObject extends GameObject {
    constructor() {
        super("CharacterCreator", [], "UI")
        // Health before Attributes, rollCharacter looks it up
        this.addComponent(new Health())
        this.addComponent(new Attributes(), { characterClass: ClassDefinitions.warrior })
        this.addComponent(new CharacterCreatorUI())
    }
}
