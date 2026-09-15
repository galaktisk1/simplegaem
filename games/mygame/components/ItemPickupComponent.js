class ItemPickupComponent extends Component {
    isCollected = false


    whatIsThisItem(item) {
        return item.itemDef
    }

    update() {
        if (!this.isCollected) {
            const player = this.player
            const playerinv = player.inventory
            const item = this.gameObject
            const itempos = this.transform.position
            const playerpos = player.transform.position
            const distanceToItem = itempos.distanceTo(playerpos)
                
            if (distanceToItem < 25) {
                console.log("Picked up item:", item)
                playerinv.addItem(item)
                this.isCollected = true
                // it looks like by the long line you have to write here that this should be an engine component
                Engine.currentScene.message.showMessage(`You picked up a ${item.itemDef.name}`)
                item.destroy() // or later in-inventory useage
                // where the item will be removed later
            }
        }
    }
}
