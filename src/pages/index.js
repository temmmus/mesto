import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import { pageElements } from "../utils/page-elements.js";
import {
  cardListSelector,
  cardTemplateSelector,
  initialCards,
  profileNameSelector,
  profileAboutSelector,
  popupCardPreviewSelector,
  popupAddImageSelector,
  popupEditProfileSelector,
  formConfig,
} from "../utils/constants.js";

// создание карточки
function createCard(item) {
  const cardElement = new Card(
    item.title,
    item.link,
    cardTemplateSelector,
    (title, link) => {
      openPreview(title, link);
    }
  ).generateCard();
  return cardElement;
}

// открытие попапа-превью карточки
function openPreview(title, link) {
  popupCardImagePreview.open(title, link);
}

// добавление дефолтных карточек на страницу
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      defaultCardList.addItemAppend(createCard(item));
    },
  },
  cardListSelector
);
defaultCardList.renderItems();

//  создание попапа превью карточки
const popupCardImagePreview = new PopupWithImage(popupCardPreviewSelector);

// добавление слушателей попапу создания карточек
popupCardImagePreview.setEventListeners();

// Включение валидации формы
const formValidators = {};
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
enableValidation(formConfig);

// создание попапа добавления карточек
const popupAddCard = new PopupWithForm(
  popupAddImageSelector,
  formConfig,
  (item) => {
    defaultCardList.addItemPrepend(createCard(item));
  }
);

// добавление слушателей попапу создания карточек
popupAddCard.setEventListeners();

// добавление слушателя кнопке открытия попапа создания карточек
pageElements.ADD_CARD_BUTTON.addEventListener("click", () => {
  popupAddCard.open();
  formValidators[popupAddCard.popupForm.getAttribute("name")].resetValidation(); // сбросить валидацию
});

// сохранение текущих данных профиля
const userInfo = new UserInfo(profileNameSelector, profileAboutSelector);

// создание попапа профиля
const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  formConfig,
  (data) => {
    userInfo.setUserInfo(data);
  }
);

// добавление слушателей попапу профиля
popupEditProfile.setEventListeners();

// добавление слушателя кнопки открытия попапа профиля
pageElements.EDIT_PROFILE_BUTTON.addEventListener("click", () => {
  popupEditProfile.open();
  formValidators[popupAddCard.popupForm.getAttribute("name")].resetValidation(); // сбросить валидацию
  setEditProfile(); // заполнить поля формы
});

// заполнение формы изменения профиля дефолтными значеними
function setEditProfile() {
  const data = userInfo.getUserInfo();
  console.log(data)
  pageElements.PROFILE_NAME_INPUT.value = data["name"];
  pageElements.PROFILE_ABOUT_INPUT.value = data["about"];
}
