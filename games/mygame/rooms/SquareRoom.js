class SquareRoom {
    floor = {
        points: Assets.square,
        position: new Vector2(300, 300),
        scale: new Vector2(300, 300)
    }
    walls = [
        { position: new Vector2(300, 10), scale: new Vector2(300, 10) },
        { position: new Vector2(300, 590), scale: new Vector2(300, 10) },
        { position: new Vector2(10, 120), scale: new Vector2(10, 100) },
        { position: new Vector2(10, 480), scale: new Vector2(10, 100) },
        { position: new Vector2(590, 120), scale: new Vector2(10, 100) },
        { position: new Vector2(590, 480), scale: new Vector2(10, 100) }
    ]
    doorways = [
        {
            position: new Vector2(0, 300), direction: "left", width: 160,
            active: false,
            blocker: { position: new Vector2(10, 300), scale: new Vector2(10, 80) }
        },
        {
            position: new Vector2(600, 300), direction: "right", width: 160,
            active: true,
            blocker: { position: new Vector2(590, 300), scale: new Vector2(10, 80) }
        }
    ]
}
