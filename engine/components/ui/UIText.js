class UIText extends Component {
    static requires = [RectTransform]

    text = ""
    color = Color.white
    font = "20px Arial"
    // top left default alignment
    horizontal = "left" // "left", "center", "right"
    vertical = "top" // "top", "middle", "bottom"

    draw(ctx) {
        ctx.save()
        // solve rectangle alignment for text
        const rect = this.transform.rect
        
        let x = null
        if (this.horizontal === "left") {
            x = rect.x
        } else if (this.horizontal === "center") {
            x = rect.x + rect.width / 2
        } else {
            x = rect.x + rect.width
        }

        let y = null
        if (this.vertical === "top") {
            y = rect.y
        } else if (this.vertical === "middle") {
            y = rect.y + rect.height / 2
        } else {
            y = rect.y + rect.height
        }
        
        // same as TextLabel vvv
        ctx.fillStyle = this.color.toString()
        ctx.font = this.font
        ctx.textAlign = this.horizontal
        ctx.textBaseline = this.vertical
        ctx.fillText(this.text, x, y)
        ctx.restore()
    }
}