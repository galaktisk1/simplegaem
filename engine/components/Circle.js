class Circle extends Component {
    radius = 0
    fillstyle = "magenta"
    useGradient = false

    draw(ctx) {
        ctx.save()
        const position = this.gameObject.transform.position
        ctx.translate(position.x, position.y)   
        ctx.beginPath()
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI)
        // gradient support
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
        if (this.useGradient) {
            const [startColor, endColor] = this.fillstyle
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius)
            gradient.addColorStop(1, startColor ?? "magenta")
            gradient.addColorStop(0, endColor ?? "black")
            ctx.fillStyle = gradient
        } else {
            ctx.fillStyle = this.fillstyle
        }
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }
}