class HUDController extends Component {

    buildBar(color, position, size, fillMethod, getCurrent, getMax) {
        const background = new GameObject("Bar Background");
        background.layer = "UI";

        background.addComponent(new RectTransform(), {
            anchorMin: Vector2.bottomLeft,
            anchorMax: Vector2.bottomLeft,
            pivot: Vector2.bottomLeft,
            sizeDelta: size,
            anchoredPosition: position
        });

        background.addComponent(new UIImage(), {
            color: Color.from32(30, 30, 30)
        });

        const fill = new GameObject("Bar Fill");
        fill.layer = "UI";
        fill.addComponent(new RectTransform(), {
            anchorMin: new Vector2(0, 0),
            anchorMax: new Vector2(1, 1),
            sizeDelta: new Vector2(0, 0)
        });

        fill.transform.parent = background.transform;

        const fillImage = fill.addComponent(new UIImage(), {
            color: color,
            fillMethod: fillMethod
        });

        SceneManager.currentScene.instantiate(background)
        SceneManager.currentScene.instantiate(fill)
        const statBar = background.addComponent(new StatBar());
        statBar.init(fillImage, getCurrent, getMax);
        return statBar;
    }

    start() {
        this.player = GameObject.find("Player")
        if (!this.player) return
        this.health = this.player.getComponent(Health)
        this.attributes = this.player.getComponent(Attributes)
        this.healthBar = this.buildBar(Color.red, new Vector2(20, -20), new Vector2(20, 120), "vertical", () => this.health.currentHealth, () => this.health.maxHealth)
        this.xpBar = this.buildBar(Color.yellow, new Vector2(20, -148), new Vector2(80, 6), "horizontal", () => this.attributes.experienceIntoLevel, () => this.attributes.experienceForLevel)
    }
}