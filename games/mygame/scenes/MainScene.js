class MainScene extends Scene {
    constructor() {
        super()
        this.instantiate(new RoomBuilderGameObject())

        const roomBldr = GameObject.find("RoomBuilder")
        const roomBldrComp = roomBldr.getComponent(RoomBuilderComponent)
        roomBldrComp.buildRoom(this)
        
        this.instantiate(new KeyGameObject(), new Vector2(300,400))
        this.instantiate(new ExitGameObject(), new Vector2(650, 160), 0, new Vector2(70, 70))
        this.instantiate(new GateGameObject(), new Vector2(500, 80), Math.PI / 2)

        this.instantiate(new PlayerGameObject(), new Vector2(250, 250))
        this.instantiate(new MessageGameObject(), new Vector2(400, 80))
        
        // vv this is now made within the message game object
        // this.instantiate(new TestTextGameObject, new Vector2(10,10))
    }

    static room2 = { width: 600, height: 600, wall: 80}

}
