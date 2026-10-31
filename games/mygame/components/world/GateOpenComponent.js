class GateOpenComponent extends Component {
    isOpen = false
    isOpening = false
    speed = 1
    targetRotation = 0

    update() {
        if (this.isOpen) return
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

    onCollisionStay(other) {
        if (this.isOpen || this.isOpening) return
        const player = GameObject.find("Player")
        if (other !== player) return
        const playerinv = player.getComponent(Inventory)
        // opentesarena inspired item library find and get
        const key = playerinv.findItemByType(itemLibrary.getDefinition("key"))
        if (key) {
            playerinv.removeItem(key, 1)
            this.isOpening = true
            const msgmanager = GameObject.find("MessageManager")
                .getComponent(MessageManager)
            msgmanager.showMessage("You opened the gate", 3)
            this.targetRotation = this.transform.rotation - Math.PI / 2
        }
    }
}
