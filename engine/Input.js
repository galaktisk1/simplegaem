class Input {

    static keysDown = []

    static keysDownThisFrame = []
    static keysUpThisFrame = []

    static mouseButtonsDown = []
    static mouseButtonsDownThisFrame = []
    static mouseButtonsUpThisFrame = []

    static mousedown(event) {
        if (!Input.mouseButtonsDown.includes(event.button)) {
            Input.mouseButtonsDown.push(event.button)
            Input.mouseButtonsDownThisFrame.push(event.button)
        }
    }

    static mouseup(event) {
        let index = Input.mouseButtonsDown.indexOf(event.button)
        Input.mouseButtonsDown.splice(index, 1)
        Input.mouseButtonsUpThisFrame.push(event.button)
    }

    // hacky mouse position tracking
    static mousePosition = new Vector2(0, 0)

    static mousemove(event) {
        Input.mousePosition.x = event.clientX
        Input.mousePosition.y = event.clientY
    }

    static keydown(event) {
        console.log(event)
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)
            Input.keysDownThisFrame.push(event.code)
        }
    }

    static keyup(event) {
        let index = Input.keysDown.indexOf(event.code)
        Input.keysDown.splice(index, 1)
        Input.keysUpThisFrame.push(event.code)
    }

    static update() {
        Input.keysDownThisFrame = []
        Input.keysUpThisFrame = []
        Input.mouseButtonsDownThisFrame = []
        Input.mouseButtonsUpThisFrame = []
        Input.mousePosition = new Vector2(0, 0)
    }

}