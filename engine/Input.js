class Input {

    static keysDown = []

    static keydown(event) {
        console.log(event)
        if (!Input.keysDown.includes(event.code)) {
            Input.keysDown.push(event.code)
        }
    }

    static keyup(event) {
        let index = Input.keysDown.indexOf(event.code)
        Input.keysDown.splice(index,1)
    }

}