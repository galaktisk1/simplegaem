class BackgroundDrawComponent extends Component {
    draw(ctx) {
        // fill the entire screen 
        ctx.save()
        ctx.fillStyle = "black"
        ctx.translate(0, 0)
        ctx.beginPath()
        ctx.lineTo(0, 0)
        ctx.lineTo(ctx.canvas.width, 0)
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height)
        ctx.lineTo(0, ctx.canvas.height)
        ctx.fill()
        ctx.restore()
    }
}