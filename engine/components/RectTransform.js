class RectTransform extends Transform {
    anchorMin = new Vector2(0.5, 0.5)
    anchorMax = new Vector2(0.5, 0.5)
    pivot = new Vector2(0.5, 0.5)
    anchoredPosition = new Vector2(0, 0)
    sizeDelta = new Vector2(100, 100)

    // static enums for edges and axes
    static edge = Object.freeze({
        left: 0,
        right: 1,
        top: 2,
        bottom: 3
    })

    static axis = Object.freeze({
        horizontal: 0,
        vertical: 1
    })

    get offsetMin() {
        return this.anchoredPosition.minus(Vector2.scale(this.sizeDelta, this.pivot))
    }

    /** @param {Vector2} value */
    set offsetMin(value) { // top left corner
        const offset = value.minus(this.anchoredPosition.minus(Vector2.scale(this.sizeDelta, this.pivot)))
        this.sizeDelta = this.sizeDelta.minus(offset)
        this.anchoredPosition = this.anchoredPosition.plus(Vector2.scale(offset, Vector2.one.minus(this.pivot)))
    }

    get offsetMax() {
        return this.anchoredPosition.plus(Vector2.scale(this.sizeDelta, Vector2.one.minus(this.pivot)))
    }

    /** @param {Vector2} value */
    set offsetMax(value) { // bottom right corner
        const change = value.minus(this.anchoredPosition.plus(Vector2.scale(this.sizeDelta, Vector2.one.minus(this.pivot))))
        this.sizeDelta = this.sizeDelta.plus(change)
        this.anchoredPosition = this.anchoredPosition.plus(Vector2.scale(change, this.pivot))
    }

    get parentRect() {
        if (this.parent instanceof RectTransform) {
            return this.parent.rect;
        }
        return new Rect(
            Engine.letterBoxingWidth / 2,
            Engine.letterBoxingHeight / 2,
            Engine.canvas.width - Engine.letterBoxingWidth,
            Engine.canvas.height - Engine.letterBoxingHeight
        );
    }

    get rect() {
        const layout = this.calculateLayout();

        return new Rect(
            -this.pivot.x * layout.width,
            -this.pivot.y * layout.height,
            layout.width,
            layout.height
        )
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
        const refX = minX + spanX * this.pivot.x;
        const refY = minY + spanY * this.pivot.y;

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

    getWorldRect() {
        const corners = this.getWorldCorners([])
        const minX = Math.min(...corners.map(corner => corner.x))
        const minY = Math.min(...corners.map(corner => corner.y))
        const maxX = Math.max(...corners.map(corner => corner.x))
        const maxY = Math.max(...corners.map(corner => corner.y))

        return new Rect(minX, minY, maxX - minX, maxY - minY)
    }

    setAnchors(position) {
        this.anchorMin = position.clone();
        this.anchorMax = position.clone();
    }

    setPivotAndAnchors(position) {
        this.pivot = position.clone();
        this.setAnchors(position);
    }

    setInsetAndSizeFromParentEdge(edge, inset, size) {
        const edges = RectTransform.edge
        const axis = (edge === edges.top || edge === edges.bottom) ? 1 : 0;
        const end = edge === edges.right || edge === edges.bottom
        const anchorValue = end ? 1 : 0

        // set anchormin and anchor max to be anchored to the new edge
        let anchor = this.anchorMin;
        anchor[axis] = anchorValue;
        this.anchorMin = anchor;
        anchor = this.anchorMax;
        anchor[axis] = anchorValue;
        this.anchorMax = anchor;

        // set the size. anchors are together, size and sizedelta are the same here
        let sizeD = this.sizeDelta;
        sizeD[axis] = size;
        this.sizeDelta = sizeD;

        // set the inset
        let positionCopy = this.anchoredPosition
        positionCopy[axis] = end
            ? -inset - size * (1 - this.pivot[axis])
            : inset + size * this.pivot[axis]
        this.anchoredPosition = positionCopy
    }

    /** @param {RectTransform.axis} axis @param {number} size */
    setSizeWithCurrentAnchors(axis, size) {
        const parent = this.parentRect
        const parentSize = axis === RectTransform.axis.horizontal
            ? parent.width
            : parent.height

        const anchorSpan = parentSize * (this.anchorMax[axis] - this.anchorMin[axis])
        this.sizeDelta[axis] = size - anchorSpan
    }

    getRectInParentSpace() {
        const parent = this.parentRect
        const { pivotX, pivotY, width, height } = this.calculateLayout()

        return new Rect(
            pivotX - width * this.pivot.x - parent.x,
            pivotY - height * this.pivot.y - parent.y,
            width,
            height
        )
    }

    /** @param {Vector2[]} fourCorners */
    getLocalCorners(fourCorners = []) {
        const { x, y, width, height } = this.rect
        const right = x + width
        const bottom = y + height

        fourCorners[0] = new Vector2(x, y)
        fourCorners[1] = new Vector2(x, bottom)
        fourCorners[2] = new Vector2(right, bottom)
        fourCorners[3] = new Vector2(right, y)
        return fourCorners
    }

    /** @param {Vector2[]} fourCorners */
    getWorldCorners(fourCorners) {
        const corners = this.getLocalCorners(fourCorners)
        const matrix = this.getWorldMatrix()

        for (let i = 0; i < 4; i++) {
            const point = matrix.transformPoint(corners[i])
            corners[i] = new Vector2(point.x, point.y)
        }

        return corners
    }

    containsScreenPoint(point) {
        if (!point) return false
        const local = this.inverseTransformPoint(point)
        return this.rect.contains(local)
    }

    get localTop() {
        return this.getRectInParentSpace().yMin
    }

    get localBottom() {
        return this.getRectInParentSpace().yMax
    }

    get localLeft() {
        return this.getRectInParentSpace().xMin
    }

    get localRight() {
        return this.getRectInParentSpace().xMax
    }
}