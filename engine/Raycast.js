// rays against line segments: vision, and line of sight checks
class Raycast {
    static EPS = 1e-10
    // ray-segment intersection in parametric form (point + direction * t),
    // as in Nicky Case, "Sight & Light" (https://ncase.me/sight-and-light/)
    static raySegment(origin, direction, a, b) {
        const e = b.minus(a)
        const denom = Vector2.cross(direction, e)
        // parallel lines never meet
        if (denom === 0) return null
        const t = Vector2.cross(a.minus(origin), e) / denom
        const u = Vector2.cross(a.minus(origin), direction) / denom
        // t: in front of the ray, u: between a and b
        // a hair past each end, so a ray aimed exactly at a shared corner still hits
        // (visibility-polygon-js compares with an epsilon the same way)
        if (t >= 0 && u >= -Raycast.EPS && u <= 1 + Raycast.EPS) return t
        return null
    }

    // distance to the nearest segment hit within maxDistance, or null if nothing is hit
    static cast(origin, direction, segments, maxDistance = Infinity) {
        let best = null
        for (const seg of segments) {
            const t = Raycast.raySegment(origin, direction, seg.a, seg.b)
            if (t !== null && t < maxDistance && (best === null || t < best)) best = t
        }
        return best
    }

    // skip segments farther than the light's radius, as suggested in
    // Tile Based Worlds, "Visibility Polygons" (https://tilebasedworlds.com/tutorial/a-darker-world/visibility-polygons/)
    static nearby(segments, origin, radius) {
        return segments.filter(seg => {
            const minX = Math.min(seg.a.x, seg.b.x)
            const maxX = Math.max(seg.a.x, seg.b.x)
            const minY = Math.min(seg.a.y, seg.b.y)
            const maxY = Math.max(seg.a.y, seg.b.y)
            const overlapX = !(maxX < origin.x - radius || minX > origin.x + radius)
            const overlapY = !(maxY < origin.y - radius || minY > origin.y + radius)
            return overlapX && overlapY
        })
    }

    // The visibility polygon from rays cast only at unique segment endpoints,
    // plus two rays offset by a tiny angle to see past corners, sorted by angle.
    // From Nicky Case, "Sight & Light" (https://ncase.me/sight-and-light/)
    static visibilityPolygon(origin, radius, segments) {
        const nearbySegments = Raycast.cleanSegments(Raycast.nearby(segments, origin, radius))
        const ends = new Map()
        for (const seg of nearbySegments) {
            ends.set(Raycast.key(seg.a), seg.a)
            ends.set(Raycast.key(seg.b), seg.b)
        }
        const angles = []
        for (const p of ends.values()) {
            const angle = Math.atan2(p.y - origin.y, p.x - origin.x)
            angles.push(angle - 0.0001, angle, angle + 0.0001)
        }
        for (let i = 0; i < 64; i++) {
            angles.push(-Math.PI + i / 64 * Math.PI * 2)
        }
        return angles.map(angle => {
            const dir = new Vector2(Math.cos(angle), Math.sin(angle))
            const t = Raycast.cast(origin, dir, nearbySegments, radius) ?? radius
            const point = origin.plus(dir.scaled(t))
            return { angle, point }
        }).sort((a, b) => a.angle - b.angle).map(ray => ray.point)
    }

    static cleanSegments(segments) {
        const seen = new Set()
        const clean = []
        for (const seg of segments) {
            // 1. snap both ends
            const a = Raycast.snap(seg.a)
            const b = Raycast.snap(seg.b)
            // 2. skip it if both ends are the same point
            if (Raycast.key(a) === Raycast.key(b)) continue
            // 3. skip it if this exact wall is already in the list
            const ka = Raycast.key(a), kb = Raycast.key(b)
            const key = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`
            if (seen.has(key)) continue
            seen.add(key)
            // otherwise, add it
            clean.push({ ...seg, a, b })
        }
        return Raycast.breakIntersections(clean)
    }

    // where two segments cross or touch: how far along each one (0 to 1), or null
    // segments must only meet at their ends, from Byron Knoll,
    // visibility-polygon-js (https://github.com/byronknoll/visibility-polygon-js)
    static segmentIntersection(s1, s2) {
        // r, s, denom
        const r = s1.b.minus(s1.a)
        const s = s2.b.minus(s2.a)
        const denom = r.cross(s)
        // if denom is (nearly) 0, they're parallel: return null
        if (Math.abs(denom) < 1e-10) return null
        const diff = s2.a.minus(s1.a)
        const u1 = diff.cross(s) / denom
        const u2 = diff.cross(r) / denom
        // return null unless both are between 0 and 1
        if (u1 < -Raycast.EPS || u1 > 1 + Raycast.EPS || u2 < -Raycast.EPS || u2 > 1 + Raycast.EPS) return null
        // return { u1, u2 }
        return { u1, u2 }
    }

    // splits segments wherever they cross or one ends on another's middle,
    // so afterwards they only meet at shared ends (Byron Knoll's breakIntersections,
    // visibility-polygon-js, https://github.com/byronknoll/visibility-polygon-js)
    static breakIntersections(segments) {
        const output = []
        for (let i = 0; i < segments.length; i++) {
            const seg = segments[i]
            const intersections = []
            for (let j = 0; j < segments.length; j++) {
                if (i === j) continue
                const hit = Raycast.segmentIntersection(seg, segments[j])
                if (!hit) continue
                const p = Raycast.snap(seg.a.plus(seg.b.minus(seg.a).scaled(hit.u1)))
                // skip hits at this segment's own ends
                if (Raycast.key(p) === Raycast.key(seg.a) || Raycast.key(p) === Raycast.key(seg.b)) continue
                intersections.push(p)
            }
            let start = seg.a
            while (intersections.length > 0) {
                // find the intersection nearest to start
                let bestIdx = 0
                let bestDist = Infinity
                for (let k = 0; k < intersections.length; k++) {
                    const d = intersections[k].minus(start)
                    const dist = d.x * d.x + d.y * d.y
                    if (dist < bestDist) {
                        bestDist = dist
                        bestIdx = k
                    }
                }
                const next = intersections.splice(bestIdx, 1)[0]
                if (Raycast.key(next) === Raycast.key(start)) continue
                output.push({ ...seg, a: start, b: next })
                start = next
            }
            if (Raycast.key(start) !== Raycast.key(seg.b)) output.push({ ...seg, a: start, b: seg.b })
        }
        return output
    }

    // cause math isnt very nice, rounds away matrix rounding errors, so corners that should be shared are exactly equal
    // keeps 3 decimal places of accuracy
    static snap(p) {
        return new Vector2(Math.round(p.x * 1000) / 1000, Math.round(p.y * 1000) / 1000)
    }
    // turn to text
    static key(p) {
        return `${p.x},${p.y}`
    }
}
