class PopUpManager extends Component {
    placePopup(msg, target, fillStyle = "white", lifetime = 1) {
        const popup = new PopUpGameObject()
        popup.getComponent(TextLabel).fillStyle = fillStyle
        popup.getComponent(PopUpController).showPopup(msg, target, lifetime)
        SceneManager.currentScene.instantiate(popup)
    }
}
