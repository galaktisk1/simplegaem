class RoomBuilderComponent extends Component {
    buildRoom(scene) {
        const room1 = { width: 900, height: 850, wall: 80 }
        const layout = RoomGeneration.generate(room1)
        const floor = layout.floor
        scene.instantiate(new FloorGameObject(), floor.position, floor.rotation, floor.scale)
        this.createWalls(layout.walls, scene)
    }

    createWalls(layout, scene) {
        for (const wall of layout) {
            scene.instantiate(new WallGameObject(), wall.position, wall.rotation, wall.scale)
        }
    }
}
