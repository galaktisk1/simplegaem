class RoomGeneration {
    static generate(room) {
        const width = room.width
        const height = room.height
        const thickness = room.wall
        const halfWall = thickness / 2
        const center = new Vector2(width / 2, height / 2)
        const floorscale = new Vector2(center.x - thickness, center.y - thickness)

        const top = halfWall
        const bottom = height - halfWall
        const left = halfWall
        const right = width - halfWall

        const walls = [
            { position: new Vector2(center.x, top), rotation: 0, scale: new Vector2(center.x, halfWall) },
            { position: new Vector2(center.x, bottom), rotation: 0, scale: new Vector2(center.x, halfWall) },
            { position: new Vector2(left, center.y), rotation: 0, scale: new Vector2(halfWall, floorscale.y) },
            { position: new Vector2(right, center.y), rotation: 0, scale: new Vector2(halfWall, floorscale.y) }
        ]

        return {
            floor: { position: center, rotation: 0, scale: floorscale },
            walls: walls
        }
    }
}
