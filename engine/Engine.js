class Engine {
    static canvas
    static ctx
    static layers = ["default", "UI"]

    static start(nextScene, settings) {
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")

        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)

        addEventListener("mousedown", Input.mousedown)
        addEventListener("mouseup", Input.mouseup)
        addEventListener("mousemove", Input.mousemove)
        // remember F12 or ctrl shift I to open devtools
        addEventListener("contextmenu", e=>e.preventDefault())

        SceneManager.nextScene = nextScene
        if (settings) {
            Engine.layers = settings.layers
        }

        requestAnimationFrame(Engine.gameLoop)
    }

    static gameLoop() {
        SceneManager.update()
        Engine.update()
        Engine.draw()

        Time.update()
        Input.update()

        requestAnimationFrame(Engine.gameLoop)
    }

    static update() {
        SceneManager.currentScene.start()
        SceneManager.currentScene.update()
    }

    static draw() {
        if (Engine.canvas.width !== window.innerWidth || Engine.canvas.height !== window.innerHeight) {
            Engine.canvas.width = window.innerWidth
            Engine.canvas.height = window.innerHeight
        }

        SceneManager.currentScene.draw(Engine.ctx)
    }

}