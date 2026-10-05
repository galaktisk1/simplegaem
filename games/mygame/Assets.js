class Assets {
    static triangle = [
        new Vector2(0, -1),
        new Vector2(-1, 1),
        new Vector2(1, 1)
    ]
    static square = [
        new Vector2(-1, -1),
        new Vector2(-1, 1),
        new Vector2(1, 1),
        new Vector2(1, -1)
    ]

    static floor = {
        points: Assets.square,
        scale: new Vector2(300, 300),
        rotation: 0
    }
    static wall = {
        points: Assets.square,
        // +10 for corners
        scale: new Vector2(310, 10),
        rotation: 0
    }
}