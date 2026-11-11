class UIImage extends Component {
    static requires = [RectTransform]

    // do not set image.color anywhere but the gameobject
    color = Color.white
    // set the tint elsewhere to affect the final color
    tint = Color.white
    fillMethod = "none" // vertical or horizontal
    fillAmount = 1 // 0 to 1, only used if fillMethod is not "none"

    draw(ctx) {
        ctx.fillStyle = this.color.multiply(this.tint).toString()
        const rect = this.transform.rect
        let x = rect.x
        let y = rect.y
        let width = rect.width
        let height = rect.height
        let fill = Math.max(0, Math.min(1, this.fillAmount))

        if (this.fillMethod === "vertical") {
            height = rect.height * fill
            y = rect.y + rect.height - height
        } else if (this.fillMethod === "horizontal") {
            width = rect.width * fill
        }

        ctx.fillRect(x, y, width, height)
    }
}