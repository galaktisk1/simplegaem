class LaserController extends Component {

    update() { 
        const laserpos = this.transform.position
        const laser = this.gameObject
        const shippos = this.player.transform.position
        const distanceToShip = laserpos.distanceTo(shippos)
        laserpos.y -= 1

        if (distanceToShip > 250) {
            laser.destroy()
        }
    }
}