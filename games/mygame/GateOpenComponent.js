class GateOpenComponent extends Component {
    isOpen = false
    // gate will move or delete in someway later

    findKey(player) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
        return player.getInventory().find(key => key instanceof KeyGameObject) // find the key
    }

    update() {
        if (!this.isOpen){
            const player = this.player
            const key = this.findKey(player)
            const playerpos = player.transform.position
            const gatepos = this.transform.position

            const distanceToGate = gatepos.distanceTo(playerpos)
            

            if (distanceToGate < 25 && key) {
                console.log("gate opened")
                this.isOpen = true
                player.useItem(key)
                Engine.currentScene.message.showMessage("You opened the gate")
                // now something just needs to happen to the gate
            }
        }
    }
}
