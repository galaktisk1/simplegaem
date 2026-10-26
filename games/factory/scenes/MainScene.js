class MainScene extends Scene{
  constructor(){
    super()
    this.instantiate(new GridGameObject(), new Vector2(-300, -200), 0)
  }
}
