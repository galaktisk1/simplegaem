class CharacterCreatorGameObject extends GameObject {
    constructor() {
        super("CharacterCreator", [], "UI")

        this.addComponent(new Health())
        this.addComponent(new Attributes(), { characterClass: ClassDefinitions.warrior })
        
    }
}
