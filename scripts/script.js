// Профиль
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let buttonEditProfile = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let inputProfileName = document.querySelector('.popup__input_type_profile-name');
let inputProfileAbout = document.querySelector('.popup__input_type_profile-about');

// Карточки
let popupAddCard = document.querySelector('.popup_type_add-card');
let buttonAddCard = document.querySelector('.profile__add-button');
let inputPlaceName = document.querySelector('.popup__input_type_place-name');
let inputPlaceLink = document.querySelector('.popup__input_type_place-image-link');

// Превью
let popupImageView = document.querySelector('.popup_type_view-image');


// Открытие попапа изменения профиля
function openPopupEditProfile() {
    popupEditProfile.classList.add('popup_opened');

    inputProfileName.value = profileName.textContent;
    inputProfileAbout.value = profileAbout.textContent;

    popupEditProfile.querySelector('.popup__close-button').addEventListener('click', closePopup);
};
buttonEditProfile.addEventListener('click', openPopupEditProfile);

// Открытие попапа добавления карточки
function openPopupAddCard() {
    popupAddCard.classList.add('popup_opened');

    popupAddCard.querySelector('.popup__close-button').addEventListener('click', closePopup);
};
buttonAddCard.addEventListener('click', openPopupAddCard);

// Открытие попапа с картинкой
function openPopupImageView(event) {
    let placeImage = event.target.src;
    let placeName = event.target.alt;

    popupImageView.classList.add('popup_opened');
    
    popupImageView.querySelector('.popup__image').src = placeImage;
    popupImageView.querySelector('.popup__image-title').textContent = placeName;
    
    popupImageView.querySelector('.popup__close-button').addEventListener('click', closePopup);
};



// Закрытие попапа по кнопке
function closePopup() {
    event.target.closest('.popup').classList.remove('popup_opened');
};
buttonAddCard.addEventListener('click', openPopupAddCard);

// Закрытие попапа по нажатию Escape
document.addEventListener('keyup', function(event) {
    if (popupEditProfile.classList.contains('popup_opened') && event.key === 'Escape') {
        popupEditProfile.classList.remove('popup_opened');
    } else if (popupAddCard.classList.contains('popup_opened') && event.key === 'Escape') {
        popupAddCard.classList.remove('popup_opened');
    } else if (popupImageView.classList.contains('popup_opened') && event.key === 'Escape') {
        popupImageView.classList.remove('popup_opened');
    }  
});

// Закрытие попапа по нажатию Enter
document.addEventListener('keypress', function(event) {
    if (popupEditProfile.classList.contains('popup_opened') && event.key === 'Enter') {
        changeProfile();
    } else if (popupAddCard.classList.contains('popup_opened') && event.key === 'Enter') {
        createNewCard();
    }
});


// Обновление профиля
function changeProfile() {
    profileName.textContent = inputProfileName.value;
    profileAbout.textContent = inputProfileAbout.value;
    event.preventDefault();
    closePopup();
};
popupEditProfile.addEventListener('submit', changeProfile);







// Добавление карточек
const initialCards = [
    {
        name: 'Домбай',
        link: './images/Домбай.jpg'
    },
    {
        name: 'Гора Эльбрус',
        link: './images/Эльбрус.jpg'
    },
    {
        name: 'Маньпупунёр',
        link: './images/Маньпупунёр.jpg'
    },
    {
        name: 'Озеро Троицкое',
        link: './images/Озеро_Троицкое.jpg'
    },
    {
        name: 'Васюганские болота',
        link: './images/Васюганские_болота.jpg'
    },
    {
        name: 'Озеро Эльтон',
        link: './images/Озеро_Эльтон.jpg'
    },
]; 
const placeContainer = document.querySelector('.places');
function addCard (placeTitle, placeImage) {
    const placeTemplate = document.querySelector('#place-template').content;
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

    placeElement.querySelector('.place__title').textContent = placeTitle;
    placeElement.querySelector('.place__image').src = placeImage;
    placeElement.querySelector('.place__image').alt = placeTitle;

    placeContainer.prepend(placeElement);

    // лайк карточки
    document.querySelector('.place__like-button').addEventListener('click', event => {
        event.target.closest('.place__like-button').classList.toggle('place__like-button_active');
    });
    // удаление карточки  
    document.querySelector('.place__remove-button').addEventListener('click', event => {
        event.target.closest('.place').remove();
    });
    // открытие превью  
    document.querySelector('.place__image').addEventListener('click', event => {
        openPopupImageView(event);
    });    
};

// Создание дефолтных карточек
function initialCardsCreation (cards) {
    for (i in initialCards) {
        addCard(initialCards[i].name, initialCards[i].link);
    }
};
initialCardsCreation(initialCards);

// Создание карточки через форму
function createNewCard() {
    let placeTitle = document.querySelector('.popup__input_type_place-name').value; 
    let placeImage = document.querySelector('.popup__input_type_place-image-link').value;
    addCard(placeTitle, placeImage);
    event.preventDefault();
    closePopup();
};
popupAddCard.addEventListener('submit', createNewCard);

