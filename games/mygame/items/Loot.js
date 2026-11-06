class Loot {
    static roll(entries = [], random = GameSession.randomL) {
        const drops = []
        for (const entry of entries) {
            if (random.nextInt(100) >= entry.chance) continue

            if (entry.item) {
                const min = entry.min ?? 1
                const max = entry.max ?? min
                const amount = min + random.nextInt(max - min + 1)
                drops.push({ itemDef: itemLibrary.getDefinition(entry.item), amount })
            }
            else if (entry.quality) {
                const pool = itemLibrary.getByQuality(entry.quality)
                if (pool.length === 0) continue
                drops.push({ itemDef: pool[random.nextInt(pool.length)], amount: 1 })
            }
        }
        return drops
    }
}
