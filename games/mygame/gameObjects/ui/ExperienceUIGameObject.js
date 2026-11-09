class ExperienceUIGameObject extends GameObject {
    constructor() {
        super("ExperienceUI", [], "UI");
        this.addComponent(new ExperienceUI());
    }
}