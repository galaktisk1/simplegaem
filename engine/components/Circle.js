class Circle extends Component {
    radius = 0
    fillstyle = "magenta"

    draw(ctx) {
        ctx.save()
        const position = this.gameObject.transform.position
        ctx.translate(position.x, position.y)   
        ctx.beginPath()
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI)
        // i want to do a gradient here
        ctx.fillStyle = this.fillstyle
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }
}
