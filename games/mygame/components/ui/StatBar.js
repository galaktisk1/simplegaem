class StatBar extends Component {
    fill = null
    getCurrent = null
    getMax = null

    init(fill, getCurrent, getMax) {
        this.fill = fill
        this.getCurrent = getCurrent
        this.getMax = getMax
    }
    update() {
        if (this.fill && this.getCurrent && this.getMax) {
            this.fill.fillAmount = this.getCurrent() / this.getMax()
        }
    }
}