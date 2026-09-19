class ExitComponent extends Component {
    beenDoneExited = false
    update() {
        if(!this.beenDoneExited){
            const player = GameObject.find("Player")
            const message = GameObject.find("Message")
            const currentScene = Engine.currentScene
            const exitpos = this.transform.position
            const playerpos = player.transform.position
            const distanceToExit = exitpos.distanceTo(playerpos)
            if (distanceToExit < 60) {
                console.log("exited")
                this.beenDoneExited = true
                message.showMessage("You exit the room")
                // we've got the issue of the player being drawn under the new walls and floor
                // this is only temporary for something to happen on exit
                GameObject.find("Floor").destroy()
                for (const wall of GameObject.findAll("Wall")) {
                    wall.destroy()
                }
                const layout = RoomGeneration.generate(MainScene.room2)
                const floor = layout.floor
                currentScene.instantiate(new FloorGameObject(), floor.position, floor.rotation, floor.scale)
                currentScene.createWalls(layout.walls)
            }
        }
    }
}
