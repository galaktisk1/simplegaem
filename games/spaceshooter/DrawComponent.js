class DrawComponent extends Component {


    draw(ctx) {
        let position = this.gameObject.components[0].position
        // signal to context i am going to draw something
        ctx.save()

        // set Center of object
        ctx.translate(position.x, position.y)
        // draw a shape at the center
        ctx.lineTo(0, -100)
        ctx.lineTo(-80, 50)
        ctx.lineTo(-40, 100)
        ctx.lineTo(40, 100)
        ctx.lineTo(80, 50)

        ctx.fillStyle = "turquoise"
        ctx.fill()
        // signal that i am done drawing 
        ctx.restore()
    }
}