class DungeonBuilderComponent extends Component {
    planDungeon(startPos, maxRooms = 7) {
        const tileSize = Room.tileSize
        const occupied = new Set()
        const deadEnds = []
        
        const startRoom = new SquareRoom()
        
        const start = { room: startRoom, origin: startPos, depth: 0, connected: [] }
        for (const key of this.floorTiles(startRoom, startPos, tileSize)) occupied.add(key)
        
        const placed = [start]
        
        
        const frontier = []
        for (const door of startRoom.getDoorways()) {
            frontier.push({
                placedRoom: start,
                position: startPos.plus(door.localPosition),
                direction: door.direction,
                gridPosition: door.gridPosition
            })
        }
        const random = GameSession.randomD
        const opposite = { left: "right", right: "left", up: "down", down: "up" }

        while (placed.length < maxRooms && frontier.length > 0) {
            // tak a random door from the frontier
            const index = random.nextInt(frontier.length)
            const door = frontier.splice(index, 1)[0]

            // make a new room, and find its door facing the opposite direction
            const newRoom = new LRoom()
            const doorways = newRoom.getDoorways()
            const incomingDoor = doorways.find(d => d.direction === opposite[door.direction])

            //check if the new room has an incoming door
            if (!incomingDoor) {
                deadEnds.push(door)
                continue
            }
            
            const newOrigin = door.position.minus(incomingDoor.localPosition)
            
            const keys = this.floorTiles(newRoom, newOrigin, tileSize)
            if (keys.some(key => occupied.has(key))) {
                deadEnds.push(door)
                continue
            }
            for (const key of keys) occupied.add(key)
            
            const newPlaced = { room: newRoom, origin: newOrigin, depth: door.placedRoom.depth + 1, connected: [incomingDoor.gridPosition] }
            placed.push(newPlaced)
            door.placedRoom.connected.push(door.gridPosition)

            for (const newDoor of doorways) {
                if (newDoor !== incomingDoor) {
                    frontier.push({
                        placedRoom: newPlaced,
                        position: newOrigin.plus(newDoor.localPosition),
                        direction: newDoor.direction,
                        gridPosition: newDoor.gridPosition
                    })
                }
            }
            
        }
        console.log(placed, frontier, deadEnds, occupied)
        return placed
    }

    buildDungeon(startPos) {
    const roomBuilder = this.gameObject.getComponent(RoomBuilderComponent)

    const placed = this.planDungeon(startPos)
    for (const { room, origin, connected } of placed) {
        roomBuilder.buildRoom(room, origin, connected)
    }

    // the exit goes in the room furthest from the start
    const deepest = placed.reduce((best, p) => p.depth > best.depth ? p : best)

    // find where the deepest room was entered
    const entrance = deepest.connected[0]
    const entranceDoor = deepest.room.getDoorways()
        .find(d => d.gridPosition.x === entrance.x && d.gridPosition.y === entrance.y)
    if (!entranceDoor) return placed
    const entrancePos = deepest.origin.plus(entranceDoor.localPosition)

    // pick the floor cell furthest from that entrance
    const toWorld = c => deepest.room.cellToWorld(deepest.origin, c.position.x, c.position.y)
    const cell = deepest.room.getFloorCells().reduce((best, c) =>
        Vector2.distance(toWorld(c), entrancePos) > Vector2.distance(toWorld(best), entrancePos) ? c : best)

    SceneManager.currentScene.instantiate(new ExitGameObject(), toWorld(cell), 0, new Vector2(70, 70))

    return placed
    }
    
    floorTiles(room, origin, tileSize) {
        const originX = Math.round(origin.x / tileSize)
        const originY = Math.round(origin.y / tileSize)
        const keys = []
        for (const cell of room.getFloorCells()) {
            const tx = originX + cell.position.x
            const ty = originY + cell.position.y
            keys.push(`${tx},${ty}`)
        }
        return keys
    }
}