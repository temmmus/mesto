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
  pageSelectors,
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

const userInfo = new UserInfo();

// получение/сохранение/отрисовка данных пользователя и карточек
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    // установка данных пользователя
    console.log(userData);
    function setUserInfo() {
      api
        .getUserInfo()
        .then((res) => {
          userInfo.setUserInfo(res); // сохранение данных пользовател
          userInfo.setUserInfoOnPage(pageSelectors); // отрисовка имени и профессии на странице
          userInfo.setUserAvatarOnPage(pageSelectors); // отрисовка аватара на странице
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setUserInfo();

    // отрисовка карточек
    console.log(cards);
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
      pageSelectors.cardList
    );
    getInitialCardList.renderItems();
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
    pageSelectors.cardTemplate,
    userId
  ).generateCard();
  return cardElement;
}

//  создание попапа превью карточки
const popupCardImagePreview = new PopupWithImage(
  pageSelectors.popupCardPreview
);

//  создание попапа удаления карточки
const popupDeleteCard = new PopupWithForm(
  pageSelectors.popupDeleteCard,
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

// открытие попапа-превью карточки
function openPreview(name, link) {
  popupCardImagePreview.open(name, link);
}

// открытие попапа удаления карточки
function openDeletePreview(cardId) {
  document.querySelector(pageSelectors.popupDeleteCardIdInput).value = cardId;
  popupDeleteCard.open();
}
popupCardImagePreview.setEventListeners(); // добавление слушателей попапу превью карточек
popupDeleteCard.setEventListeners(); // добавление слушателей попапу удаления карточек

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
  pageSelectors.popupAddCard,
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
popupAddCard.setEventListeners(); // добавление слушателей попапу создания карточек

// добавление слушателя кнопке открытия попапа создания карточек
pageElements.ADD_CARD_BUTTON.addEventListener("click", () => {
  popupAddCard.open();
  formValidators[popupAddCard.popupForm.getAttribute("name")].resetValidation(); // сбросить валидацию
});

// создание попапа изменения профиля
const popupEditProfile = new PopupWithForm(
  pageSelectors.popupEditProfile,
  formConfig,
  (data) => {
    api
      .patchUserInfo(data.name, data.about)
      .then(() => {
        userInfo.setUserInfo(data); // сохранение новых данных
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        userInfo.setUserInfoOnPage(pageSelectors); // отрисовка новых данных на сервере
      });
  }
);
popupEditProfile.setEventListeners(); // добавление слушателей попапу изменения профиля

// создание попапа изменения аватара
const popupEditAvatar = new PopupWithForm(
  pageSelectors.popupEditAvatar,
  formConfig,
  (data) => {
    api
      .patchUserAvatar(data.link)
      .then((res) => {
        userInfo.setUserInfo(res); // сохранение новых данных
        popupEditAvatar.close();
      })
      .catch((err) => {})
      .finally(() => {
        userInfo.setUserAvatarOnPage(pageSelectors); // отрисовка нового аватара на странице
      });
  }
);
popupEditAvatar.setEventListeners(); // добавление слушателей попапу изменения аватара

// добавление слушателей элементу аватара
pageElements.EDIT_AVATAR_BUTTON.addEventListener("click", () => {
  popupEditAvatar.open();
});

// добавление слушателя кнопки открытия попапа профиля
pageElements.EDIT_PROFILE_BUTTON.addEventListener("click", () => {
  userInfo.setUserInfoInForm(pageSelectors); // заполнение полей формы
  popupEditProfile.open(); // открытие формы
  formValidators[popupAddCard.popupForm.getAttribute("name")].resetValidation(); // сбросить валидацию
});
