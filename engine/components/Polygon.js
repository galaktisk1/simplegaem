class Polygon extends Component {

    points = []
    fillStyle = "magenta"

    draw(ctx) {
        const transform = this.transform
        ctx.save()
        const position = transform.position

        ctx.translate(position.x, position.y)
        ctx.rotate(transform.rotation)
        ctx.scale(transform.scale.x, transform.scale.y)

        ctx.beginPath()

        for (const point of this.points) {
            ctx.lineTo(point.x, point.y)
        }
        ctx.fillStyle = this.fillStyle
        ctx.closePath()
        ctx.fill()
        ctx.restore()

    }

}


