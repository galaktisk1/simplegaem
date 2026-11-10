// Lights what the player can see, and darkens everything else.
// Uses an alpha mask, as in Nicky Case, "Sight & Light" (https://ncase.me/sight-and-light/):
// darkness is painted on a hidden canvas, holes are cut in it where the player can see,
// and that canvas is laid over the game like a sheet of dark glass with holes in it.
class VisionComponent extends Component {
    radius = 750
    // rays stop on the middle line of a wall, so we light half a wall past the edge of what's seen
    wallThickness = 20
    darkness = "rgba(0, 0, 0, 0.95)"

    start() {
        this.player = GameObject.find("Player")
        // the mask: a canvas that is never put on the page, only drawn onto the game
        this.mask = document.createElement("canvas")
    }

    draw(ctx) {
        if (!this.player || this.player.markForDestroy) return
        const origin = this.player.transform.worldPosition
        // the shape the player can see, from the raycasts
        const poly = Raycast.visibilityPolygon(origin, this.radius, SceneManager.currentScene.occluders ?? [])
        const mask = this.mask
        const canvas = ctx.canvas
        if (!mask || !canvas) return

        // keep the mask the same size as the screen, so it lines up when laid over the game
        if (mask.width !== canvas.width || mask.height !== canvas.height) {
            mask.width = canvas.width
            mask.height = canvas.height
        }
        const m = mask.getContext("2d")
        if (!m) return

        // wipe last frame's mask (in plain screen pixels),
        // then draw with the same camera as the game so world positions line up
        m.setTransform(1, 0, 0, 1, 0, 0)
        m.clearRect(0, 0, mask.width, mask.height)
        m.setTransform(ctx.getTransform())

        // 1. paint darkness over everything
        m.globalCompositeOperation = "source-over"
        const R = 10000;
        m.fillStyle = this.darkness
        m.fillRect(origin.x - R, origin.y - R, R * 2, R * 2)

        // 2. cut holes in the darkness: "destination-out" erases instead of painting
        m.globalCompositeOperation = "destination-out"
        m.beginPath()
        this.tracePolygon(m, poly)
        // erase the visible shape
        m.fill()
        // erase a band around its edge, half a wall wide on each side,
        // so the walls you're looking at show through their full thickness
        m.lineWidth = this.wallThickness
        m.lineJoin = "round"
        m.stroke()
        // back to normal painting for next frame
        m.globalCompositeOperation = "source-over"

        // 3. lay the mask over the game; it's screen-sized, so draw it in screen pixels
        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.drawImage(mask, 0, 0)
        ctx.restore()
    }

    // outlines the polygon as a path, ready to fill or stroke
    tracePolygon(ctx, poly) {
        if (poly.length === 0) return
        ctx.moveTo(poly[0].x, poly[0].y)
        for (let i = 1; i < poly.length; i++) {
            ctx.lineTo(poly[i].x, poly[i].y)
        }
        ctx.closePath()
    }
}
