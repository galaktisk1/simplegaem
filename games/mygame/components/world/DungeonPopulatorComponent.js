class DungeonPopulatorComponent extends Component { 
    start() {
        this.random = GameSession.randomD
    }

    populateDungeon(placed){
        // calculate deepest
        const deepest = placed
            .filter(p => !p.room.isConnector)
            .reduce((best, p) => p.depth > best.depth ? p : best)

        this.placeExit(placed, deepest)
        let gated = this.placeGate(placed, deepest)
        this.placeKey(placed, deepest, gated)
        this.placeEnemies(placed, deepest)

    }
    
    placeExit(placed, deepest) {
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
    }

    placeGate(placed, deepest) {
        // place the gate and make sure it is before the exit
        const route = this.pathToStart(deepest).filter(p => p.depth >= 2)
        const gated = route.length > 0
            ? route[this.random.nextInt(route.length)]
            : deepest
        this.gated = gated
        // placing that gate
        const doorway = gated.entryDoor
        const vertical = doorway.direction === "left" || doorway.direction === "right"
        const half = Room.tileSize / 2
        const rotation = vertical ? Math.PI / 2 : 0
        const hinge = vertical
            ? doorway.position.minus(new Vector2(0, half))
            : doorway.position.minus(new Vector2(half, 0))
        SceneManager.currentScene.instantiate(new GateGameObject(), hinge, rotation)
        return gated
    }

    placeKey(placed, deepest, gated) {
        // now place the key before the gate
        const reachable = placed.filter(p => !this.isBehind(p, gated) && !p.room.isConnector)
        const away = reachable.filter(p => p.depth > 0)
        const choices = away.length > 0 ? away : reachable
        const keyRoom = choices[this.random.nextInt(choices.length)]
        const keyCells = keyRoom.room.getFloorCells()
        const keyCell = keyCells[this.random.nextInt(keyCells.length)]
        const keyPos = keyRoom.room.cellToWorld(keyRoom.origin, keyCell.position.x, keyCell.position.y)

        SceneManager.currentScene.instantiate(new KeyGameObject(), keyPos.minus(new Vector2(20, 20)))
    }

    placeEnemies(placed, deepest) {
        // now spawn enemies in the rooms
        // , this will be a recurring spawn idea 
        // as soon as dungeons sprawl some more
        for (const p of placed) {
            if (p.depth === 0 || p.room.isConnector) continue
            const cells = p.room.getSpawnCells()
            const count = Math.min(cells.length, 1 + Math.floor(cells.length / 4))
            for (let i = 0; i < count; i++) {
                const cell = cells.splice(this.random.nextInt(cells.length), 1)[0]
                const def = this.random.nextWeighted(EnemyDefinitions)
                const position = p.room.cellToWorld(p.origin, cell.position.x, cell.position.y)
                SceneManager.currentScene.instantiate(new EnemyGameObject(def), position)
            }
        }
    }




    isBehind(room, gatedRoom) {
        for (let r = room; r; r = r.parent) {
            if (r === gatedRoom) return true
        }
        return false
    }

    pathToStart(room) {
        const path = []
        for (let r = room; r; r = r.parent) path.push(r)
        return path
    }
}