class DungeonBuilderComponent extends Component {

    buildDungeon(startPos) {
        const roomBuilder = this.gameObject.getComponent(RoomBuilderComponent)
        const openDoors = roomBuilder.buildRoom(new LRoom(), startPos)
        // Build L - room → find an open left - facing doorway
        //      → subtract the square’s local doorway position(600, 300)
        //      → build a new SquareRoom at that origin
        const leftDoor = openDoors.find(door => door.direction === "left")
        if (leftDoor) {
            const newOrigin = leftDoor.position.minus(new Vector2(600, 300))
            roomBuilder.buildRoom(new SquareRoom(), newOrigin, { x: 2, y: 1 })
        }
        
        

    }
}