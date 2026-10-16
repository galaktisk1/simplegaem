class Circle extends Component {
    radius = 0
    fillStyle = "magenta"

    draw(ctx) {
        ctx.save()
        const fullcircle = 2 * Math.PI
        ctx.beginPath()
        ctx.arc(0, 0, this.radius, 0, fullcircle)
        ctx.fillStyle = this.fillStyle
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }
}
