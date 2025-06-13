import { AppState } from "../AppState.js"
import { giftsService } from "../services/GiftsServices.js"
import { api } from "../utils/Axios.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"


export class GiftsController {
  constructor() {
    console.log("The Gift Controller is alive!! 🎁🛂")
    AppState.on("identity", this.getGift)
    AppState.on('gifts', this.drawGifts)

  }

  async getGift() {
    try {
      await giftsService.getGift()
    } catch (error) {
      console.error(error, "Cant get a gift bro")
      Pop.error(error, "Could not get a gift")
    }
  }


  drawGifts() {
    const gifts = AppState.gifts
    let giftsHTML = ""
    gifts.forEach(gift => giftsHTML += gift.giftTemplate)
    const giftElem = document.getElementById("img-list")
    giftElem.innerHTML = giftsHTML
  }


  async openGift(giftId) {
    try {
      console.log("gift ID should be", giftId)
      await giftsService.openGiftBox(giftId)
    } catch (error) {
      console.error(error, "Cant open the gift bro")
      Pop.error(error, "Could not open a gift")
    }
  }


  async submitGiffy() {
    try {
      event.preventDefault()
      const formElem = event.target
      console.log("Get the form elem", formElem)
      const giffyFormData = getFormData(formElem)
      console.log(giffyFormData)
      await giftsService.submitGiffy(giffyFormData)

    } catch (error) {

    }
  }





}