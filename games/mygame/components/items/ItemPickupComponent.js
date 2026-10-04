class ItemPickupComponent extends Component {
    isCollected = false

    update() {
        if (!this.isCollected) {
            const player = GameObject.find("Player")
            if (!player) return
            const playerinv = player.getComponent(Inventory)
            const item = this.gameObject
            const itempos = this.transform.position
            const playerpos = player.transform.position
            const distanceToItem = itempos.distanceTo(playerpos)
                
            if (distanceToItem < 25) {
                console.log("Picked up item:", item)
                // Check if the item is gold and handle accordingly
                if (item.itemDef.id === "gold") {
                    GameSession.gold += item.amount
                }
                else {
                    const popupmanager = GameObject.find("PopUpManager").getComponent(PopUpManager)
                    if (item.itemDef.id === "key") {
                        popupmanager.placePopup("Key Get", player, "yellow")
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
    }
}
