class ItemBagController extends Component {
    // items: [{ itemDef, amount }]
    items = null

    init(items) {
        this.items = items
    }
    awake() {
        this.baginv = this.gameObject.getComponent(Inventory)
    }

    start() {
        this.player = GameObject.find("Player")
        if (!this.player) return
        this.playerinv = this.player.getComponent(Inventory)
        this.popupmanager = GameObject.find("PopUpManager").getComponent(PopUpManager)
        
        const items = this.items ?? [
            // test items
            { itemDef: itemLibrary.getDefinition("gold"), amount: 87 },
            { itemDef: itemLibrary.getDefinition("potion"), amount: 1 },
            { itemDef: itemLibrary.getDefinition("bread"), amount: 2 },
        ]
        for (const item of items) {
            this.baginv.addItem(item)
        }
    }

    onTriggerStay(other) {
        if (other.name === "Player") {
            for (const item of this.baginv.getInventory()) {
                this.playerinv.addItem(item)
            }
            this.popupmanager.showPopup("Items Get", this.player)
            this.baginv.clearInventory()
            this.gameObject.destroy()
        }
    }
}
