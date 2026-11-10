class ExperienceUI extends Component {
    start() {
        this.player = GameObject.find("Player")
        if (!this.player) return;
        this.attributes = this.player.getComponent(Attributes);
    }
    draw(ctx) {
        if (!this.attributes) return;
        const x = 20;
        const y = Engine.canvas.height - 20;
        ctx.fillStyle = "white"
        ctx.font = "20px Arial"
        ctx.fillText(`Level ${this.attributes.level}   XP ${this.attributes.currentExperience}`, x, y)
    }
}