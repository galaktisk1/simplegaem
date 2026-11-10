class RectTransform extends Transform {
    anchorMin = new Vector2(0.5, 0.5)
    anchorMax = new Vector2(0.5, 0.5)
    pivot = new Vector2(0.5, 0.5)
    anchoredPosition = new Vector2(0, 0)
    sizeDelta = new Vector2(100, 100)

    get parentRect() {
        if (this.parent instanceof RectTransform) {
            return this.parent.rect;
        }
        return { x: 0, y: 0, width: Engine.canvas.width, height: Engine.canvas.height };
    }

    get rect() {
        const layout = this.calculateLayout();

        return {
            x: -this.pivot.x * layout.width,
            y: -this.pivot.y * layout.height,
            width: layout.width,
            height: layout.height
        };
    }

    calculateLayout() {
        const p = this.parentRect;

        const minX = p.x + this.anchorMin.x * p.width;
        const maxX = p.x + this.anchorMax.x * p.width;
        const minY = p.y + this.anchorMin.y * p.height;
        const maxY = p.y + this.anchorMax.y * p.height;

        const width = (maxX - minX) + this.sizeDelta.x;
        const height = (maxY - minY) + this.sizeDelta.y;

        const refX = minX + (maxX - minX) * this.pivot.x;
        const refY = minY + (maxY - minY) * this.pivot.y;

        const pivotX = refX + this.anchoredPosition.x;
        const pivotY = refY + this.anchoredPosition.y;
        return { pivotX, pivotY, width, height };
    }

    // overriden getLocalMatrix to account for RectTransform layout
    getLocalMatrix() {
        let layout = this.calculateLayout()
        let matrix = new DOMMatrix()
        matrix.translateSelf(layout.pivotX, layout.pivotY)
        matrix.rotateSelf(this.rotation * 180 / Math.PI)
        matrix.scaleSelf(this.scale.x, this.scale.y)
        return matrix
    }
}