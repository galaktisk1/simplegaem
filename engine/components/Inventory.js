class Inventory extends Component {
    // look into C:\Users\caleb\OneDrive\Documents\GitHub\OpenTESArena\OpenTESArena\src\Items\ItemInventory.cpp
    constructor() {
        super()
        this.inventory = []
    }


    // void ItemInventory::insert(ItemDefinitionID defID, int stackAmount)
    // {
    //     const ItemDefinition & itemDef = ItemLibrary:: getInstance().getDefinition(defID);
    // 	int insertIndex = -1;
    // 	int totalStackAmount = stackAmount;
    //     if (itemDef.isStackable) {
    //         if (this -> findFirstSlot(defID, & insertIndex)) {
    //             ItemInstance & existingItemInst = this -> getSlot(insertIndex);
    //             totalStackAmount += existingItemInst.stackAmount;
    //         }
    //     }
    //     if (insertIndex < 0) {
    //         if (!this -> findFirstEmptySlot(& insertIndex)) {
    //             insertIndex = static_cast < int > (this -> items.size());
    //             this -> items.emplace_back(ItemInstance());
    //         }
    //     }
    //     ItemInstance & itemInst = this -> getSlot(insertIndex);
    //     itemInst.init(defID);
    //     itemInst.stackAmount = totalStackAmount;
    // }
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

    findItem(item) {
        // declare type? idk
        return // something, use .find array operator
    }

    clearInv() { 
        this.inventory.length = 0
    }
}