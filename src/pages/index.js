import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { pageElements } from "../utils/page-elements.js";
import {
  cardListSelector,
  cardTemplateSelector,
  initialCards,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  popupCardPreviewSelector,
  popupAddImageSelector,
  popupEditProfileSelector,
  formConfig,
  baseUrl,
  authToken,
} from "../utils/constants.js";

//
const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: authToken,
    "Content-Type": "application/json",
  },
});

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
    items: api.getCards(),
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

// создание попапа профиля
const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  formConfig,
  (data) => {
    api.patchUserInfo(data.name, data.about);
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

  pageElements.PROFILE_NAME_INPUT.value = data["name"];
  pageElements.PROFILE_ABOUT_INPUT.value = data["about"];
}

// загрузка данныех профиля на страницу
function setUserInfoFromServerOnPage() {
  api.getUserInfo().then((res) => {
    document.querySelector(profileNameSelector).textContent = res.name;
    document.querySelector(profileAboutSelector).textContent = res.about;
    document.querySelector(profileAvatarSelector).src = res.avatar;
  });
}
setUserInfoFromServerOnPage();

// сохранение текущих данных профиля
const userInfo = new UserInfo(profileNameSelector, profileAboutSelector);
