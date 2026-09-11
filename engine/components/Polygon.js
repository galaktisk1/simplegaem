class Polygon extends Component {

    points = []
    fillstyle = "magenta"

    draw(ctx) {
        ctx.save()
        const position = this.transform.position
        ctx.translate(position.x, position.y)
        ctx.rotate(this.transform.rotation)
        ctx.scale(this.transform.scale.x, this.transform.scale.y)
        ctx.beginPath()

        for (const point of this.points) {
            ctx.lineTo(point.x, point.y)
        }
        ctx.fillStyle = this.fillstyle
        ctx.closePath()
        ctx.fill()
        ctx.restore()

    }

}


