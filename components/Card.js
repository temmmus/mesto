import { pageElements } from "../utils/page-elements.js";
import { cardSelector } from "../utils/constants.js";
import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor(title, link, templateSelector) {
    this._title = title;
    this._link = link;
    this._template = document.getElementById(templateSelector);
  }

  // получение шаблона
  _getTemplate() {
    // забираем html-разметку шаблона карточки и клонируем элемент
    const cardElement = this._template.content
      .querySelector(cardSelector)
      .cloneNode(true);
    return cardElement; // возвращаем DOM-элемент карточки
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
      .addEventListener("click", () => this.preview.open());
  }

  // создание карточки
  generateCard() {
    this._element = this._getTemplate(); // записываем разметку в приватное поле _element
    this._setEventListeners(); // добавляем слушатели

    // добавляем данные
    this._element.querySelector(".place__title").textContent = this._title;
    this._element.querySelector(".place__image").src = this._link;
    this._element.querySelector(".place__image").alt = this._title;

    // создаем экземпляр превью карточки
    this.preview = new PopupWithImage(
      ".popup_type_view-image",
      this._title,
      this._link
    );

    // возвращаем элемент
    return this._element;
  }
}
