class Engine {
    static canvas
    static ctx
    static layers = ["default", "UI"]
    static aspectRatio
    static cameraWidthInWorldSpace
    static letterBoxingWidth = 0
    static letterBoxingHeight = 0

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
            Engine.aspectRatio = settings.aspectRatio
            Engine.cameraWidthInWorldSpace = settings.cameraWidthInWorldSpace
        }

        requestAnimationFrame(Engine.gameLoop)
    }

    static gameLoop() {
        Engine.updateViewport()
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
        SceneManager.currentScene.draw(Engine.ctx)
    }

    // The same aspect ratio logic from class
    // but moved to be an Engine level method 
    // instead of being within the Scene class
    static updateViewport() {
        // update the canvas size to match the window size
        if (Engine.canvas.width !== window.innerWidth || Engine.canvas.height !== window.innerHeight) {
            Engine.canvas.width = window.innerWidth
            Engine.canvas.height = window.innerHeight
        }

        // aspect ratio handling for letterboxing
        Engine.letterBoxingWidth = 0
        Engine.letterBoxingHeight = 0
        if (Engine.aspectRatio) {
            const currentAspectRatio = Engine.canvas.width / Engine.canvas.height
            if (Engine.aspectRatio > currentAspectRatio) {
                const maxHeight = Engine.canvas.width / Engine.aspectRatio
                Engine.letterBoxingHeight = Engine.canvas.height - maxHeight
            }
            else if (Engine.aspectRatio < currentAspectRatio) {
                const maxWidth = Engine.canvas.height * Engine.aspectRatio
                Engine.letterBoxingWidth = Engine.canvas.width - maxWidth
            }
        }
    }
}