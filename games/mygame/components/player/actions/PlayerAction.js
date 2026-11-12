class PlayerAction {
    drainsFatigue = true
    // grab the controller for this action
    constructor(controller) {
        this.controller = controller
    }
    
    // what happens when this action is entered
    enter(arg) { }
    
    // what happens when this action is exited
    exit() { }
    
    // what happens every frame while this action is active
    update() {
        return false
    }
}