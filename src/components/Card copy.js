import { pageElements } from "../utils/page-elements.js";
import { cardSelector } from "../utils/constants.js";
// import { openPopup } from "../utils/popup-functions.js";

export default class Card {
  constructor(title, link, template) {
    this._title = title;
    this._link = link;
    this._template = template;
  }

  // получение шаблона
  _getTemplate() {
    // забираем html-разметку шаблона карточки и клонируем элемент
    const cardElement = this._template.content
      .querySelector(cardSelector)
      .cloneNode(true);
    return cardElement; // возвращаем DOM-элемент карточки
  }

  // создание карточки
  generateCard() {
    this._element = this._getTemplate(); // записываем разметку в приватное поле _element
    this._setEventListeners(); // добавляем слушатели

    // добавляем данные
    this._element.querySelector(".place__title").textContent = this._title;
    this._element.querySelector(".place__image").src = this._link;
    this._element.querySelector(".place__image").alt = this._title;

    // возвращаем элемент
    return this._element;
  }

  // добавление слушателей
  _setEventListeners() {
    // лайк карточки
    this._element
      .querySelector(".place__like-button")
      .addEventListener("click", (event) => {
        event.target
          .closest(".place__like-button")
          .classList.toggle("place__like-button_active");
      });

    // удаление карточки
    this._element
      .querySelector(".place__remove-button")
      .addEventListener("click", (event) => {
        event.target.closest(".place").remove();
      });

    // открытие попапа
    this._element
      .querySelector(".place__image")
      .addEventListener("click", this._handleOpenPopup);
  }

  _handleOpenPopup(evt) {
    // получение данных из элемента карточки
    const placeImage = evt.target.src;
    const placeName = evt.target.alt;

    // вставка данных в попап
    pageElements.IMAGE_VIEW_POPUP.querySelector(".popup__image").src =
      placeImage;
    pageElements.IMAGE_VIEW_POPUP.querySelector(".popup__image").alt =
      placeName;
    pageElements.IMAGE_VIEW_POPUP.querySelector(
      ".popup__image-title"
    ).textContent = placeName;

    // вызов функции открытия попапа
    openPopup(pageElements.IMAGE_VIEW_POPUP);
  }
}
