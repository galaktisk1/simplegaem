class TextLabel extends Component {
    fillStyle = "black"
    text = "[BLANK]"
    font = "10px Arial" // (size)px (font-family)
    textAlign = "left"


    
    draw(ctx) {
        ctx.save()
        ctx.fillStyle = this.fillStyle
        ctx.font = this.font
        ctx.textAlign = this.textAlign
        ctx.fillText(this.text, 0, 0)
        ctx.restore()
    }


}