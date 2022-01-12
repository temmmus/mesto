import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, title, link) {
    super(popupSelector);
    // this._title = title;
    // this._link = link;
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageTitle = this._popup.querySelector(".popup__image-title");
  }

  open(title, link) {
    // const open = super.open();

    // вставка данных в попап
    this._popupImage.src = this._link;
    this._popupImage.alt = this._title;
    this._popupImageTitle.textContent = this._title;
  }
}
