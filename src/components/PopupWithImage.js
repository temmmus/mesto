import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupImageName = this._popup.querySelector(".popup__image-title");
  }

  open(name, link) {
    super.open();

    this._name = name;
    this._link = link;

    // вставка данных в попап
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupImageName.textContent = this._name;
  }
}
