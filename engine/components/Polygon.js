class Polygon extends Component {

    points = []
    fillstyle = "magenta"

    draw(ctx) {
        const transform = this.transform
        ctx.save()
        const position = transform.position

        ctx.translate(position.x, position.y)
        ctx.scale(transform.scale.x, transform.scale.y)
        ctx.rotate(transform.rotation)

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


