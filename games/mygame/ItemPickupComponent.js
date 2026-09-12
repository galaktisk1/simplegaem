class ItemPickupComponent extends Component {
    isCollected = false


    whatIsThisItem(item) {
        return item.constructor
    }

    update() {
        if(!this.isCollected){
            const player = this.player
            const item = this.gameObject
            const itemObj = this.whatIsThisItem(item)
            const itempos = this.transform.position
            const playerpos = player.transform.position
            const distanceToItem = itempos.distanceTo(playerpos)
            const keymsg = "You picked up a key"
                
            if (distanceToItem < 25) {
                console.log("Picked up item:", item)
                player.addToInventory(item)
                this.isCollected = true
                if (itemObj === KeyGameObject){
                    Engine.currentScene.message.showMessage(keymsg)
                }
                // where the item will be removed later
            }
        }
    }
}
