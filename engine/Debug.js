class Debug {
    static enabled = false
    static commands = []

    static drawLine(a, b, color = 'red', duration = 0) {
        if (!Debug.enabled) return
        Debug.commands.push({ type: 'line', a, b, color, timeLeft: duration })
    }

    static drawRay(origin, direction, length, color, duration = 0) {
        if (!Debug.enabled) return
        const end = origin.plus(direction.normalized.scaled(length))
        Debug.commands.push({ type: 'line', a: origin, b: end, color, timeLeft: duration })
    }

    static drawCircle(center, radius, color, duration = 0) {
        if (!Debug.enabled) return
        Debug.commands.push({ type: 'circle', center, radius, color, timeLeft: duration })
    }

    static drawPolygon(points, color, duration = 0) {
        if (!Debug.enabled) return
        Debug.commands.push({ type: 'polygon', points, color, timeLeft: duration })
    }

    static logError(txt) 

    static drawAll(ctx) {
        if (!Debug.enabled) return
        const remaining = []
        for (const cmd of Debug.commands) {
            if (cmd.type === 'line') {
                const { a, b, color } = cmd
                ctx.strokeStyle = color
                ctx.beginPath()
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
                ctx.stroke()
            } else if (cmd.type === 'circle') {
                const { center, radius, color } = cmd
                ctx.strokeStyle = color
                ctx.beginPath()
                ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
                ctx.stroke()
            } else if (cmd.type === 'polygon') {
                const { points, color } = cmd
                ctx.strokeStyle = color
                ctx.beginPath()
                for (const point of points) {
                    ctx.lineTo(point.x, point.y)
                }
                ctx.stroke()
            }
            cmd.timeLeft -= Time.unscaledDeltaTime
            if (cmd.timeLeft > 0) remaining.push(cmd)
        }
        Debug.commands = remaining
    }


}