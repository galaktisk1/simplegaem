class PlayerInput extends Component {

    // normalized movement
    get move() {
        const right = (Input.getKey("KeyD") || Input.getKey("ArrowRight")) ? 1 : 0;
        const left = (Input.getKey("KeyA") || Input.getKey("ArrowLeft")) ? 1 : 0;
        const down = (Input.getKey("KeyS") || Input.getKey("ArrowDown")) ? 1 : 0;
        const up = (Input.getKey("KeyW") || Input.getKey("ArrowUp")) ? 1 : 0;

        let x = right - left;
        let y = down - up;

        return new Vector2(x, y).normalized;
    }

    get aimPoint() {
        return Input.mouseWorldPosition;
    }

    get attackPressed() {
        return Input.getMouseButtonDown(0);
    }

    get castPressed() {
        return Input.getMouseButtonDown(2);
    }

    get interactPressed() {
        return Input.getKeyDown("Space");
    }
}