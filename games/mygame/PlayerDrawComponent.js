class PlayerDrawComponent extends Component {

    
    draw(ctx) {
        let position = this.gameObject.transform.position

        ctx.save()
        ctx.translate(position.x, position.y)
        
        // player circle
        ctx.beginPath()
        ctx.arc(0, 0, 50, 0, Math.PI * 2)
        ctx.fillStyle = "grey"
        ctx.fill()
        ctx.closePath()

        // lantern
        ctx.beginPath()
        ctx.fillStyle = "yellow"
        ctx.moveTo(-48, -10)
        ctx.lineTo(-28, -10)
        ctx.lineTo(-28, 10)
        ctx.lineTo(-48, 10)
        ctx.closePath()

        ctx.fill()
        ctx.restore()
    }
}