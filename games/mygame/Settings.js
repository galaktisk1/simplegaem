class Settings {
    static layers = ["default", "background", "world", "items", "characters", "lighting", "spells", "popups", "UI"]
    static collisionLayers = [
        // default can collide with world, items, and characters
        //["default", "world", "items", "characters"],
        ["default", "world"],
        ["default", "items"],
        ["default", "characters"],
        // world can collide with items and characters
        //["world", "items", "characters"],
        ["world", "items"],
        ["world", "characters"],
        // items can collide with characters
        ["items", "characters"],
        // characters can collide with nothing specific (or themselves)
        // ["characters"]
    ]
}
