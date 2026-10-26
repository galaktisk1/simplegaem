class ProducerController extends Component{
    timeBetweenDig = 1*60
    start() {
            
    }
    update(){
        this.timeBetweenDig--
        if (this.timeBetweenDig <= 0) this.timeBetweenDig = 1*60
        const inventory = this.gameObject.getComponent(Inventory)
        const conveyor = GameObject.findGameObjectsWithTag("ConveyorBelt")
        const producerPos = this.gameObject.transform.position
        const grid = GameObject.find("Grid")
        const gridCells = grid.groundCells
        // grab an object from under it, add to the inventory or push to a conveyor object
        const cell = this.whatCellAmIIn()
        if (cell) {
            // take the cell beneath the machine, grab the amount of the ore within
            // decremenent it, then add to the producer's inventory
            
            if (cell.oreRemaining > 0 && this.timeBetweenDig <= 0) {
                cell.oreRemaining--
                inventory.addItem(cell.ore, 1)
                console.log(`Mined 1 ${cell.ore.itemDef.name}`)
            }

        }

    }

    whatCellAmIIn() {
        const producerPos = this.gameObject.transform.position
        const grid = GameObject.find("Grid")
        const gridCells = grid.groundCells
        for (let i = 0; i < gridCells.length; i++) {
            const cell = gridCells[i]
            if (producerPos.x >= cell.x && producerPos.x < cell.x + cell.width &&
                producerPos.y >= cell.y && producerPos.y < cell.y + cell.height) {
                return cell
            }
        }
        return null
    }
}