class GateOpenComponent extends Component {
    isOpen = false
    isOpening = false
    speed = 1
    targetRotation

    update() {
        if (!this.isOpen) {
            if (!this.isOpening) {
                const player = GameObject.find("Player")
                const playerinv = player.getComponent(Inventory)
                // opentesarena inspired item library find and get
                const key = playerinv.findItemByType(itemLibrary.getDefinition("key"))
                const gate = this.gameObject
                const gatepos = gate.transform.position
                const playerpos = player.transform.position
                const distanceToGate = gatepos.distanceTo(playerpos)

                const message = GameObject.find("Message")
                const messageComp = message.getComponent(MessageComponent)

                if (distanceToGate < 25 && key) {
                    playerinv.removeItem(key)
                    this.isOpening = true
                    messageComp.showMessage("You opened the gate")
                    this.targetRotation = this.transform.rotation - Math.PI / 2
                }
            }


            // Rotation handling for visuallyopening the gate
            if (this.isOpening) {
                const currentRotation = this.transform.rotation
                const targetRotation = this.targetRotation
                const rotationdiff = currentRotation - targetRotation
                const newRotation = Math.max(
                    currentRotation - this.speed * Time.deltaTime,
                    currentRotation - rotationdiff
                )
                this.transform.rotation = newRotation

                if (currentRotation == targetRotation) {
                    this.isOpening = false
                    this.isOpen = true
                }
            }
        }
    }
}
