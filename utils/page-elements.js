export const pageElements = {
    CARDS_CONTAINER: document.querySelector('.places'), // Список карточек
    IMAGE_VIEW_POPUP: document.querySelector('.popup_type_view-image'), // Попап превью
    CARD_TEMPLATE: document.getElementById('place-template'), // Шаблон карточки

    // Профиль
    PROFILE_NAME: document.querySelector('.profile__name'),
    PROFILE_ABOUT: document.querySelector('.profile__about'),
    EDIT_PROFILE_BUTTON: document.querySelector('.profile__edit-button'),
    ADD_CARD_BUTTON: document.querySelector('.profile__add-button'),

    // Попап изменения профиля
    EDIT_PROFILE_POPUP: document.querySelector('.popup_type_edit-profile'),
    PROFILE_NAME_INPUT: document.querySelector('.popup__input_type_profile-name'),
    PROFILE_ABOUT_INPUT: document.querySelector('.popup__input_type_profile-about'),

    // Попап добавления карточки
    ADD_CARD_POPUP: document.querySelector('.popup_type_add-card'),
    PLACE_NAME_INPUT: document.querySelector('.popup__input_type_place-name'),
    PLACE_LINK_INPUT: document.querySelector('.popup__input_type_place-image-link')
}