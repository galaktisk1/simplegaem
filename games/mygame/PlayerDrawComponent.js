class PlayerDrawComponent extends Component {

    // draw a circle
    draw(ctx) {
        let position = this.gameObject.components[0].position

        ctx.save()
        ctx.translate(position.x, position.y)
        
        ctx.beginPath()
        ctx.arc(0, 0, 50, 0, Math.PI * 2)
        ctx.fillStyle = "grey"
        ctx.fill()
        
        ctx.restore()
    }
}