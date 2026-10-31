class Time { 
    static deltaTime = 1 / 60
    static time = 0
    static timeSinceStart = 0

    static update() { 
        Time.time += Time.deltaTime
        Time.timeSinceStart += Time.deltaTime
    }
}