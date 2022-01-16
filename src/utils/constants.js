// селекторы элементов страницы
export const pageSelectors = {
  popupAddCard: ".popup_type_add-card",
  popupDeleteCard: ".popup_type_delete-card",
  popupEditProfile: ".popup_type_edit-profile",
  popupEditAvatar: ".popup_type_edit-avatar",
  popupCardPreview: ".popup_type_view-image",
  cardList: ".places",
  cardTemplate: "place-template",
  card: ".place",
  profileName: ".profile__name",
  profileAbout: ".profile__about",
  profileAvatar: ".profile__avatar",
  profileFormNameInput: ".popup__input_type_profile-name",
  profileFormAboutInput: ".popup__input_type_profile-about",
  popupDeleteCardIdInput: ".popup__input_type_card-id",
};

// селекторы форм
export const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// данные сервера
export const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-33";
export const authToken = "62b19013-c791-48d0-84cf-12391364b61d";
