import "./styles/index.css";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { pageElements } from "./utils/page-elements.js";
import {
  cardListSelector,
  cardTemplateSelector,
  initialCards,
} from "./utils/constants.js";

// создание дефолтных карточек
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.title,
        item.link,
        cardTemplateSelector
      ).generateCard();
      defaultCardList.addItem(card);
    },
  },
  cardListSelector
);
defaultCardList.renderItems();

// добавление слушателей попапа добавления карточек
pageElements.ADD_CARD_BUTTON.addEventListener("click", () => {
  const popupEditProfile = new PopupWithForm(".popup_type_add-card", (data) => {
    const card = new Card(
      data["popup__input_type_place-name"],
      data["popup__input_type_place-image-link"],
      cardTemplateSelector
    ).generateCard();
    defaultCardList.addItem(card);
  });
  popupEditProfile.open();
});

let userInfo = new UserInfo(
  pageElements.PROFILE_NAME.textContent,
  pageElements.PROFILE_ABOUT.textContent
);

// добавление слушателей попапа профиля
pageElements.EDIT_PROFILE_BUTTON.addEventListener("click", () => {
  const popupEditProfile = new PopupWithForm(
    ".popup_type_edit-profile",
    (data) => {
      userInfo.setUserInfo(data);
    }
  );
  popupEditProfile.open();
  setEditProfile();
});

// заполнение формы изменения профиля дефолтными значеними
function setEditProfile() {
  const data = userInfo.getUserInfo();
  pageElements.PROFILE_NAME_INPUT.value = data["name"];
  pageElements.PROFILE_ABOUT_INPUT.value = data["about"];
}
