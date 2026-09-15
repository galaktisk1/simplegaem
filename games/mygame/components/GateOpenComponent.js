class GateOpenComponent extends Component {
    isOpen = false

    update() {
        if (!this.isOpen){
            const player = this.player
            const playerinv = player.inventory
            const key = playerinv.findItemByType(itemLibrary.getDefinition("key"))
            const gate = this.gameObject
            const playerpos = player.transform.position
            const gatepos = this.transform.position

            const distanceToGate = gatepos.distanceTo(playerpos)
            

            if (distanceToGate < 25 && key) {
                console.log("gate opened")
                this.isOpen = true
                playerinv.removeItem(key)
                Engine.currentScene.message.showMessage("You opened the gate")
                // now something just needs to happen to the gate
                gate.destroy()
            }
        }
    }
}
