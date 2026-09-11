class PlayerGameObject extends GameObject {
    constructor() {
        super()
        this.inventory = []
        this.addComponent(new PlayerUpdateComponent())
        // player circle
        this.addComponent(new Circle(), {
            radius: 50,
            fillstyle: "grey",
        })
        // lantern
        this.addComponent(new Polygon(), {
            fillstyle: "yellow", points: [
                new Vector2(-48, -10),
                new Vector2(-28, -10),
                new Vector2(-28, 10),
                new Vector2(-48, 10),
            ]
        })
    }

    addToInventory(item) {
        this.inventory.push(item)
    }

    getInventory() {
        return this.inventory
    }

    useItem(item) {
        const index = this.inventory.indexOf(item)
        if (index !== -1) {
            this.inventory.splice(index, 1)
        }
        else{
            console.log("whoopsie ", item, " not in inventory")
        }
    }
}