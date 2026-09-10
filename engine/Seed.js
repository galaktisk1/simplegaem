/**
 * adapted from: https://github.com/afritz1/OpenTESArena/wiki/City-Generation 
    
    seed = 12345; // (unsigned 32-bit)

    srand(x) <-
    seed <- x

    rnd() <-
    seed <- seed * 7143469
    return (seed >> 16) & 0xFFFF
 
    **/
class Seed {
    seed
}