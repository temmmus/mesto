export default class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleDeleteClick,
      handleAddLike,
      handleDeleteLike,
    },
    templateSelector
  ) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
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
    // this._cardLikeButton.addEventListener("click", (event) => {
    //   event.target
    //     .closest(".place__like-button")
    //     .classList.toggle("place__like-button_active");
    // });
    this._cardLikeButton.addEventListener("click", () => {
      this._cardLikeButton.classList.contains("place__like-button_active")
        ? (this._handleDeleteLike(this._id),
          this._cardLikeButton.classList.remove("place__like-button_active"))
        : (this._handleAddLike(this._id),
          this._cardLikeButton.classList.add("place__like-button_active"));
    });

    // открытие попапа удаления карточки
    this._cardRemoveButton.addEventListener("click", (event) => {
      this._handleDeleteClick(this._id);
    });

    // открытие попапа превью карточки
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    // удаление карточки
    // this._cardRemoveButton.addEventListener("click", (event) => {
    //   event.target.closest(".place").remove();
    // });
  }

  // создание карточки
  generateCard() {
    this._element = this._getTemplate(); // записываем разметку в приватное поле _element
    this._cardImage = this._element.querySelector(".place__image");
    this._cardName = this._element.querySelector(".place__title");
    this._cardLikeButton = this._element.querySelector(".place__like-button");
    this._cardLikeCount = this._element.querySelector(".place__like-count");
    this._cardRemoveButton = this._element.querySelector(
      ".place__remove-button"
    );

    this._setEventListeners(); // добавляем слушатели

    // добавляем данные
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikeCount.textContent = this._likeCount;

    // возвращаем элемент
    return this._element;
  }
}
