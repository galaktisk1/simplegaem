class Collisions {
    static isCollisionPointPolygon(point, gameObject) {
        // move everything into world space
        const one = gameObject
        const oneC = one.getComponent(Collider)
        let worldSpacePoints = []
        const m = gameObject.transform.getWorldMatrix()
        for (let point of oneC.points) {
            const p = m.transformPoint(point)
            worldSpacePoints.push(new Vector2(p.x, p.y))
        }
        // find axes for projection
        for (let i = 0; i < worldSpacePoints.length; i++) {
            let point1 = worldSpacePoints[i]
            let point2 = worldSpacePoints[(i + 1) % worldSpacePoints.length]
            let edge = point2.minus(point1).normalized
            let axis = Vector2.perpendicular(edge)
            // check for overlap
            let pointProjection = Vector2.dot(point, axis)
            let polygonProjections = worldSpacePoints.map(p => Vector2.dot(p, axis))
            if (pointProjection < Math.min(...polygonProjections) || pointProjection > Math.max(...polygonProjections)) {
                return false
            }
        }
        return true
    }

    static isCollisionPolygonPolygon(gameObject1, gameObject2) {
        const one = gameObject1
        const two = gameObject2
        const oneC = one.getComponent(Collider)
        const twoC = two.getComponent(Collider)
        const onepos = one.transform.position
        const twopos = two.transform.position


        // do matrices once for each polygon to transform points into world space
        let worldSpacePoints1 = []
        const m1 = one.transform.getWorldMatrix()
        for (let point of oneC.points) {
            const p = m1.transformPoint(point)
            worldSpacePoints1.push(new Vector2(p.x, p.y))
        }

        let worldSpacePoints2 = []
        const m2 = two.transform.getWorldMatrix()
        for (let point of twoC.points) {
            const p = m2.transformPoint(point)
            worldSpacePoints2.push(new Vector2(p.x, p.y))
        }

        return Collisions.polygonPolygonPoints(worldSpacePoints1, worldSpacePoints2, onepos, twopos)
    }

    // now do the axes check
    static polygonPolygonPoints(worldSpacePoints1, worldSpacePoints2, center1, center2) {
        let allAxes = []
        for (let i = 0; i < worldSpacePoints1.length; i++) {
            let point1 = worldSpacePoints1[i]
            let point2 = worldSpacePoints1[(i + 1) % worldSpacePoints1.length]
            let edge = point2.minus(point1).normalized
            allAxes.push(Vector2.perpendicular(edge))
        }
        for (let i = 0; i < worldSpacePoints2.length; i++) {
            let point1 = worldSpacePoints2[i]
            let point2 = worldSpacePoints2[(i + 1) % worldSpacePoints2.length]
            let edge = point2.minus(point1).normalized
            allAxes.push(Vector2.perpendicular(edge))
        }

        let minimumTransformVector = new Vector2(Number.MAX_VALUE, Number.MAX_VALUE)
        for (let axis of allAxes) {
            let projections1 = worldSpacePoints1.map(p => Vector2.dot(p, axis))
            let projections2 = worldSpacePoints2.map(p => Vector2.dot(p, axis))
            if (Math.max(...projections2) < Math.min(...projections1) || Math.min(...projections2) > Math.max(...projections1)) {
                return false
            }
            //else
            const minOverlap = Math.min(
                Math.max(...projections2) - Math.min(...projections1),
                Math.max(...projections1) - Math.min(...projections2)
            )
            if (minOverlap < minimumTransformVector.magnitude) {
                minimumTransformVector = axis.normalized.scaled(minOverlap)
            }
        }

        if (Vector2.dot(center1.minus(center2), minimumTransformVector) > 0) {
            return minimumTransformVector
        } else {
            return minimumTransformVector.scaled(-1)
        }
    }
}