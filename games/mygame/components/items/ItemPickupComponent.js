class ItemPickupComponent extends Component {
    isCollected = false

    collect() {
        if (!this.isCollected) {
            const player = GameObject.find("Player")
            if (!player) return
            const playerinv = player.getComponent(Inventory)
            const item = this.gameObject
            
            // debug
            console.log("Picked up item:", item)
            // Check if the item is gold and handle accordingly
            if (item.itemDef.id === "gold") {
                GameSession.gold += item.amount
            }
            else {
                const popupmanager = GameObject.find("PopUpManager").getComponent(PopUpManager)
                if (item.itemDef.id === "key") {
                    popupmanager.showPopup("Key Get", player, "yellow")
                }
                playerinv.addItem(item)
            }
            console.log(playerinv.inventory)
            this.isCollected = true
            const msgmanager = GameObject.find("MessageManager")
                .getComponent(MessageManager)
            msgmanager.showMessage(`You picked up a ${item.itemDef.name}`, 3)
            item.destroy()
        }
    }

    onCollisionStay(other) {
        if (!this.isCollected && other.name === "Player") {
            this.collect()
        }
    }
}
