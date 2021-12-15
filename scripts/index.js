import {pageElements} from './page-elements.js';
import {formConfig} from './form-config.js';
import {initialCards} from './initial-сards.js';
import {openPopup, closePopup} from './popup-functions.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const addCardPopup = pageElements.ADD_CARD_POPUP;
const addCardPopupForm = addCardPopup.querySelector('.popup__form');
const editProfilePopup = pageElements.EDIT_PROFILE_POPUP;
const editProfilePopupForm = editProfilePopup.querySelector('.popup__form');


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

// создание карточки
function createCard(title, link, template) {
  const card = new Card(title, link, template); // создание экземпляра карточки
  const cardElement = card.generateCard(); // создание карточкм и возвращение наружу
  return cardElement
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
  const cardElement = createCard(pageElements.PLACE_NAME_INPUT.value, pageElements.PLACE_LINK_INPUT.value, pageElements.CARD_TEMPLATE); // создание карточки
  renderPrependElement(pageElements.CARDS_CONTAINER, cardElement); // добавление в DOM
  closePopup(event); // закрыть попап
  addCardPopupForm.reset(); // очистить поля формы
  event.preventDefault();
};

// создание дефолтных карточек
function initialCardsCreation(cards) { 
  cards.forEach((item) => {
    const cardElement = createCard(item.title, item.link, pageElements.CARD_TEMPLATE); // создание карточки
    renderAppendElement(pageElements.CARDS_CONTAINER, cardElement); // добавление в DOM
  });
};

// включение валидации форм
const formValidators = {} // создание объекта для записи форм
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement) // создание экземпляров валидации форм   
    formValidators[formElement.name] = validator; // запись форм в объект
    validator.enableValidation();
  });
};

initialCardsCreation(initialCards); // создать дефолтных карточек
enableValidation(formConfig); // включить валидацию форм

// добавление слушателей попапа добавления карточек
pageElements.ADD_CARD_BUTTON.addEventListener('click', () => {
  openPopup(addCardPopup);
  formValidators[addCardPopupForm.name].resetValidation();
});
addCardPopup.addEventListener('submit', handleImageFormSubmit);

// добавление слушателей попапа профиля
pageElements.EDIT_PROFILE_BUTTON.addEventListener('click', () => {
  openPopup(editProfilePopup);
  formValidators[editProfilePopupForm.name].resetValidation();
  setEditProfile();
}); 
editProfilePopup.addEventListener('submit', changeProfile);