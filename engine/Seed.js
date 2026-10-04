/**
 // ArenaRandom from OpenTESArena source code

ArenaRandom::ArenaRandom(uint32_t seed)
{
	this->value = seed;
}

ArenaRandom::ArenaRandom()
	: ArenaRandom(ArenaRandom::DEFAULT_SEED) { }

uint32_t ArenaRandom::getSeed() const
{
	return this->value;
}

int ArenaRandom::next()
{
	this->value *= 7143469;
	return (this->value >> 16) & 0xFFFF;
}

int ArenaRandom::next(int exclusiveMax)
{
	return this->next() % exclusiveMax;
}

bool ArenaRandom::nextBool()
{
	return (this->next() % 2) == 0;
}

void ArenaRandom::srand(uint32_t seed)
{
	this->value = seed;
}

    **/

// my implementation of ArenaRandom
class Seed {
    seed = 12345; // default seed

    /**
     * @param {number|string} [seed=12345]
     */ 
    constructor(seed = 12345) {
        // if seed is given and its a float or string, convert it to an integer
        
        if (typeof seed === 'number' && !Number.isInteger(seed)) {
            seed = Math.floor(seed);
        } else if (typeof seed === "string") {
            let hash = 0;
            for (let i = 0; i < seed.length; i++) {
                const char = seed.charCodeAt(i);
                hash = Math.imul(hash, 31) + char;
                hash |= 0;
            }
            seed = (hash >>> 0) || 12345;
        }
        
        // the seed becomes a 32-bit unsigned integer
        seed = seed >>> 0;
        this.seed = seed;
    }

    getSeed() {
        return this.seed;
    }

    setSeed(seed) {
        this.seed = seed;
    }
    
    next() {
        this.seed = Math.imul(this.seed, 7143469) >>> 0; // making an unsigned 32-bit integer
        return (this.seed >> 16) & 0xFFFF;
    }
    
    nextInt(exclusiveMax) {
        return this.next() % exclusiveMax;
    }
    
    nextBool() {
        return (this.next() % 2) === 0;
    }
}