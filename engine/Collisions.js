class Collisions {
    static isCollisionPointPolygon(point, gameObject) {
        // move everything into world space
        let worldSpacePoints = []
        for (let point of gameObject.getComponent(Collider).points) {
            worldSpacePoints.push(
                new Vector2(
                    gameObject.transform.getWorldMatrix().transformPoint(point).x,
                    gameObject.transform.getWorldMatrix().transformPoint(point).y
                )
            )
        }
        // find axes for projection
        for (let i = 0; i < worldSpacePoints.length; i++) {
            let point1 = worldSpacePoints[i]
            let point2 = worldSpacePoints[(i + 1) % worldSpacePoints.length]
            let edge = point2.minus(point1).normalized()
            let axis = edge.orthogonal()
            // check for overlap
            let pointProjection = point.dot(axis)
            let polygonProjections = worldSpacePoints.map(p => p.dot(axis))
            if (pointProjection < Math.min(...polygonProjections) || pointProjection > Math.max(...polygonProjections)) {
                return false
            }
        }
        return true
    }

    static isCollisionPolygonPolygon(gameObject1, gameObject2) {
        let worldSpacePoints1 = []
        for (let point of gameObject1.getComponent(Collider).points) {
            worldSpacePoints1.push(
                new Vector2(
                    gameObject1.transform.getWorldMatrix().transformPoint(point).x,
                    gameObject1.transform.getWorldMatrix().transformPoint(point).y
                )
            )
        }
        let worldSpacePoints2 = []
        for (let point of gameObject2.getComponent(Collider).points) {
            worldSpacePoints2.push(
                new Vector2(
                    gameObject2.transform.getWorldMatrix().transformPoint(point).x,
                    gameObject2.transform.getWorldMatrix().transformPoint(point).y
                )
            )
        }
        let allAxes = []
        for (let i = 0; i < worldSpacePoints1.length; i++) {
            let point1 = worldSpacePoints1[i]
            let point2 = worldSpacePoints1[(i + 1) % worldSpacePoints1.length]
            let edge = point2.minus(point1).normalized()
            allAxes.push(edge.orthogonal())
        }
        for (let i = 0; i < worldSpacePoints2.length; i++) {
            let point1 = worldSpacePoints2[i]
            let point2 = worldSpacePoints2[(i + 1) % worldSpacePoints2.length]
            let edge = point2.minus(point1).normalized()
            allAxes.push(edge.orthogonal())
        }

        let minimumTransformVector = new Vector2(Number.MAX_VALUE, Number.MAX_VALUE)
        for (let axis of allAxes) {
            let projections1 = worldSpacePoints1.map(p => p.dot(axis))
            let projections2 = worldSpacePoints2.map(p => p.dot(axis))
            if (Math.max(...projections2) < Math.min(...projections1) || Math.min(...projections2) > Math.max(...projections1)) {
                return false
            }
            //else
            const minOverlap = Math.min(
                Math.max(...projections2) - Math.min(...projections1),
                Math.max(...projections1) - Math.min(...projections2)
            )
            if (minOverlap < minimumTransformVector.magnitude){
                minimumTransformVector = axis.normalized().scaled(minOverlap)
            }
        }
        if (gameObject1.transform.position.minus(gameObject2.transform.position).dot(minimumTransformVector) > 0) {
            return minimumTransformVector
        } else {
            return minimumTransformVector.scaled(-1)
        }
    }
}