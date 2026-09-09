class LightingGameObject extends GameObject {
    constructor(player) {
        super()
        this.playerLight = {}
        this.player = player
        this.addComponent(new LightingDrawComponent())
    }
}