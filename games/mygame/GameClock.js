class GameClock {
    static gameSecondsPerRealSecond = 13 // ArenaClockUtils.h;
    static speed = 1
    static totalSeconds = 8 * 60 * 60
    static minutesPassed = 0
    static hoursPassed = 0

    static get hours() {
        return Math.floor(GameClock.totalSeconds / 3600) % 24
    }
    static get minutes() {
        return Math.floor(GameClock.totalSeconds / 60) % 60
    }
    static get day() {
        return Math.floor((GameClock.totalSeconds) / 86400)
    }
    /**
     * @param {number} dt Real seconds elapsed this frame
     */
    static tick(dt) {
        const old = GameClock.totalSeconds
        GameClock.totalSeconds += dt * GameClock.gameSecondsPerRealSecond * GameClock.speed
        const now = GameClock.totalSeconds
        GameClock.minutesPassed = Math.floor(now / 60) - Math.floor(old / 60)
        GameClock.hoursPassed = Math.floor(now / 3600) - Math.floor(old / 3600)
    }
}