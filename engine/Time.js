class Time { 
    static unscaledDeltaTime = 1 / 60
    static time = 0
    static timeScale = 1
    static timeSinceStart = 0

    static update() { 
        Time.time += Time.deltaTime
        Time.timeSinceStart += Time.deltaTime
    }

    static get deltaTime() {
        return Time.unscaledDeltaTime * Time.timeScale
    }
}