// https://github.com/afritz1/OpenTESArena/wiki/Movement has a movement example:
    /**
     * dist <- speed
        if backward then dist <- dist / 2
        if pc.swimming and not pc.inBoat then
        if pc.race == ARGONIAN then dist <- dist / 2 else dist <- dist / 4
        endif
        pc.move(<corresponding angle>, dist * speedMod)
        endif
    */
   // im thinking of how i could use this later for more complex movement


class PlayerUpdateComponent extends Component {
    speed
    
    start() {
        this.gameObject.transform.position = new Vector2(250, 250)
        this.position = this.gameObject.transform.position
        this.speed = 1
        instantiate(new LightingGameObject(this.gameObject))
    }

    update() {
        if (Input.keysDown.includes("ArrowUp") || Input.keysDown.includes("KeyW")) {
            this.position.y -= this.speed
        }
        if (Input.keysDown.includes("ArrowDown") || Input.keysDown.includes("KeyS")) {
            this.position.y += this.speed
        }
        if (Input.keysDown.includes("ArrowLeft") || Input.keysDown.includes("KeyA")) {
            this.position.x -= this.speed
        }
        if (Input.keysDown.includes("ArrowRight") || Input.keysDown.includes("KeyD")) {
            this.position.x += this.speed
        }
    }
    
}
