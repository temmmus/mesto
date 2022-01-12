import "./pages/index.css";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import { pageElements } from "./utils/page-elements.js";
import {
  cardListSelector,
  cardTemplateSelector,
  initialCards,
  profileNameSelector,
  profileAboutSelector,
  popupCardPreviewSelector,
  popupAddImageSelector,
  popupEditProfileSelector,
} from "./utils/constants.js";

// создание карточки
function createCard(item) {
  const cardElement = new Card(
    item.title,
    item.link,
    cardTemplateSelector,
    (title, link) => {
      const imagePreview = createPreview(popupCardPreviewSelector, title, link);
      imagePreview.setEventListeners();
      imagePreview.open();
    }
  ).generateCard();
  return cardElement;
}

// создание попапа-превью карточки
function createPreview(template, title, link) {
  const popupCardPreview = new PopupWithImage(template, title, link);
  return popupCardPreview;
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

// создание попапа добавления карточек
const popupAddCard = new PopupWithForm(popupAddImageSelector, (item) => {
  defaultCardList.addItemPrepend(createCard(item));
});

// добавление слушателей попапу создания карточек
popupAddCard.setEventListeners();

// добавление слушателя кнопке открытия попапа создания карточек
pageElements.ADD_CARD_BUTTON.addEventListener("click", () => {
  popupAddCard.open();
});

// сохранение текущих данных профиля
const userInfo = new UserInfo(profileNameSelector, profileAboutSelector);

// создание попапа профиля
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (data) => {
  userInfo.setUserInfo(data);
  console.log(data);
});

// добавление слушателей попапу профиля
popupEditProfile.setEventListeners();

// добавление слушателя кнопки открытия попапа профиля
pageElements.EDIT_PROFILE_BUTTON.addEventListener("click", () => {
  popupEditProfile.open();
  setEditProfile(); // заполнить поля формы
});

// заполнение формы изменения профиля дефолтными значеними
function setEditProfile() {
  const data = userInfo.getUserInfo();
  pageElements.PROFILE_NAME_INPUT.value = data["name"];
  pageElements.PROFILE_ABOUT_INPUT.value = data["about"];
}
