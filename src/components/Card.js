export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteClick, hendleLikeClick },
    templateSelector,
    userId
  ) {
    this._currentUserId = userId;
    this._id = data._id;
    this.ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._hendleLikeClick = hendleLikeClick;
    this._template = document.getElementById(templateSelector);
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
    this._cardLikeButton.addEventListener("click", () => {
      this._hendleLikeClick(this._id);
      console.log("like");
    });

    // открытие попапа удаления карточки
    this._cardRemoveButton.addEventListener("click", (event) => {
      this._handleDeleteClick(this._id);
    });

    // открытие попапа превью карточки
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // создание карточки
  generateCard() {
    this._element = this._getTemplate(); // записываем разметку в приватное поле _element
    this._element.setAttribute("id", this._id);
    this._cardImage = this._element.querySelector(".place__image");
    this._cardName = this._element.querySelector(".place__title");
    this._cardLikeButton = this._element.querySelector(".place__like-button");
    this._cardLikeCount = this._element.querySelector(".place__like-count");
    this._cardRemoveButton = this._element.querySelector(
      ".place__remove-button"
    );
    if (this.ownerId != this._currentUserId) {
      this._cardRemoveButton.style.display = "none";
    }
    if (
      this._likes.filter((elem) => elem._id === this._currentUserId).length > 0
    ) {
      this._cardLikeButton.classList.add("place__like-button_active");
    }

    this._setEventListeners(); // добавляем слушатели

    // добавляем данные
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikeCount.textContent = this._likes.length;

    // возвращаем элемент
    return this._element;
  }

  // likeCountUpdate(count) {
  //   this.likeCount = count;
  // }
}
