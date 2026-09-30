class PopUpManager extends Component {
    placePopup(msg, position, fillStyle = "white", lifetime = 1) {
        const popup = new PopUpGameObject()
        popup.getComponent(TextLabel).fillStyle = fillStyle
        popup.getComponent(PopUpController).showPopup(msg, position, lifetime)
        SceneManager.currentScene.instantiate(popup)
    }
}
