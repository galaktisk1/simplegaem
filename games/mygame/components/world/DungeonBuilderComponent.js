class DungeonBuilderComponent extends Component {
    static opposite = { left: "right", right: "left", up: "down", down: "up" }
    start() {
        this.tileSize = Room.tileSize
        this.roomBuilder = this.gameObject.getComponent(RoomBuilderComponent)
        this.random = GameSession.randomD
        this.populator = this.gameObject.getComponent(DungeonPopulatorComponent)
    }

    /*
    * Generates a connected dungeon layout
    * Starting from one Square room, then selects a random 
    * available doorway and tries to attach a new room

    * Rooms cannot overlap existing floor tiles (occupied)
    * Successful placement give unused doorways to frontier
    * connector rooms count towards the depth of the dungeon, but not max rooms

    * @param {Vector2} startPos - The starting position of the dungeon
    * @param {number} [maxRooms=7] - The maximum number of non-connector rooms to place
    * @returns {Array} An array of placed rooms with their positions and connections
    */
    planDungeon(startPos, maxRooms = 7) {

        // initialize sets and arrays to track occupied tiles and dead ends
        const occupied = new Set()
        const deadEnds = []

        // establish starting room,
        // template rooms available for placement
        // description of data that each room will get (start)
        // mark the starting room's floor tiles as occupied
        const startRoom = new SquareRoom()
        const templates = [LRoom, LargeCavernRoom, CubiclesRoom, HallwayRoom, TJunctionRoom, CrossroadsRoom]
        const start = { room: startRoom, origin: startPos, depth: 0, connected: [], parent: null, entryDoor: null, chain: 0 }
        for (const key of this.floorTiles(startRoom, startPos, this.tileSize)) occupied.add(key)
        // add the starting room to the placed rooms list and set the initial real room count
        const placed = [start]
        let realRooms = 1

        // initialize the frontier with the doorways of the starting room
        const frontier = []
        for (const door of startRoom.getDoorways()) {
            frontier.push({
                placedRoom: start,
                position: startPos.plus(door.localPosition),
                direction: door.direction,
                gridPosition: door.gridPosition
            })
        }

        // main loop to place rooms until the maximum number of real rooms is reached or no more frontier doors are available
        while (realRooms < maxRooms && frontier.length > 0 && placed.length < maxRooms * 3) {
            // take a random door from the frontier
            const index = this.random.nextInt(frontier.length)
            const door = frontier.splice(index, 1)[0]
            if (!door) continue

            // attempt to place a new room at the selected door
            const fit = this.tryPlaceRoom(door, templates, occupied, this.tileSize, this.random)
            // if the room doesn't fit, mark the door as a dead end and continue
            if (!fit) {
                deadEnds.push(door)
                continue
            }
            // mark the floor tiles of the new room as occupied
            const { room: newRoom, doorways, incomingDoor, origin: newOrigin, keys } = fit
            for (const key of keys) occupied.add(key)

            // define what a connector is (a room that connects other rooms but doesn't count as a real room)
            const isConnector = newRoom.isConnector
            // create a new placed room object with its properties and add it to the placed list
            const newPlaced = { room: newRoom, origin: newOrigin, depth: door.placedRoom.depth + 1, connected: [incomingDoor.gridPosition], parent: door.placedRoom, entryDoor: door, chain: isConnector ? door.placedRoom.chain + 1 : 0 }
            placed.push(newPlaced)
            // increment realRooms if the new room is not a connector room
            if (!isConnector) realRooms++
            // mark the door of the parent room as connected
            door.placedRoom.connected.push(door.gridPosition)

            // add the new room's doors to the frontier, except for the one we came through
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
        // debug log the placed rooms, remaining frontier doors, dead ends, and occupied tiles
        console.log(placed, frontier, deadEnds, occupied)
        return placed
    }

    buildDungeon(startPos) {
        const placed = this.planDungeon(startPos)
        for (const { room, origin, connected } of placed) {
            this.roomBuilder.buildRoom(room, origin, connected)
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