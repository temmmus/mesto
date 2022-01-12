export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened"); // добавление класса открытия попапа
    document.addEventListener("keydown", this._handleEscClose); // добавление обработчика закрытия по Esc
  }

  close() {
    this._popup.removeEventListener("click", this.setEventListeners); // удалить обработчик нажатия на оверлей
    window.removeEventListener("keydown", this._handleEscClose); // удалить обработчик закрытия по Esc
    this._popup.classList.remove("popup_opened"); // удалить класс открытого состояния попапа
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
  }

  // закрытие попапа по Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
