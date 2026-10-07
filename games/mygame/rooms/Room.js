class Room { 
    layout
    
    constructor() {
        this.layout = []
    }

    getDoorways() {
        const doorways = []
        const tileSize = Assets.floor.scale.x * 2
        for (let y = 0; y < this.layout.length; y++) {
            for (let x = 0; x < this.layout[y].length; x++) {
                if (this.layout[y][x] === "D") {
                    const edges = this.getBoundaryEdges(this.layout, x, y, tileSize)
                    const direction = edges[0].direction
                    const localPosition = edges[0].position
                    doorways.push({
                        direction: direction,
                        localPosition: localPosition,
                        gridPosition: new Vector2(x, y)
                    })
                }
            }
        }
        return doorways
    }

    getFloorCells(){
        const floorCells = []
        for (let y = 0; y < this.layout.length; y++) {
            for (let x = 0; x < this.layout[y].length; x++) {
                if (this.layout[y][x] === ".") {
                    floorCells.push({ position: new Vector2(x, y) })
                }
                if (this.layout[y][x] === "l") {
                    floorCells.push({ position: new Vector2(x, y) })
                }
            }
        }
        return floorCells
    }

    getDoorwayDirection(neighbor) {
        if (neighbor.dx > 0) return "left"
        if (neighbor.dx < 0) return "right"
        if (neighbor.dy > 0) return "up"
        if (neighbor.dy < 0) return "down"
    }

    getBoundaryEdges(layout, x, y, tileSize) {
        const edges = []
        const neighbors = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 }
        ]
        for (const neighbor of neighbors) {
            const floorX = x + neighbor.dx
            const floorY = y + neighbor.dy
            if (layout[floorY]?.[floorX] !== ".") continue
            edges.push({
                position: new Vector2(
                    (floorX - 0.5) * tileSize - neighbor.dx * tileSize / 2,
                    (floorY - 0.5) * tileSize - neighbor.dy * tileSize / 2
                ),
                rotation: neighbor.dx !== 0 ? Math.PI / 2 : 0,
                direction: this.getDoorwayDirection(neighbor)
            })
        }
        return edges
    }
}