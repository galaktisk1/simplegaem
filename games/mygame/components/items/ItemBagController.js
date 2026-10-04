class ItemBagController extends Component{
    start(){
        this.inventory = this.gameObject.getComponent(Inventory)
        this.inventory.addItem({itemDef: itemLibrary.getDefinition("gold"), amount: 87})
        this.inventory.addItem({itemDef: itemLibrary.getDefinition("potion"), amount: 1})
        this.inventory.addItem({itemDef: itemLibrary.getDefinition("bread"), amount: 2})
    }
    update(){
        const player = GameObject.find("Player")
        if (!player) return
        const playerinv = player.getComponent(Inventory)
        const playerpos = player.transform.position
        
        const bag = this.gameObject
        const bagpos = bag.transform.position
        const distanceToBag = bagpos.distanceTo(playerpos)
        
        const baginv = bag.getComponent(Inventory)

        if(distanceToBag < 25){
            for(const item of baginv.getInventory()){
                playerinv.addItem(item)
            }
            const popupmanager = GameObject.find("PopUpManager").getComponent(PopUpManager)
            popupmanager.placePopup("Items Get", player)
            baginv.clearInventory()
        }
        
        if(baginv.getInventory().length === 0){
            bag.destroy()
        }
    }
}
