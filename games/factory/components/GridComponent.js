class GridComponent extends Component{
    columns = 12
    rows = 8
    cellSize = 50
    
    start(){
            
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
    }
}