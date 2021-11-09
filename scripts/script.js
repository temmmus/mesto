// Профиль
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Попап изменения профиля
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const profileNameInput = editProfilePopup.querySelector('.popup__input_type_profile-name');
const profileAboutInput = editProfilePopup.querySelector('.popup__input_type_profile-about');

// Попап добавления карточки
const addCardPopup = document.querySelector('.popup_type_add-card');
const placeNameInput = addCardPopup.querySelector('.popup__input_type_place-name');
const placeLinkInput = addCardPopup.querySelector('.popup__input_type_place-image-link');

// Попап превью
const imageViewPopup = document.querySelector('.popup_type_view-image');

// Список карточек мест
const placeContainer = document.querySelector('.places');




// Создание картички
function createCard (placeTitle, placeImage) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

    placeElement.querySelector('.place__title').textContent = placeTitle;
    placeElement.querySelector('.place__image').src = placeImage;
    placeElement.querySelector('.place__image').alt = placeTitle;

    addCard(placeElement);
};


// Добавление карточки в DOM
function addCard (card) {
    placeContainer.prepend(card);

    // лайк карточки
    document.querySelector('.place__like-button').addEventListener('click', event => {
        event.target.closest('.place__like-button').classList.toggle('place__like-button_active');
    });
    // удаление карточки  
    document.querySelector('.place__remove-button').addEventListener('click', event => {
        event.target.closest('.place').remove();
    });
    // открытие попапа с картинкой  
    document.querySelector('.place__image').addEventListener('click', handlerImageViewPopupOpen );
}


// Создание дефолтных карточек
function initialCardsCreation (cards) { 
    cards.forEach(element => createCard(element.name, element.link));
};
initialCardsCreation(initialCards);


// Открытие попапа
const openPopup = (elem) => {
    elem.classList.add('popup_opened');

    // закрытие по кнопке
    elem.querySelector('.popup__close-button').addEventListener('click', () => closePopup(elem));

    // закрытие по Esc
    window.addEventListener('keydown', handleEscapeKeydown);
};

// Закрытие попапа по Esc
function handleEscapeKeydown(event) {
    if (event.key === 'Escape') { 
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    }
};


editProfileButton.addEventListener('click', handlerEditProfilePopupOpen);
addCardButton.addEventListener('click', () => openPopup(addCardPopup) );

// Открытие формы изменения профиля
function handlerEditProfilePopupOpen() {
    profileNameInput.value = profileName.textContent;
    profileAboutInput.value = profileAbout.textContent;
    openPopup(editProfilePopup);
};


// Открытие превью с картинкой
function handlerImageViewPopupOpen(event) {
    let placeImage = event.target.src;
    let placeName = event.target.alt;
    
    imageViewPopup.querySelector('.popup__image').src = placeImage;
    imageViewPopup.querySelector('.popup__image-title').textContent = placeName;
    
    openPopup(imageViewPopup);
};


// Закрыти попапа
const closePopup = (elem) => { 
    elem.classList.remove('popup_opened');
};


// Обновление профиля через форму
function changeProfile() {
    profileName.textContent = profileNameInput.value;
    profileAbout.textContent = profileAboutInput.value;
    event.preventDefault();
    closePopup(editProfilePopup);
};
editProfilePopup.addEventListener('submit', changeProfile);


// Создание карточки через форму
function createNewCard() {
    let placeTitle = document.querySelector('.popup__input_type_place-name').value; 
    let placeImage = document.querySelector('.popup__input_type_place-image-link').value;
    createCard(placeTitle, placeImage);
    event.preventDefault();
    closePopup(addCardPopup);
};
addCardPopup.addEventListener('submit', createNewCard);
