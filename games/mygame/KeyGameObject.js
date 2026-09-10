class KeyGameObject extends GameObject {
    constructor() {
        super()
        this.addComponent(new Polygon(), {
            fillstyle: ['gold', 'orange'],
            points: [
                new Vector2(0, 0),
                new Vector2(40, 0),
                new Vector2(40, 40),
                new Vector2(0, 40),
            ],
            // testing gradients on objects
            useGradient: true,
            gradientDirection: "h"
        })
        this.addComponent(new ItemPickupComponent())
    }
}