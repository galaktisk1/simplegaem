class GateOpenComponent extends Component {
    isOpen = false
    isOpening = false
    speed = 1
    targetRotation = 0
    start() {
        this.collider = this.gameObject.getComponent(Collider)
        this.collider.isTrigger = false
    }

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
                // once the gate is fully open, it should be solid again
                this.collider.isTrigger = false
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
            // if door is moving, dont collide with it
            this.collider.isTrigger = true
            const msgmanager = GameObject.find("MessageManager")
                .getComponent(MessageManager)
            msgmanager.showMessage("You opened the gate", 3)
            this.targetRotation = this.transform.rotation - Math.PI / 2
        }
    }
}
