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

    // set the seed
    // >>> is for 32 bit unsigned integer conversion
    setSeed(x){
        this.seed = x >>> 0;
        return this.seed >>> 0;
    }

    // get the next random number
    next(){
        // JS * is unsafe for 32-bit integers, so I use Math Integer multiplication
        this.seed = Math.imul(this.seed, 7143469);
        return (this.seed >>> 16) & 0xFFFF;
    }
}