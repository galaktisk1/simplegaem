// a warm glow around the lantern: a radial gradient added onto what's beneath it
class LanternGlow extends Component {
    radius = 160

    color = "150, 210, 255"

    draw(ctx) {
        ctx.save()
        // "lighter" adds light to the colors underneath instead of covering them
        ctx.globalCompositeOperation = "lighter"
        // brightest at the lantern (0, 0), fading to nothing at the radius
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius)
        glow.addColorStop(0, `rgba(${this.color}, 0.35)`)
        glow.addColorStop(1, `rgba(${this.color}, 0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
        ctx.fill()
        // save and restore put "lighter" back, so nothing else gets drawn this way
        ctx.restore()
    }
}