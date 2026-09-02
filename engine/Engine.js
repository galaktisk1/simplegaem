class Engine { 
    static canvas 
    static ctx 
    static currentScene

    static start() { 
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")
        

        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)

        Engine.currentScene.start()

        requestAnimationFrame(Engine.gameLoop)
    }

    static gameLoop() {
        Engine.update()
        Engine.draw()
        requestAnimationFrame(Engine.gameLoop)
    }

    static update() {
        //update()
        Engine.currentScene.update()
    }

    static draw() {
        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight

        Engine.currentScene.draw(Engine.ctx)
    }

}