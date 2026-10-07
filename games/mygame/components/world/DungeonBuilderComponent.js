class DungeonBuilderComponent extends Component {

    buildDungeon(startPos) {
        const roomBuilder = this.gameObject.getComponent(RoomBuilderComponent)
        const openDoors = roomBuilder.buildRoom(new SquareRoom(), startPos)
        if (openDoors.length > 0) {
            const existingDoor = openDoors[GameSession.randomD.nextInt(openDoors.length)]
            const nextRoom = new LRoom()
            const opposite = { left: "right", right: "left", up: "down", down: "up" }
            const incomingDoor = nextRoom.getDoorways()
                .find(door => door.direction === opposite[existingDoor.direction])

            if (existingDoor && incomingDoor) {
                const newOrigin = existingDoor.position.minus(incomingDoor.localPosition)
                const nextOpenDoors = roomBuilder.buildRoom(
                    nextRoom,
                    newOrigin,
                    incomingDoor.gridPosition)
            }
        }
        

        

    }
}