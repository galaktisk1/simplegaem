class GateOpenComponent extends Component {
    isOpen = false

    update() {
        if (!this.isOpen){
            const player = GameObject.find("Player")
            const playerinv = player.getComponent(Inventory)
            const key = playerinv.findItemByType(itemLibrary.getDefinition("key"))
            const gate = this.gameObject
            const playerpos = player.transform.position
            const gatepos = gate.transform.position

            const distanceToGate = gatepos.distanceTo(playerpos)
            

            if (distanceToGate < 25 && key) {
                console.log("gate opened")
                this.isOpen = true
                playerinv.removeItem(key)
                GameObject.find("Message").showMessage("You opened the gate")
                // now something just needs to happen to the gate
                gate.destroy()
            }
        }
    }
}
