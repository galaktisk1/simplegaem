class RectGameObject extends GameObject {

    constructor(name, tags, layer) {
        super(name, tags, layer);
        this.components[0] = new RectTransformC();
    }
}