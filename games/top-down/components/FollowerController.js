class FollowerController extends Component{
    currentVelocity = Vector2.zero
    smoothTime = 0.5
    maxSpeed = 100
    offset = new Vector2(0,-50)
    start(){
        this.target = GameObject.find("SquareGameObject")
    }
    update(){
        if(this.target){
            const targetPosition = this.target.transform.position.plus(this.offset)
            this.transform.position = Vector2.smoothDamp(this.transform.position, targetPosition, this.currentVelocity, this.smoothTime, this.maxSpeed, Time.deltaTime)
        }
    }
}
