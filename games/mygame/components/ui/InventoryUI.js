class InventoryUI extends Component {
    start() {
        this.player = GameObject.find("Player")
        if (!this.player) return
        this.inventory = this.player.getComponent(Inventory)

    }
    update() {
        if (Input.getKeyDown("KeyI")) { this.open = !this.open }
        // EQUIP: while open, a click on a weapon's row equips it on the player,
        // the row is (mouse y - 60) / 24 since each line starts at y 60, 24 apart
    }
    draw(ctx) {
        if (!this.open || !this.inventory) return

        ctx.fillStyle = "rgba(0, 0, 0, 0.75)"
        ctx.fillRect(0, 0, Engine.canvas.width - 40, Engine.canvas.height - 40)
        ctx.fillStyle = "white"
        ctx.font = "20px Arial"
        ctx.fillText("Inventory", 10, 28)
        const items = this.inventory.getInventory()
        let y = 60
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const label = item.amount > 1 ? `${item.itemDef.name} x${item.amount}` : item.itemDef.name
            ctx.fillText(label, 10, y)
            y += 24
        }
    }
}