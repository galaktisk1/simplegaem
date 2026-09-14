class PlayerGameObject extends GameObject {
    constructor() {
        super()
        this.inventory = []
        this.addComponent(new PlayerUpdateComponent())
        // player circle
        this.addComponent(new Polygon, {
            fillstyle: "grey", points: [
                new Vector2(-30*2, -30*2),
                new Vector2(30*2, -30*2),
                new Vector2(30*2, 30*2),
                new Vector2(-30*2, 30*2)
            ]
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
        // trying to figure out this, use player specific for now
        // this.inventory = this.addComponent(new Inventory())
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
        else {
            console.log("whoopsie ", item, " not in inventory")
        }
    }
}