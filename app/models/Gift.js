

export class Gift {
  constructor(data) {
    this.tag = data.tag?.replace(/<.+>|<\/.+>/g, '')  // regex - look it up
    this.url = data.url
    this.opened = data.opened
    this.id = data.id
    this.creatorId = data.creatorId
    this.profilesIdsOpened = data.profileIdsOpened
  }



  get giftTemplate() {
    return `
     <div class="col-md-4 pb-2 px-1" id="img-list">

              <img
                src="${this.url}"
                alt="${this.tag}" class="img-help" onclick="app.giftsController.openGift('${this.id}')" title="${this.tag}">

            </div>
    `
  }



}