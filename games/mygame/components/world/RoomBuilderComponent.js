class RoomBuilderComponent extends Component {
    /**
     * @param {{ x: number, y: number } | null} [protectedDoorway=null]
     */
    buildRoom(room, roomWorldPos, protectedDoorway = null) {
        const random = GameSession.randomD
        const layout = room.layout
        const tileSize = Assets.floor.scale.x * 2
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
        let openDoors = []
        for (let y = 0; y < layout.length; y++) {
            for (let x = 0; x < layout[y].length; x++) {
                const cell = layout[y][x]
                const cellLocalPos = new Vector2((x - 0.5) * tileSize, (y - 0.5) * tileSize)

                if (cell === ".") {
                    this.createFloor({ position: cellLocalPos }, roomWorldPos)
                }
                if (cell !== "#" && cell !== "D") continue
                const edges = room.getBoundaryEdges(layout, x, y, tileSize)
                if (cell === "#") {
                    for (const edge of edges) this.createWall(edge, roomWorldPos)
                }

                if (cell === "l") {
                    // create a floor and a wall object on the right edge of that floor
                    this.createFloor({ position: cellLocalPos }, roomWorldPos)
                    this.createWall({ position: cellLocalPos, rotation: 0 }, roomWorldPos)
                }

                if (cell === "D" && edges.length > 0) {
                    const doorway = edges[0]
                    const isProtected = protectedDoorway && protectedDoorway.x === x && protectedDoorway.y === y
                    if (!isProtected && openDoorCount > 1 && random.nextBool() == true) {
                        openDoorCount--
                        this.createWall(doorway, roomWorldPos)
                    }
                    else {
                        // direction dtermined by :
                        // Floor to the right → doorway faces left.
                        // Floor to the left → faces right.
                        // Floor below → faces up.
                        // Floor above → faces down.
                        openDoors.push({ position: roomWorldPos.plus(doorway.position), direction: doorway.direction })
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

