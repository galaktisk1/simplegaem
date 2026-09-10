class Polygon extends Component {

    points = []
    fillstyle = "magenta"
    useGradient = false
    gradientDirection = "h" // "h" or anything, and itll be vertical

    draw(ctx) {
        ctx.save()
        const position = this.transform.position
        ctx.translate(position.x, position.y)
        ctx.rotate(this.transform.rotation)
        ctx.scale(this.transform.scale.x, this.transform.scale.y)
        ctx.beginPath()
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity

        for (const point of this.points) {
            ctx.lineTo(point.x, point.y)

            if (point.x < minX) minX = point.x
            if (point.y < minY) minY = point.y
            if (point.x > maxX) maxX = point.x
            if (point.y > maxY) maxY = point.y
        }
        // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
        if (this.useGradient) {
            let gradient
            if (this.gradientDirection == "h")
                gradient = ctx.createLinearGradient(minX, minY, maxX, minY)
            else
                gradient = ctx.createLinearGradient(minX, minY, minX, maxY)

            const colors = this.fillstyle
            const last = Math.max(colors.length - 1, 1)
            // multi color stops based on the number of colors in the fillstyle
            for (let i = 0; i < colors.length; i++) {
                gradient.addColorStop(i / last, colors[i] ?? "magenta")
            }
            ctx.fillStyle = gradient
        } else {
            ctx.fillStyle = this.fillstyle
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()

    }

}


