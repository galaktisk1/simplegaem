class Combat {
    // source : https://github.com/afritz1/OpenTESArena/wiki/Combat.
    static rollToHit(attacker, defender) {
        const chance1 = 128
            + Math.trunc((attacker.level - defender.level) * 5 * 256 / 100)
            + (attacker.luckBonus - defender.luckBonus)
            + (attacker.attackBonus - defender.attackBonus)
        // more here if i had racial bonuses and armor stats
        
        // chance 2 is always the minimum chance to hit,
        // which always takes the player level, no matter who is attacking
        const chance2 = Math.trunc((GameSession.playerattributes?.level ?? 1) * 256 / 100) + 51
        
        return GameSession.randomE.nextInt(256) < Math.max(chance1, chance2)
    }
}