import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { api } from "../utils/Axios.js"


class GiftsService {




  async submitGiffy(giffyFormData) {
    console.log("form data came through?", giffyFormData)
    const response = await api.post('api/gifts', giffyFormData)
    console.log(response)
    const newgift = new Gift(response.data)
    AppState.gifts.unshift(newgift)

  }






  async getGift() {
    const response = await api.get("api/gifts")
    console.log("Gifts?", response.data)
    const returnedGifts = response.data.map(pojo => new Gift(pojo))
    console.log("returned gifts non pojo?", returnedGifts)
    AppState.gifts = returnedGifts
  }



  async openGiftBox(giftId) {
    const openedGift = AppState.gifts.find(gift => giftId == gift.id)
    console.log("find the openedGift", openedGift)
    if (openedGift.opened == true) {
      return
    }
    if (openedGift.opened == false) {
      openedGift.opened = true;
      const response = await api.put(`api/gifts/${giftId}`, openedGift)
      console.log("the gift was opened and sent back!", response.data)
      AppState.gifts
    }
  }

  //use splice above like below!


  //  async updateSpell(spellId) {
  //     const spells = AppState.sandboxSpells
  //     // NOTE we can use findIndex to get our spell object with bracket notation, and also for our splice
  //     const spellIndex = spells.findIndex(spell => spell.id == spellId)
  //     const spellToUpdate = spells[spellIndex]
  //     // the opposite boolean value of what is stored in the appstate
  //     const spellData = { prepared: !spellToUpdate.prepared }
  //     const response = await api.put(`api/spells/${spellId}`, spellData)
  //     console.log('UPDATED SPELL', response.data);
  //     const updatedSpell = new SandboxSpell(response.data)
  //     // NOTE we use splice to take the old spell out and replace it with the updatedSpell from the API
  //     // [ 'blue', 'red', 'green' ].splice(1, 1, 'yellow') => [ 'blue', 'yellow', 'green' ]
  //     spells.splice(spellIndex, 1, updatedSpell)
  //   }


}

export const giftsService = new GiftsService()