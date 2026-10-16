class SceneTimerController extends Component {
    startTime

    start() {
        this.startTime = Time.time
    }

    update() {
        const sceneTime = Math.floor((Time.time - this.startTime) * 100) / 100
        const minutes = Math.floor(sceneTime / 60)
        const seconds = (sceneTime - minutes * 60).toFixed(2)
        this.gameObject.getComponent(TextLabel).text = minutes + ":" + seconds
    }
}
