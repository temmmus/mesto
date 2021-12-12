import {pageElements} from './page-elements.js';
import {formConfig} from './form-config.js';
import {initialCards} from './initial-сards.js';
import {openPopup, closePopup} from './popup-functions.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


// обновление профиля через форму
function changeProfile(event) {
  pageElements.PROFILE_NAME.textContent = pageElements.PROFILE_NAME_INPUT.value;
  pageElements.PROFILE_ABOUT.textContent = pageElements.PROFILE_ABOUT_INPUT.value;
  closePopup(event); // закрыть попап
  event.preventDefault();
};

// заполнение формы изменения профиля дефолтными значеними
function setEditProfile() {
  pageElements.PROFILE_NAME_INPUT.value = pageElements.PROFILE_NAME.textContent;
  pageElements.PROFILE_ABOUT_INPUT.value = pageElements.PROFILE_ABOUT.textContent;
};

// добавление карточки в DOM в начало контейнера
function renderPrependElement(container, element) {
  container.prepend(element);
};

// добавление карточки в DOM в конец контейнера
const renderAppendElement = (container, element) => {
  container.append(element);
};

// создание карточки через форму
function handleImageFormSubmit(event) {
  const card = new Card(pageElements.PLACE_NAME_INPUT.value, pageElements.PLACE_LINK_INPUT.value, pageElements.CARD_TEMPLATE); // создание экземпляра карточки
  const cardElement = card.generateCard(); // создание карточкм и возвращение наружу
  renderPrependElement(pageElements.CARDS_CONTAINER, cardElement); // добавление в DOM
  closePopup(event); // закрыть попап
  pageElements.ADD_CARD_POPUP.querySelector('.popup__form').reset(); // очистить поля формы
  event.preventDefault();
};

// создание дефолтных карточек
function initialCardsCreation(cards) { 
  cards.forEach((item) => {
    const card = new Card(item.title, item.link, pageElements.CARD_TEMPLATE); // создание экземпляра карточки
    const cardElement = card.generateCard(); // создание карточкм и возвращение наружу
    renderAppendElement(pageElements.CARDS_CONTAINER, cardElement); // добавление в DOM
  });
};

// включение валидации форм
function formValidation(form) {
  const validation = new FormValidator(formConfig, form);
  validation.enableValidation();
}

// добавление слушателей
pageElements.ADD_CARD_BUTTON.addEventListener('click', () => openPopup(pageElements.ADD_CARD_POPUP) );
pageElements.EDIT_PROFILE_POPUP.addEventListener('submit', changeProfile);
pageElements.ADD_CARD_POPUP.addEventListener('submit', handleImageFormSubmit);
pageElements.EDIT_PROFILE_BUTTON.addEventListener('click', () => {
  openPopup(pageElements.EDIT_PROFILE_POPUP);
  setEditProfile();
}); 

initialCardsCreation(initialCards); // создать дефолтных карточек
formValidation(pageElements.EDIT_PROFILE_POPUP); // включить валидацию формы изменения профиля 
formValidation(pageElements.ADD_CARD_POPUP); // включить валидацию формы добавления карточки 