class BackgroundDrawComponent extends Component {
    draw(ctx) {
        // fill the entire screen 
        ctx.save()
        ctx.fillStyle = "black"
        ctx.translate(0, 0)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(ctx.canvas.width, 0)
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height)
        ctx.lineTo(0, ctx.canvas.height)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = "#303030"
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(900, 80)
        ctx.lineTo(900, 850)
        ctx.lineTo(0, 850)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }
}