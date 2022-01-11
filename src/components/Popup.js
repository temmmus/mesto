import { popupOpenedSelector } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(popupOpenedSelector); // добавление класса открытия попапа
    this.setEventListeners(); // добавление обработчиков событий
  }

  close() {
    this._popup.removeEventListener("click", this.setEventListeners); // удалить обработчик нажатия на оверлей
    window.removeEventListener("keydown", this._handleEscClose); // удалить обработчик закрытия по Esc
    this._popup.classList.remove(popupOpenedSelector); // удалить класс открытого состояния попапа
  }

  // добавление слушателя события закрытия попапа по кнопке и по оверлею
  setEventListeners() {
    // обработчик закрытия по кнопке и по оверлею
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-button")
      ) {
        this.close();
      }
    });

    // обработчик закрытия по Esc
    window.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  // закрытие попапа по Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
