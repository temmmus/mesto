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

const imageViewPopup = document.querySelector('.popup_type_view-image'); // Попап превью
const cardsContainer = document.querySelector('.places'); // Список карточек
const cardTemplate = document.querySelector('#place-template'); // Шаблон карточки





// Создание карточки
const generateCard = (title, image) => {
    const card = cardTemplate.content.querySelector('.place').cloneNode(true);
    card.querySelector('.place__title').textContent = title;
    card.querySelector('.place__image').src = image;
    card.querySelector('.place__image').alt = title;

    // лайк карточки
    card.querySelector('.place__like-button').addEventListener('click', event => {
        event.target.closest('.place__like-button').classList.toggle('place__like-button_active');
    });
    // удаление карточки  
    card.querySelector('.place__remove-button').addEventListener('click', event => {
        event.target.closest('.place').remove();
    });
    // открытие попапа с картинкой  
    card.querySelector('.place__image').addEventListener('click', handleImageViewPopupOpen);

    return card;
};

// Добавление карточки в DOM
const renderElement = (container, element) => {
    container.prepend(element);
};



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

// Закрыти попапа
const closePopup = (elem) => { 
    elem.classList.remove('popup_opened');
};



// Открытие формы изменения профиля
function handleEditProfilePopupOpen() {
    profileNameInput.value = profileName.textContent;
    profileAboutInput.value = profileAbout.textContent;
    openPopup(editProfilePopup);
};


// Открытие превью с картинкой
function handleImageViewPopupOpen(event) {
    let placeImage = event.target.src;
    let placeName = event.target.alt;
    
    imageViewPopup.querySelector('.popup__image').src = placeImage;
    imageViewPopup.querySelector('.popup__image-title').textContent = placeName;
    
    openPopup(imageViewPopup);
};



// Обновление профиля через форму
function changeProfile(event) {
    profileName.textContent = profileNameInput.value;
    profileAbout.textContent = profileAboutInput.value;
    event.preventDefault();
    closePopup(editProfilePopup);
};

// Создание карточки через форму
const handleImageFormSubmit = (event) =>  {
    renderElement(cardsContainer, generateCard(placeNameInput.value, placeLinkInput.value)); // создаем карточку и вставляем в DOM
    closePopup(addCardPopup); // закрываем попап
    addCardPopup.querySelector('.popup__form').reset(); // очищаем поля формы
    event.preventDefault();
};

// Создание дефолтных карточек
function initialCardsCreation (cards) { 
    cards.forEach(elem => renderElement(cardsContainer, generateCard(elem.name, elem.link)));
};


window.addEventListener('load', () => initialCardsCreation(initialCards) );
editProfileButton.addEventListener('click', handleEditProfilePopupOpen);
addCardButton.addEventListener('click', () => openPopup(addCardPopup) );
editProfilePopup.addEventListener('submit', changeProfile);
addCardPopup.addEventListener('submit', handleImageFormSubmit);
