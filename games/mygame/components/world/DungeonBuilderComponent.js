class DungeonBuilderComponent extends Component {
    static opposite = { left: "right", right: "left", up: "down", down: "up" }
    start() {
        this.tileSize = Room.tileSize
        this.roomBuilder = this.gameObject.getComponent(RoomBuilderComponent)
        this.random = GameSession.randomD
    }

    planDungeon(startPos, maxRooms = 7) {

        const occupied = new Set()
        const deadEnds = []

        const startRoom = new SquareRoom()
        const templates = [LRoom, LargeCavernRoom, CubiclesRoom, HallwayRoom, TJunctionRoom, CrossroadsRoom]
        const start = { room: startRoom, origin: startPos, depth: 0, connected: [], parent: null, entryDoor: null, chain: 0 }
        for (const key of this.floorTiles(startRoom, startPos, this.tileSize)) occupied.add(key)

        const placed = [start]
        let realRooms = 1


        const frontier = []
        for (const door of startRoom.getDoorways()) {
            frontier.push({
                placedRoom: start,
                position: startPos.plus(door.localPosition),
                direction: door.direction,
                gridPosition: door.gridPosition
            })
        }


        while (realRooms < maxRooms && frontier.length > 0 && placed.length < maxRooms * 3) {
            // tak a random door from the frontier
            const index = this.random.nextInt(frontier.length)
            const door = frontier.splice(index, 1)[0]
            if (!door) continue

            const fit = this.tryPlaceRoom(door, templates, occupied, this.tileSize, this.random)
            if (!fit) {
                deadEnds.push(door)
                continue
            }
            const { room: newRoom, doorways, incomingDoor, origin: newOrigin, keys } = fit
            for (const key of keys) occupied.add(key)

            const isConnector = newRoom.isConnector

            const newPlaced = { room: newRoom, origin: newOrigin, depth: door.placedRoom.depth + 1, connected: [incomingDoor.gridPosition], parent: door.placedRoom, entryDoor: door, chain: isConnector ? door.placedRoom.chain + 1 : 0 }
            placed.push(newPlaced)
            // increment realRooms if the new room is not a connector
            if (!isConnector) realRooms++
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
        const placed = this.planDungeon(startPos)
        const random = GameSession.randomD
        for (const { room, origin, connected } of placed) {
            this.roomBuilder.buildRoom(room, origin, connected)
        }

        // the exit goes in the room furthest from the start
        const deepest = placed
            .filter(p => !p.room.isConnector)
            .reduce((best, p) => p.depth > best.depth ? p : best)

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

        // spawn the exit at the selected cell
        SceneManager.currentScene.instantiate(new ExitGameObject(), toWorld(cell), 0, new Vector2(70, 70))

        // place the gate and make sure it is before the exit
        const route = this.pathToStart(deepest).filter(p => p.depth >= 2)
        const gated = route.length > 0
            ? route[random.nextInt(route.length)]
            : deepest
        const doorway = gated.entryDoor
        const vertical = doorway.direction === "left" || doorway.direction === "right"
        const half = Room.tileSize / 2
        const rotation = vertical ? Math.PI / 2 : 0
        const hinge = vertical
            ? doorway.position.minus(new Vector2(0, half))
            : doorway.position.minus(new Vector2(half, 0))
        SceneManager.currentScene.instantiate(new GateGameObject(), hinge, rotation)

        // now place the key before the gate
        const reachable = placed.filter(p => !this.isBehind(p, gated) && !p.room.isConnector)
        const away = reachable.filter(p => p.depth > 0)
        const choices = away.length > 0 ? away : reachable
        const keyRoom = choices[random.nextInt(choices.length)]
        const keyCells = keyRoom.room.getFloorCells()
        const keyCell = keyCells[random.nextInt(keyCells.length)]
        const keyPos = keyRoom.room.cellToWorld(keyRoom.origin, keyCell.position.x, keyCell.position.y)

        SceneManager.currentScene.instantiate(new KeyGameObject(), keyPos.minus(new Vector2(20, 20)))

        // now spawn enemies in the rooms
        for (const p of placed) {
            if (p.depth === 0 || p.room.isConnector) continue
            const cells = p.room.getSpawnCells()
            const count = Math.min(cells.length, 1 + Math.floor(cells.length / 4))
            for (let i = 0; i < count; i++) {
                const cell = cells.splice(random.nextInt(cells.length), 1)[0]
                const def = random.nextWeighted(EnemyDefinitions)
                const position = p.room.cellToWorld(p.origin, cell.position.x, cell.position.y)
                SceneManager.currentScene.instantiate(new EnemyGameObject(def), position)
            }
        }

        return placed
    }

    tryPlaceRoom(door, templates, occupied, tileSize, random = GameSession.randomD) {
        for (const Template of this.shuffled(templates, random)) {
            const room = new Template()
            // max 2 connectors in a row
            if (Template.isConnector && door.placedRoom.chain >= 2) continue

            const doorways = room.getDoorways()
            const matches = doorways.filter(d => d.direction === DungeonBuilderComponent.opposite[door.direction])
            // skip if no matching doorways
            if (matches.length === 0) continue

            const incomingDoor = matches[random.nextInt(matches.length)]
            const origin = door.position.minus(incomingDoor.localPosition)

            const keys = this.floorTiles(room, origin, tileSize)
            if (keys.some(k => occupied.has(k))) continue

            return { room, doorways, incomingDoor, origin, keys }
        }
        return null
    }

    pathToStart(room) {
        const path = []
        for (let r = room; r; r = r.parent) path.push(r)
        return path
    }

    isBehind(room, gatedRoom) {
        for (let r = room; r; r = r.parent) {
            if (r === gatedRoom) return true
        }
        return false
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

    shuffled(list, random = GameSession.randomD) {
        // Fisher-Yates shuffle algorithm
        const copy = [...list]
        for (let i = copy.length - 1; i > 0; i--) {
            const j = random.nextInt(i + 1)
                ;[copy[i], copy[j]] = [copy[j], copy[i]]
        }
        return copy
    }


}