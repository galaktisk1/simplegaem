class Inventory extends Component {
    // look into C:\Users\caleb\OneDrive\Documents\GitHub\OpenTESArena\OpenTESArena\src\Items\ItemInventory.cpp
    constructor() {
        super()
        this.inventory = []
    }
    
    addItem(item) {
        this.inventory.push(item)
    }

    getInv() {
        return this.inventory
    }

    removeItem(item) {
        const index = this.inventory.indexOf(item)
        if (index !== -1) {
            this.inventory.splice(index, 1)
        } else {
            console.log("whoopsie ", item, " not in inventory")
        }
    }

    findItem(itemDef) {
        if (!itemDef) return undefined
        return this.inventory.find(item => item.itemDefinition === itemDef)
    }

    findItemByType(itemDef) {
        return this.findItem(itemDef)
    }

    whatIsThisItem(item) {
        return item.itemDefinition
    }

    clearInv() { 
        this.inventory.length = 0
    }
}
