class MultiLineTextLabel extends Component {
    fillStyle = "black"
    text = "[BLANK]"
    font = "10px Arial" // (size)px (font-family)
    textAlign = "left"
    maxWidth = 100



    draw(ctx) {
        ctx.save()
        ctx.fillStyle = this.fillStyle
        ctx.font = this.font
        ctx.textAlign = this.textAlign
        let fontHeight = ctx.measureText("").fontBoundingBoxAscent + ctx.measureText("").fontBoundingBoxDescent
        let y = 0
        let safeLine = ""
        let possibleLine = ""
        for (let word of this.text.split(" ")) {
            possibleLine = safeLine ? safeLine + " " + word : word
            if (safeLine && ctx.measureText(possibleLine).width > this.maxWidth) {
                ctx.fillText(safeLine, 0, y)
                y += fontHeight
                safeLine = word
            } else {
                safeLine = possibleLine
            }
        }
        ctx.fillText(safeLine, 0, y)

        ctx.restore()

    }
}
