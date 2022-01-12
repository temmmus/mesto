export default class Card {
  constructor(title, link, templateSelector, handleCardClick) {
    this._title = title;
    this._link = link;
    this._template = document.getElementById(templateSelector);
    this._handleCardClick = handleCardClick;
  }

  // получение шаблона
  _getTemplate() {
    // забираем html-разметку шаблона карточки и клонируем элемент
    const cardElement = this._template.content
      .querySelector(".place")
      .cloneNode(true);
    return cardElement; // возвращаем DOM-элемент карточки
  }

  // добавление слушателей
  _setEventListeners() {
    // лайк карточки
    this._cardLikeButton.addEventListener("click", (event) => {
      event.target
        .closest(".place__like-button")
        .classList.toggle("place__like-button_active");
    });

    // удаление карточки
    this._cardRemoveButton.addEventListener("click", (event) => {
      event.target.closest(".place").remove();
    });

    // открытие попапа превью карточки (todo)
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._title, this._link);
    });
  }

  // создание карточки
  generateCard() {
    this._element = this._getTemplate(); // записываем разметку в приватное поле _element
    this._cardImage = this._element.querySelector(".place__image");
    this._cardTitle = this._element.querySelector(".place__title");
    this._cardLikeButton = this._element.querySelector(".place__like-button");
    this._cardRemoveButton = this._element.querySelector(
      ".place__remove-button"
    );

    this._setEventListeners(); // добавляем слушатели

    // добавляем данные
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;

    // возвращаем элемент
    return this._element;
  }
}
