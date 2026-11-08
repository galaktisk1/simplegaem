class InventoryUI extends Component {
    start() {
        this.player = GameObject.find("Player")
        if (!this.player) return
        this.inventory = this.player.getComponent(Inventory)

    }
    update() {
        if (Input.getKeyDown("KeyI")) { this.open = !this.open }
    }
    draw(ctx) {
        if (!this.open || !this.inventory) return
        
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)"   // see-through dark panel
        ctx.fillRect(0, 0, Engine.canvas.width-40, Engine.canvas.height-40)       // x, y, width, height
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