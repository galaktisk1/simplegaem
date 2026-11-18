class MainScene extends Scene{
  constructor(){
    super()
    this.instantiate(new SquareGameObject(), new Vector2(0,0), 0)
    this.instantiate(new BoxGameObject(), new Vector2(100,0), 0) 
    this.instantiate(new FollowerGameObject(), new Vector2(50,-50), 0)

    const uiButton = new UIButtonC()
    uiButton.transform.anchorMin = new Vector2(0.5, 0.5)
    uiButton.transform.anchorMax = new Vector2(0.5, 0.5)
    uiButton.transform.offsetUpperLeft = new Vector2(-50, -50)
    uiButton.transform.offsetLowerRight = new Vector2(50, 50)
    this.instantiate(uiButton, new Vector2(0,0), 0, new Vector2(50,50))
  }
}
