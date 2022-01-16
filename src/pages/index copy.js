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
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  popupCardPreviewSelector,
  popupAddCardSelector,
  popupDeleteCardSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  formConfig,
  baseUrl,
  authToken,
  userId,
} from "../utils/constants.js";

//
const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: authToken,
    "Content-Type": "application/json",
  },
});

// получение с сервера данных пользователя и карточек
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    // тут установка данных пользователя
    // и тут отрисовка карточек
  })
  .catch((err) => {
    console.log(err);
  });

// создание элемента карточки
function createCard(item) {
  const cardElement = new Card(
    {
      data: item,
      handleCardClick: (name, link) => {
        openPreview(name, link);
      },
      handleDeleteClick: (cardId) => {
        openDeletePreview(cardId);
      },
      handleAddLike: (cardId) => {
        api
          .addLikeCard(cardId)
          .then((res) => {
            return res.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {});
      },
      handleDeleteLike: (cardId) => {
        api
          .deleteLikeCard(cardId)
          .then((res) => {
            return res.likes.length;
            // console.log(res.likes.length);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {});
      },
    },
    cardTemplateSelector,
    userId
  ).generateCard();
  return cardElement;
}

// открытие попапа-превью карточки
function openPreview(name, link) {
  popupCardImagePreview.open(name, link);
}

// добавление на страницу карточек с сервера
const getInitialCardList = new Section(
  {
    items: api
      .getCards()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {}), // получение карточек с сервера
    renderer: (item) => {
      getInitialCardList.addItemAppend(createCard(item));
    },
  },
  cardListSelector
);
getInitialCardList.renderItems();

//  создание попапа превью карточки
const popupCardImagePreview = new PopupWithImage(popupCardPreviewSelector);
//  создание попапа удаления карточки
const popupDeleteCard = new PopupWithForm(
  popupDeleteCardSelector,
  formConfig,
  (data) => {
    api
      .deleteCard(data.cardId)
      .then(() => {
        getInitialCardList.renderItems();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {}); // удалить карточку на сервере
  }
);

// добавление слушателей попапу создания карточек
popupCardImagePreview.setEventListeners();
popupDeleteCard.setEventListeners();

// Включение валидации всех форм
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
  popupAddCardSelector,
  formConfig,
  (item) => {
    api
      .postNewCard(item.name, item.link)
      .then((res) => {
        getInitialCardList.addItemPrepend(createCard(res));
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {}); // создать новую карточку на сервере
  }
);

// добавление слушателей попапу создания карточек
popupAddCard.setEventListeners();

// добавление слушателя кнопке открытия попапа создания карточек
pageElements.ADD_CARD_BUTTON.addEventListener("click", () => {
  popupAddCard.open();
  formValidators[popupAddCard.popupForm.getAttribute("name")].resetValidation(); // сбросить валидацию
});

// создание попапа изменения профиля
const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  formConfig,
  (data) => {
    api
      .patchUserInfo(data.name, data.about)
      .then(() => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {}); // обновить даннык пользователя на сервере
  }
);
// добавление слушателей попапу изменения профиля
popupEditProfile.setEventListeners();

// создание попапа изменения аватара
const popupEditAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  formConfig,
  (data) => {
    api
      .patchUserAvatar(data.link)
      .then(() => {
        setUserInfoFromServerOnPage();
        popupEditAvatar.close();
      })
      .catch((err) => {})
      .finally(() => {}); // обновление аватара пользователя на сервер
  }
);
// добавление слушателей попапу изменения аватара
popupEditAvatar.setEventListeners();

// добавление слушателей элементу аватара
pageElements.EDIT_AVATAR_BUTTON.addEventListener("click", () => {
  popupEditAvatar.open();
});

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
  api
    .getUserInfo()
    .then((res) => {
      document.querySelector(profileNameSelector).textContent = res.name;
      document.querySelector(profileAboutSelector).textContent = res.about;
      document.querySelector(profileAvatarSelector).src = res.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
}
setUserInfoFromServerOnPage();

// сохранение текущих данных профиля
const userInfo = new UserInfo(profileNameSelector, profileAboutSelector, () => {
  return api
    .getUserInfo()
    .then((res) => {
      return res._id;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {});
});
