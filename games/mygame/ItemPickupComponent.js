class ItemPickupComponent extends Component {
    isCollected = false

    update() {
        if(!this.isCollected){
            const player = this.player
            const item = this.gameObject
            const itempos = this.transform.position
            const playerpos = player.transform.position
            const distanceToItem = itempos.distanceTo(playerpos)
                
            if (distanceToItem < 25) {
                console.log("Picked up item:", item)
                player.addToInventory(item)
                this.isCollected = true
                // where the item will be removed later
            }
        }
    }
}
