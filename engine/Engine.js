class Engine { 
    static canvas 

    static ctx 

    static start() { 
        Engine.canvas = document.querySelector("#canv")
        Engine.ctx = Engine.canvas.getContext("2d")
        

        addEventListener("keydown", Input.keydown)
        addEventListener("keyup", Input.keyup)

        requestAnimationFrame(Engine.gameLoop)
    }

    static gameLoop() {
        Engine.update()
        Engine.draw()
        requestAnimationFrame(Engine.gameLoop)
    }

    static update() {
        update()
    }

    static draw() {
        Engine.canvas.width = window.innerWidth
        Engine.canvas.height = window.innerHeight
        draw(Engine.ctx)
    }

    
}