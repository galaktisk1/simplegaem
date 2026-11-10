// screen space text prefab, like a Unity Text object
// set its name and TextLabel fields after instantiating it
class UITextGameObject extends GameObject {
    constructor() {
        super("txt", [], "UI")
        this.addComponent(new TextLabel(), { fillStyle: "white", font: "20px Arial" })
    }
}
