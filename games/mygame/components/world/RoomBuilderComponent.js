class RoomBuilderComponent extends Component {
    buildRoom(room, roomWorldPos) {
        const floor = room.floor
        const worldFloorPos = roomWorldPos.plus(floor.position)
        const floorObject = SceneManager.currentScene.instantiate(new FloorGameObject(), worldFloorPos, floor.rotation ?? 0, floor.scale.clone())
        floorObject.getComponent(Polygon).points = floor.points.map(point => point.clone())

        for (const wall of room.walls) {
            this.createWall(wall, roomWorldPos)
        }

        for (const doorway of room.doorways) {
            if (!doorway.active) {
                this.createWall(doorway.blocker, roomWorldPos)
            }
        }
    }

    createWall(wall, roomWorldPos) {
        const position = roomWorldPos.plus(wall.position)
        SceneManager.currentScene.instantiate(new WallGameObject(), position, wall.rotation ?? 0, wall.scale.clone())
    }
}
