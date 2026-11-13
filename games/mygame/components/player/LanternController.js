// keeps the lantern floating just off the player, easing toward that spot
class LanternController extends Component {
    minDistance = 105
    maxDistance = 140

    minWait = 5
    maxWait = 10

    smoothTime = 0.15

    bobHeight = 15
    bobSpeed = 3

    start() {
        this.player = GameObject.find("Player")
        this.velocity = Vector2.zero
        this.offset = new Vector2(-this.minDistance, 0)
        this.startCoroutine(this.wander())
    }

    update() {
        if (!this.player || this.player.markForDestroy) return
        const bob = new Vector2(0, Math.sin(Time.time * this.bobSpeed) * this.bobHeight)
        const target = this.player.transform.position.plus(this.offset).plus(bob)
        this.transform.position = Vector2.smoothDamp(
            this.transform.position, target, this.velocity, this.smoothTime, Infinity, Time.deltaTime
        )
    }

    *wander() {
        while (true) {
            const angle = Math.random() * Math.PI * 2
            const distance = this.minDistance + Math.random() * (this.maxDistance - this.minDistance)
            this.offset = new Vector2(Math.cos(angle), Math.sin(angle)).scaled(distance)
            yield new WaitForSeconds(this.minWait + Math.random() * (this.maxWait - this.minWait))
        }
    }
}