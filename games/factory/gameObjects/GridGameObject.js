class GridGameObject extends GameObject{
    constructor(){
        super("Grid", [], "background")
        this.addComponent(new GridComponent())
    }
}