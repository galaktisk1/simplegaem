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
        return {
            x: Engine.letterBoxingWidth / 2,
            y: Engine.letterBoxingHeight / 2,
            width: Engine.canvas.width - Engine.letterBoxingWidth,
            height: Engine.canvas.height - Engine.letterBoxingHeight
        };
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
        // p is the parent rect, the box im laying out within
        const p = this.parentRect;

        // map the anchor points to actual positions within the parent rect
        const minX = p.x + this.anchorMin.x * p.width;
        const maxX = p.x + this.anchorMax.x * p.width;
        const minY = p.y + this.anchorMin.y * p.height;
        const maxY = p.y + this.anchorMax.y * p.height;

        // calculate the span of the anchors within the parent rect
        const spanX = maxX - minX;
        const spanY = maxY - minY;

        // calculate the final width and height including the size delta
        const width = spanX + this.sizeDelta.x;
        const height = spanY + this.sizeDelta.y;

        // calculate the reference point within the span of the anchors
        const refX = minX + spanX / 2;
        const refY = minY + spanY / 2;

        // apply the anchored position offset to the reference point
        const pivotX = refX + this.anchoredPosition.x;
        const pivotY = refY + this.anchoredPosition.y;

        // return the calculated layout including pivot and size
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