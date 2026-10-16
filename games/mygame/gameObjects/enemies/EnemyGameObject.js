// general enemy class that can make any enemy based on its definition
class EnemyGameObject extends GameObject{
    constructor(definition){
        super(definition.name, ["Enemy"], "characters")
        this.definition = definition
        this.visualChildren = []
        this.visualChildrenCreated = false
        this.addComponent(new Polygon(), { fillStyle: definition.fillStyle, points: definition.points })
        
        this.addComponent(new Health(), {
            maxHealth: definition.maxHealth,
            currentHealth: definition.maxHealth,
        })
        this.addComponent(new MovementComponent())
        this.addComponent(new EnemyController(), {
            speed: definition.movementSpeed,
        })
        this.transform.scale = definition.scale.clone()
        this.transform.rotation = definition.rotation ?? 0
    }

    start() {
        if (!this.visualChildrenCreated) {
            for (const childDefinition of this.definition.children ?? []) {
                const child = new GameObject(childDefinition.name, [], this.layer)
                child.addComponent(new Polygon(), {
                    fillStyle: childDefinition.fillStyle,
                    points: childDefinition.points.map(point => point.clone()),
                })
                child.transform.setParent(this.transform)
                child.transform.rotation = childDefinition.rotation ?? 0
                instantiate(child, childDefinition.position.clone())
                this.visualChildren.push(child)
            }
            this.visualChildrenCreated = true
        }
        super.start()
    }

    destroy() {
        for (const child of this.visualChildren) {
            child.destroy()
        }
        super.destroy()
    }
}
