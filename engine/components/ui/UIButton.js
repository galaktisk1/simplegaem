class UIButton extends Component {
    static requires = [UIImage]
    
    interactable = true
    isPressed = false
    
    normalColor = Color.white
    highlightedColor = Color.from32(245, 245, 245)
    pressedColor = Color.from32(200, 200, 200)
    // 128 is half opacity
    disabledColor = Color.from32(200, 200, 200, 128)
    
    onClick = []

    addListener(listener) {
        this.onClick.push(listener)
    }

    isMouseOver() {
        if (!Input.mousePosition) {
            return false
        }

        const mousePosition = this.transform.inverseTransformPoint(Input.mousePosition)
        const rect = this.transform.rect
        return mousePosition.x >= rect.x && mousePosition.x <= rect.x + rect.width &&
            mousePosition.y >= rect.y && mousePosition.y <= rect.y + rect.height
    }

    start() {
        this.image = this.gameObject.getComponent(UIImage)
    }

    update() {
        // disabled
        if (!this.interactable) {
            this.image.tint = this.disabledColor
            return
        }
        const hovered = this.isMouseOver()
        
        // press starts
        if (hovered && Input.getMouseButtonDown(0)) {
            this.isPressed = true
        }
        
        // press ends
        if (Input.getMouseButtonUp(0)) {
            if (this.isPressed && hovered) {
                // forEach runs all click listeners
                this.onClick.forEach(listener => listener())
            }
            this.isPressed = false
        }

        // set tint based on state
        if (this.isPressed && hovered) {
            this.image.tint = this.pressedColor
        } else if (hovered) {
            this.image.tint = this.highlightedColor
        } else {
            this.image.tint = this.normalColor
        }
    }


}