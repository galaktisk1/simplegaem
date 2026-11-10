// one clickable attribute line in the character creator, like a Unity Button prefab
// set AttributeRowController.attributeName after instantiating it
class AttributeRowGameObject extends GameObject {
    constructor() {
        super("Row", [], "UI")
        this.addComponent(new TextLabel(), { fillStyle: "white", font: "20px Arial", textBaseline: "middle" })
        // trigger so it never blocks vision or pushes anything, it only catches the mouse
        this.addComponent(new Collider(), {
            isTrigger: true,
            points: [
                new Vector2(-10, -14),
                new Vector2(260, -14),
                new Vector2(260, 14),
                new Vector2(-10, 14),
            ]
        })
        this.addComponent(new AttributeRowController())
    }
}
