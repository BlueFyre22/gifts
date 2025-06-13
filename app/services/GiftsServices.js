import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { api } from "../utils/Axios.js"


class GiftsService {




  async submitGiffy(giffyFormData) {
    console.log("form data came through?", giffyFormData)
    const response = await api.post('api/gifts', giffyFormData)
    console.log(response)
    const newgift = new Gift(response.data)
    AppState.openedGift.push(newgift)
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
      AppState.openedGift = openedGift
    }
  }




}

export const giftsService = new GiftsService()