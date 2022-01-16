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
} from "../utils/constants.js";

const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: authToken,
    "Content-Type": "application/json",
  },
});

// получение/сохранение/отрисовка данных пользователя и карточек
Promise.all([api.getUserInfo(), api.getCards()]).then(([userData, cards]) => {
  const userInfo = new UserInfo();

  // установка данных пользователя
  userInfo.setUserInfo(userData); // сохранение данных пользовател
  userInfo.setUserInfoOnPage(pageSelectors); // отрисовка имени и профессии на странице
  userInfo.setUserAvatarOnPage(pageSelectors); // отрисовка аватара на странице

  // отрисовка карточек с сервера
  const cardList = new Section(
    {
      items: cards,
      renderer: (item) => {
        cardList.addItemAppend(createCard(item));
      },
    },
    pageSelectors.cardList
  );
  cardList.renderItems();

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
        hendleLikeClick: (cardId) => {
          if (
            document
              .getElementById(cardId)
              .querySelector(".place__like-button")
              .classList.contains("place__like-button_active")
          ) {
            api
              .deleteLikeCard(cardId)
              .then((res) => {
                document
                  .getElementById(cardId)
                  .querySelector(".place__like-button")
                  .classList.remove("place__like-button_active");
                document
                  .getElementById(cardId)
                  .querySelector(".place__like-count").textContent =
                  res.likes.length;
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            api
              .addLikeCard(cardId)
              .then((res) => {
                document
                  .getElementById(cardId)
                  .querySelector(".place__like-button")
                  .classList.add("place__like-button_active");
                document
                  .getElementById(cardId)
                  .querySelector(".place__like-count").textContent =
                  res.likes.length;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        },
      },
      pageSelectors.cardTemplate,
      userInfo.getUserInfo()
    ).generateCard();
    return cardElement;
  }

  //  создание попапа удаления карточки
  const popupDeleteCard = new PopupWithForm(
    pageSelectors.popupDeleteCard,
    formConfig,
    (data) => {
      api
        .deleteCard(data.cardId) // удалить карточку на сервере
        .then(() => {
          cardList.removeItem(data); // удалить карточку на странице
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupDeleteCard.close();
        });
    }
  );

  // создание попапа добавления карточек
  const popupAddCard = new PopupWithForm(
    pageSelectors.popupAddCard,
    formConfig,
    (item) => {
      api
        .postNewCard(item.name, item.link)
        .then((res) => {
          cardList.addItemPrepend(createCard(res)); // добавить новую карточку на странице
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupAddCard.close();
        });
    }
  );
  popupAddCard.setEventListeners(); // добавление слушателей попапу создания карточек

  // открытие попапа удаления карточки
  function openDeletePreview(cardId) {
    document.querySelector(pageSelectors.popupDeleteCardIdInput).value = cardId;
    popupDeleteCard.open();
  }
  popupCardImagePreview.setEventListeners(); // добавление слушателей попапу превью карточек
  popupDeleteCard.setEventListeners(); // добавление слушателей попапу удаления карточек
});

//  создание попапа превью карточки
const popupCardImagePreview = new PopupWithImage(
  pageSelectors.popupCardPreview
);

// открытие попапа-превью карточки
function openPreview(name, link) {
  popupCardImagePreview.open(name, link);
}

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
  formValidators[
    popupEditAvatar.popupForm.getAttribute("name")
  ].resetValidation(); // сбросить валидацию
});

// добавление слушателя кнопки открытия попапа профиля
pageElements.EDIT_PROFILE_BUTTON.addEventListener("click", () => {
  userInfo.setUserInfoInForm(pageSelectors); // заполнение полей формы
  popupEditProfile.open(); // открытие формы
  formValidators[popupAddCard.popupForm.getAttribute("name")].resetValidation(); // сбросить валидацию
});
