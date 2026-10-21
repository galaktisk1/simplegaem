const EnemyDefinitions = {
    rat: {
        name: "Rat",
        fillStyle: "grey",
        points: Assets.triangle,
        scale: new Vector2(15, 15),
        healthMin: 1,
        healthMax: 6,
        movementSpeed: 120,
        // TODO: Add preferred attack distance, damage, and attack cooldown for EnemyController.
        children: [
            {
                name: "RatTail",
                position: new Vector2(0, 0),
                fillStyle: "pink",
                points: [
                    new Vector2(-0.15, 0.8),
                    new Vector2(0.15, 0.8),
                    new Vector2(0.2, 1.6),
                    new Vector2(0.6, 2.2),
                    new Vector2(0.5, 2.3),
                    new Vector2(-0.05, 1.7),
                ],
            },
        ],
    },
    goblin: {
        name: "Goblin",
        fillStyle: "green",
        points: Assets.triangle,
        scale: new Vector2(25, 25),
        healthMin: 1,
        healthMax: 8,
        damageMin: 1,
        damageMax: 5,
        experiencePerHealth: 5,
        experienceBase: 60,
        movementSpeed: 100,
        children: [
            {
                name: "GoblinStick",
                position: new Vector2(1, -0.5),
                rotation: Math.PI / 4,
                fillStyle: "rgb(53, 32, 18)",
                points: [
                    new Vector2(-0.1, 0.5),
                    new Vector2(0.1, 0.5),
                    new Vector2(0.1, 1.5),
                    new Vector2(-0.1, 1.5),
                ],
            },
        ],
    }
}
