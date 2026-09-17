class ItemPickupComponent extends Component {
    isCollected = false

    update() {
        if (!this.isCollected) {
            const player = GameObject.find("Player")
            const playerinv = player.getComponent(Inventory)
            const item = this.gameObject
            const itempos = this.transform.position
            const playerpos = player.transform.position
            const distanceToItem = itempos.distanceTo(playerpos)
                
            if (distanceToItem < 25) {
                console.log("Picked up item:", item)
                playerinv.addItem(item)
                this.isCollected = true
                // it looks like by the long line you have to write here that this should be an engine component
                GameObject.find("Message").showMessage(`You picked up a ${item.itemDef.name}`)
                item.destroy() // or later in-inventory useage
                // where the item will be removed later
            }
        }
    }
}
