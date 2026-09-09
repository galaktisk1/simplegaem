class LaserPolygon extends Component { 
    draw(ctx) {
        let position = this.gameObject.transform.position
        // signal to context i am going to draw something
        ctx.save()

        // set Center of object
        ctx.translate(position.x, position.y)
        // draw a shape at the center
        ctx.beginPath()
        ctx.moveTo(0, -100/2)
        ctx.lineTo(-80/2, 50/2)
        ctx.lineTo(-40/2, 100/2)
        ctx.lineTo(40/2, 100/2)
        ctx.lineTo(80/2, 50/2)

        ctx.fillStyle = "red"
        ctx.fill()
        // signal that i am done drawing 
        ctx.restore()
    }
}