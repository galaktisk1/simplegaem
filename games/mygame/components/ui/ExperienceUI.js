class ExperienceUI extends Component {
    start() {
        this.player = GameObject.find("Player")
        if (!this.player) return;
        this.experience = this.player.getComponent(Experience);
    }
    draw(ctx) {
        if (!this.experience) return;
        const x = 20;
        const y = Engine.canvas.height - 20;
        ctx.fillStyle = "white"
        ctx.font = "20px Arial"
        ctx.fillText(`Level ${this.experience.level.current}   XP ${this.experience.currentExperience}`, x, y)
    }
}