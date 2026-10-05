class RoomBuilderComponent extends Component {
    /**
     * @param {{ x: number, y: number } | null} [protectedDoorway=null]
     */
    buildRoom(room, roomWorldPos, protectedDoorway = null) {
        const random = new Seed(GameSession.seed)
        const layout = room.layout
        // layout has: 
        // # for wall
        // . for floor
        // D for doorway
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
        let openDoors = []
        for (let y = 0; y < layout.length; y++) {
            for (let x = 0; x < layout[y].length; x++) {
                const cell = layout[y][x]
                const cellLocalPos = new Vector2(x * 300, y * 300)

                if (x % 2 === 0 && y % 2 === 0) continue

                if (cell === "#") {
                    const rotation = y % 2 === 0 ? 0 : Math.PI/2
                    this.createWall({ position: cellLocalPos, rotation }, roomWorldPos)
                }

                if (cell === ".") {
                    this.createFloor({ position: cellLocalPos}, roomWorldPos)
                }

                

                if (cell === "D") {
                    const isProtected = protectedDoorway && protectedDoorway.x === x && protectedDoorway.y === y
                    if (!isProtected && openDoorCount>1 && random.nextBool() == true) {
                        openDoorCount--
                        const rotation = y % 2 === 0 ? 0 : Math.PI / 2
                        this.createWall({ position: cellLocalPos, rotation }, roomWorldPos)
                    }
                    else {
                        // direction dtermined by :
                        // Floor to the right → doorway faces left.
                        // Floor to the left → faces right.
                        // Floor below → faces up.
                        // Floor above → faces down.
                        let direction 
                        if (x < layout[y].length - 1 && layout[y][x + 1] === ".") direction = "left"
                        else if (x > 0 && layout[y][x - 1] === ".") direction = "right"
                        else if (y < layout.length - 1 && layout[y + 1][x] === ".") direction = "up"
                        else if (y > 0 && layout[y - 1][x] === ".") direction = "down"
                        openDoors.push({ position: roomWorldPos.plus(cellLocalPos), direction: direction })
                    }
                }
            }
        }
        return openDoors
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

