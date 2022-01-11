import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, title, link) {
    super(popupSelector);
    this._title = title;
    this._link = link;
  }

  open() {
    const opern = super.open();

    // вставка данных в попап
    this._popup.querySelector(".popup__image").src = this._link;
    this._popup.querySelector(".popup__image").alt = this._title;
    this._popup.querySelector(".popup__image-title").textContent = this._title;
  }
}
