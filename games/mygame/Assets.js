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
    static circle = {
        radius: 1
    }
    static swordArc = [
    new Vector2(0, 0),
    new Vector2(-109.6, -109.6),
    new Vector2(-77.5, -134.2),
    new Vector2(-40.1, -149.7),
    new Vector2(0, -155),
    new Vector2(40.1, -149.7),
    new Vector2(77.5, -134.2),
    new Vector2(109.6, -109.6),
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