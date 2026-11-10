class UIImage extends Component {
    static requires = [RectTransform]

    // do not set image.color anywhere but the gameobject
    color = Color.white
    // set the tint elsewhere to affect the final color
    tint = Color.white

    draw(ctx) {
        ctx.fillStyle = this.color.multiply(this.tint).toString()
        const rect = this.transform.rect
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
    }
}