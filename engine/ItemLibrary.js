class ItemLibrary {
    // item library inspired by 
    // https://github.com/afritz1/OpenTESArena/blob/main/OpenTESArena/src/Items/ItemLibrary.cpp
    // ill be adding more ideas from that repository around mine too
    constructor(defs = {}) {
        this.defs = defs
    }

    getDefinition(id) {
        return this.defs[id]
    }

    
}
