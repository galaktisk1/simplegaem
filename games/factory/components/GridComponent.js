class GridComponent extends Component{
    columns = 12
    rows = 8
    cellSize = 50
    groundCells = []

    start() {
        this.initializeGroundCells()

        // ground cell 1,1 gets iron and 100 remaining for testing
        this.supplyGroundCell(1, 1, "iron", 100)
    }
    update(){
        const mousePos = SceneManager.currentScene.mouseWorldPosition
        if(!mousePos) return
        const localPos = mousePos.minus(this.transform.position)
        const column = Math.floor(localPos.x / this.cellSize)
        const row = Math.floor(localPos.y / this.cellSize)
        if(column < 0 || column >= this.columns || row < 0 || row >= this.rows) return
    }

    draw(ctx){
        const width = this.columns * this.cellSize
        const height = this.rows * this.cellSize
        ctx.beginPath()
        for(let column = 0; column <= this.columns; column++){
            const x = column * this.cellSize
            ctx.moveTo(x,0)
            ctx.lineTo(x, height)
        }
        for(let row = 0; row <= this.rows; row++){
            const y = row * this.cellSize
            ctx.moveTo(0, y)
            ctx.lineTo(width, y)
        }
        ctx.strokeStyle = "gray"
        ctx.stroke()
        this.groundCells.forEach(cell => {
            if(cell.ore){
                const x = cell.column * this.cellSize
                const y = cell.row * this.cellSize
                ctx.fillStyle = "rgb(94, 89, 53)"
                ctx.fillRect(x, y, this.cellSize, this.cellSize)
            }
        })
    }

    initializeGroundCells() {
        for (let column = 0; column < this.columns; column++) {
            for (let row = 0; row < this.rows; row++) {
                const groundCell = {
                    column: column,
                    row: row,
                }
                this.groundCells.push(groundCell)
            }
        }
        this.groundCells.forEach(cell => {
            cell.ore = null
            cell.oreRemaining = 0
        })
    }

    findGroundCell(column, row) {
        return this.groundCells.find(c => c.column === column && c.row === row)
    }
    findGroundCells(fromx, tox, fromy, toy) {
        return this.groundCells.filter(c => c.column >= fromx && c.column <= tox && c.row >= fromy && c.row <= toy)
    }

    supplyGroundCell(column, row, ore, amount) {
        const cell = this.findGroundCell(column, row)
        if(cell){
            cell.ore = ore
            cell.oreRemaining = amount
            cell.canBeMouseOver = true
        }
    }
    supplyGroundCells(column, row, ore, amounts = []) {
        const cells = this.findGroundCells(column, column + amounts.length - 1, row, row)
        cells.forEach((cell, index) => {
            cell.ore = ore
            cell.oreRemaining = amounts[index] || 0
            cell.canBeMouseOver = true
        })
    }
    onMouseOver(){
        // hovering over will give tooltip
        // pressing p over a cell will place producer
        // pressing c over a cell will place conveyor
        
        const mousePos = SceneManager.currentScene.mouseWorldPosition
        if(!mousePos) return
        const localPos = mousePos.minus(this.transform.position)
        const column = Math.floor(localPos.x / this.cellSize)
        const row = Math.floor(localPos.y / this.cellSize)
        const cell = this.findGroundCell(column, row)
        if (cell && cell.canBeMouseOver) {
            console.log(`Hovering over cell: column=${column}, row=${row}, ore=${cell.ore}, oreRemaining=${cell.oreRemaining}`)
            const manager = GameObject.find("TooltipManagerGameObject")
                .getComponent(TooltipManager)
            manager.show(`${cell.ore}: ${cell.oreRemaining}`)
        }
        if (Input.keysDownThisFrame.includes("KeyP")) {
            // place producer in the hovered cell, if a producer exists in the cell, destroy it

            SceneManager.currentScene.instantiate(new ProducerGameObject(), 
                new Vector2(column * this.cellSize, row * this.cellSize),
                new Vector2(this.cellSize, this.cellSize))
        }
        if (Input.keysDownThisFrame.includes("KeyC")) {
            // place conveyor
        }
    }
}