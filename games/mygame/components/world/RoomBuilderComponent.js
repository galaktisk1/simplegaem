class RoomBuilderComponent extends Component {
    buildRoom(room, roomWorldPos,  connected = []) {
        const layout = room.layout
        const tileSize = Room.tileSize
        // layout has:
        // # for wall
        // . for floor
        // D for doorway
        // l is an interior wall and floor
        // doorway is nothing for now

        // count the number of Ds in layout
        let openDoorCount = 0
        for (let row of layout) {
            for (let cell of row) {
                if (cell === "D") {
                    openDoorCount++
                }
            }
        }
        for (let y = 0; y < layout.length; y++) {
            for (let x = 0; x < layout[y].length; x++) {
                const cell = layout[y][x]
                const cellLocalPos = room.cellToLocal(x, y)

                if (cell === ".") {
                    this.createFloor({ position: cellLocalPos }, roomWorldPos)
                }
                if (cell === "l") {
                    // create a floor and a wall object on the right edge of that floor
                    this.createFloor({ position: cellLocalPos }, roomWorldPos)
                    this.createWall({ position: cellLocalPos, rotation: Math.PI / 2 }, roomWorldPos)
                }
                if (cell !== "#" && cell !== "D") continue
                const edges = room.getBoundaryEdges(layout, x, y, tileSize)
                if (cell === "#") {
                    for (const edge of edges) this.createWall(edge, roomWorldPos)
                }

                if (cell === "D" && edges.length > 0) {
                    const isConnected = connected.some(p => p.x === x && p.y === y)
                    if (!isConnected) this.createWall(edges[0], roomWorldPos)
                }
            }
        }
    }    

    createWall(wall, roomWorldPos) {
        const position = roomWorldPos.plus(wall.position)
        SceneManager.currentScene.instantiate(new WallGameObject(), position, wall.rotation ?? 0)
    }

    createFloor(floor, roomWorldPos) {
        const position = roomWorldPos.plus(floor.position)
        SceneManager.currentScene.instantiate(new FloorGameObject(), position, floor.rotation ?? 0)
    }
}

