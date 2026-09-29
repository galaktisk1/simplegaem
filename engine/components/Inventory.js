class Inventory extends Component {
    constructor() {
        super()
        this.inventory = []
    }
    
    addItem(item) {
        if (!item?.itemDef) return undefined
        const amount = item.amount ?? 1
        if (!Number.isInteger(amount) || amount < 1) return undefined
        if (!item.itemDef.stackable && amount !== 1) return undefined
        if (this.getInventory().includes(item)) return item

        if (item.itemDef.stackable) {
            const existingItem = this.findItem(item.itemDef)
            if (existingItem) {
                existingItem.amount = (existingItem.amount ?? 1) + amount
                return existingItem
            }
        }

        item.amount = amount
        this.getInventory().push(item)
        return item
    }

    getInventory() {
        return this.inventory
    }

    removeItem(item, amount = item?.amount ?? 1) {
        const index = this.getInventory().indexOf(item)
        if (index === -1) {
            console.log("whoopsie ", item, " not in inventory")
            return false
        }
        const currentAmount = item.amount ?? 1
        if (!Number.isInteger(amount) || amount < 1 || amount > currentAmount) return false

        if (amount === currentAmount) this.getInventory().splice(index, 1)
        else item.amount = currentAmount - amount
        return true
    }

    getSlot(index) {
        return this.getInventory()[index]
    }

    getOccupiedSlotCount() {
        return this.getInventory().length
    }

    findFirstSlot(itemDef) {
        if (!itemDef) return -1
        return this.getInventory().findIndex(item => item.itemDef === itemDef)
    }

    getCountOf(itemDef) {
        let count = 0
        for (const item of this.getInventory()) {
            if (item.itemDef === itemDef) count += item.amount ?? 1
        }
        return count
    }

    findItem(itemDef) {
        return this.getSlot(this.findFirstSlot(itemDef))
    }

    findItemByType(itemDef) {
        return this.findItem(itemDef)
    }

    whatIsThisItem(item) {
        return item.itemDef
    }

    clearInventory() { 
        this.getInventory().length = 0
    }
}
