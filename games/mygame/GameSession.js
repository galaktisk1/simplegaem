class GameSession {
    // for game specific state, reset on new game/session start
    static gold = 0
    static playerinventory = []
    static playerhealth
    static playermaxhealth = 100
    static playerexp = 0
    static floor = 0
    static playerlevel = 1
    static seed = "123"
    static seedD = GameSession.seed + ":dungeon"
    static seedL = GameSession.seed + ":loot"
    static seedE = GameSession.seed + ":enemies"
    static randomD = new Seed(GameSession.seedD)
    static randomL = new Seed(GameSession.seedL)
    static randomE = new Seed(GameSession.seedE)
}