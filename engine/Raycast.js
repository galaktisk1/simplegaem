// rays against line segments: vision, and line of sight checks
class Raycast {
    static EPS = 1e-10
    // ray-segment intersection in parametric form (point + direction * t),
    // as in Nicky Case, "Sight & Light" (https://ncase.me/sight-and-light/)
    static raySegment(origin, direction, a, b) {
        // segment vector
        const e = b.minus(a)

        // denominator measures how parallel the ray and segment are
        const denom = Vector2.cross(direction, e)

        // parallel lines never meet
        if (denom === 0) return null

        // how far along the ray the crossing point is
        const t = Vector2.cross(a.minus(origin), e) / denom

        // how far along the segment the crossing point is
        const u = Vector2.cross(a.minus(origin), direction) / denom

        // t >= 0 is in front of the ray, 
        // u between 0 and 1 is what determines 
        // if the intersection is on the segment
        // return t is the hit, measured along the ray
        if (t >= 0 && u >= -Raycast.EPS && u <= 1 + Raycast.EPS) return t

        // otherwise, no intersection on the segment
        return null
    }

    // distance to the nearest segment hit within maxDistance, or null if nothing is hit
    static cast(origin, direction, segments, maxDistance = Infinity) {
        // define the best (closest) intersection along the ray
        let best = null

        // try every segment for intersection with the ray
        for (const seg of segments) {

            // the distance along the ray to the intersection with this segment
            const t = Raycast.raySegment(origin, direction, seg.a, seg.b)

            // t !== null means there is an intersection with this segment
            // t < maxDistance is the segment closer than the limit
            // (best === null || t < best) keeps track of the closest intersection so far
            // best = t is remember the best so far
            if (t !== null
                && t < maxDistance
                && (best === null
                    || t < best)) best = t
        }

        // return the closest intersection along the ray, or null if none was found
        return best
    }

    static isBlocked(from, to, segments) {
        // an "arrow" from the origin to the target
        const toTarget = to.minus(from)

        // the "length" of the arrow
        const distance = toTarget.magnitude

        // if it is zero, the origin and target are the same, so nothing can be blocked
        if (distance === 0) return false

        // the occluders list in the current scene, or an empty array if none
        const defaultSegments = SceneManager.currentScene.occluders ?? []

        // cast a ray from the origin to the target 
        // and check if it hits any segment within the distance
        return Raycast.cast(from,
            toTarget.normalized,
            segments = segments ?? defaultSegments,
            distance) !== null
    }

    // skip segments farther than the light's radius, as suggested in
    // Tile Based Worlds, "Visibility Polygons" (https://tilebasedworlds.com/tutorial/a-darker-world/visibility-polygons/)
    static nearby(segments, origin, radius) {
        return segments.filter(seg => {

            // the segment's bounding box,
            // the smallest rectangle containing the segment
            const minX = Math.min(seg.a.x, seg.b.x)
            const maxX = Math.max(seg.a.x, seg.b.x)
            const minY = Math.min(seg.a.y, seg.b.y)
            const maxY = Math.max(seg.a.y, seg.b.y)

            // does the box overlap the square from
            // origin - radius to origin + radius?
            const overlapX = !(maxX < origin.x - radius || minX > origin.x + radius)
            const overlapY = !(maxY < origin.y - radius || minY > origin.y + radius)

            // keep the segment if it overlaps the square on both X and Y axes
            return overlapX && overlapY
        })
    }

    // The visibility polygon from rays cast only at unique segment endpoints,
    // plus two rays offset by a tiny angle to see past corners, sorted by angle.
    // From Nicky Case, "Sight & Light" (https://ncase.me/sight-and-light/)
    static visibilityPolygon(origin, radius, segments) {
        // keep only the nearby segments within the radius
        const nearbySegments = Raycast.cleanSegments(Raycast.nearby(segments, origin, radius))

        // collect all unique segment endpoints, 
        // a Map keyed by key(p) removes duplicate points
        const ends = new Map()
        for (const seg of nearbySegments) {
            ends.set(Raycast.key(seg.a), seg.a)
            ends.set(Raycast.key(seg.b), seg.b)
        }

        // three rays for each unique endpoint: 
        // one slightly before, 
        // one exactly at, 
        // and one slightly after the angle to the origin

        // the reason for 3 rays is to see past corners 
        // and avoid missing narrow gaps
        const angles = []
        for (const p of ends.values()) {
            const angle = Math.atan2(p.y - origin.y, p.x - origin.x)
            angles.push(angle - 0.0001, angle, angle + 0.0001)
        }

        // add evenly spaced rays around the full circle 
        // to catch any gaps
        for (let i = 0; i < 64; i++) {
            angles.push(-Math.PI + i / 64 * Math.PI * 2)
        }

        // for each angle
        return angles.map(angle => {

            // make a direction vector from the angle
            const dir = new Vector2(Math.cos(angle), Math.sin(angle))

            // cast the ray in that direction and find the closest intersection within the radius
            // the "??" radius means that if the ray doesn't hit anything, 
            // it will extend to the full radius
            const t = Raycast.cast(origin, dir, nearbySegments, radius) ?? radius

            // calculate the intersection point by moving along the direction vector by distance t
            const point = origin.plus(dir.scaled(t))
            // return the angle and intersection point
            return { angle, point }
            
            // Sort by angle so the points form an ordered
            // visibility outline.
        }).sort((a, b) => a.angle - b.angle).map(ray => ray.point)
    }

    static cleanSegments(segments) {
        // a set of segments we've already seen to avoid duplicates
        const seen = new Set()
        
        // clean list of segments without duplicates or zero-length segments
        const clean = []
        
        for (const seg of segments) {
            // 1. snap both ends to avoid floating point issues
            const a = Raycast.snap(seg.a)
            const b = Raycast.snap(seg.b)
            
            // 2. skip it if both ends are the same point
            if (Raycast.key(a) === Raycast.key(b)) continue
            
            // 3. skip it if this exact wall is already in the list
            const ka = Raycast.key(a), kb = Raycast.key(b)
            
            // the key is here so that they are in alphabetical order 
            // regardless of segment direction, 
            // which avoids duplicates for reversed segments
            const key = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`
            
            // 4. skip it if we've already seen this segment
            if (seen.has(key)) continue
            
            // otherwise, mark this segment as seen 
            seen.add(key)
            
            // keep the segment with snapped ends, 
            // ...seg keeps any other properties it had
            clean.push({ ...seg, a, b })
        }
        // segments are now cleaned and broken at intersections
        return Raycast.breakIntersections(clean)
    }

    // where two segments cross or touch: how far along each one (0 to 1), or null
    // segments must only meet at their ends, from Byron Knoll,
    // visibility-polygon-js (https://github.com/byronknoll/visibility-polygon-js)
    static segmentIntersection(s1, s2) {
        // segment direction from a to b for s1
        const r = s1.b.minus(s1.a)
        
        // segment direction from a to b for s2
        const s = s2.b.minus(s2.a)
        
        // denominator for the intersection formula 
        // which answers how parallel the segments are
        const denom = r.cross(s)

        // use an epsilon to check for near-parallel segments
        // if they are nearly parallel, they never cross
        if (Math.abs(denom) < Raycast.EPS) return null
        
        // the arrow from s1 start to s2 start
        const diff = s2.a.minus(s1.a)
        
        // how far along s1 the cross occurs
        const u1 = diff.cross(s) / denom
        
        // how far along s2 the cross occurs
        const u2 = diff.cross(r) / denom
        
        // both u1 and u2 must be between 0 and 1
        // (with epsilon) for a valid intersection
        // meaning that the crossing point lies within both segments
        // not at the ends of the segments
        if (u1 < -Raycast.EPS || u1 > 1 + Raycast.EPS || u2 < -Raycast.EPS || u2 > 1 + Raycast.EPS) return null
        
        // both positions so 
        // we can know where the intersection occurs along each segment
        return { u1, u2 }
    }

    // splits segments wherever they cross or one ends on another's middle,
    // so afterwards they only meet at shared ends (Byron Knoll's breakIntersections,
    // visibility-polygon-js, https://github.com/byronknoll/visibility-polygon-js)
    static breakIntersections(segments) {
        
        // finished list of segments after breaking intersections
        const output = []
        
        for (let i = 0; i < segments.length; i++) {
            
            // handle one segment at a time
            const seg = segments[i]
            
            // every point of THIS segment that intersects with others
            const intersections = []

            for (let j = 0; j < segments.length; j++) {
                
                // a segment cannot intersect with itself
                if (i === j) continue

                // does the other segment intersect with this one?
                // if not there is no cut, continue to next segment
                const hit = Raycast.segmentIntersection(seg, segments[j])
                if (!hit) continue
                
                
                // u1 says how far along this segment
                // the intersection occurs as a fraction of its length
                
                // turn it into an actual point along the segment,
                // go the fraction of the way from seg.a to seg.b
                const p = Raycast.snap(seg.a.plus(seg.b.minus(seg.a).scaled(hit.u1)))
                
                // a touch at the segment's own end, skip it
                // it already is a corner of this segment
                if (Raycast.key(p) === Raycast.key(seg.a) || Raycast.key(p) === Raycast.key(seg.b)) continue
                intersections.push(p)
            }

            // walk along the segment, breaking it at each intersection point
            let start = seg.a
            while (intersections.length > 0) {
                // find the intersection nearest to start
                let bestIdx = 0
                let bestDist = Infinity
                
                for (let k = 0; k < intersections.length; k++) {
                    
                    const d = intersections[k].minus(start)
                    
                    // this is the squared distance from start to the intersection point
                    const dist = d.x * d.x + d.y * d.y
                    
                    if (dist < bestDist) {
                        bestDist = dist
                        bestIdx = k
                    }
                }
                // take the point out of the list of intersections
                const next = intersections.splice(bestIdx, 1)[0]
                
                // two segments meet at this intersection,
                // this would give the same cut twice if we didn't skip it
                if (Raycast.key(next) === Raycast.key(start)) continue
                
                // ...seg keeps info about the original segment, like its id or other properties
                output.push({ ...seg, a: start, b: next })
                
                start = next
            }
            // if there is a remaining segment from the last intersection to the original segment's end, add it
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
