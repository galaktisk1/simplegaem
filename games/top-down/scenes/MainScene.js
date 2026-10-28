class MainScene extends Scene{
  constructor(){
    super()
    this.instantiate(new SquareGameObject(), new Vector2(0,0), 0)
    this.instantiate(new BoxGameObject(), new Vector2(100,0), 0)
  }
}
