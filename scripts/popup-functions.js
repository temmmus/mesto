// открытие попапа
function openPopup(elem) {
    elem.classList.add('popup_opened'); // добавление класса открытия попапа
    elem.querySelector('.popup__close-button').addEventListener('click', closeByButtonClick); // закрытие по кнопке
    elem.addEventListener('click', closeByOverlayClick); // закрытие по нажатию на оверлей   
    window.addEventListener('keydown', handleEscapeKeydown); // закрытие по Esc
};

// закрытие попапа
function closePopup(evt) { 
    document.querySelector('.popup_opened').classList.remove('popup_opened'); // найти открытый попап
    evt.target.removeEventListener('click', closeByButtonClick);
    evt.target.removeEventListener('click', closeByOverlayClick);
    window.removeEventListener('keydown', handleEscapeKeydown);
};

// закрытие попапа по кнопке
function closeByButtonClick(evt) {
    if (evt.target.classList.contains('popup__close-button')) { 
        closePopup(evt); 
    }
};

// закрытие попапа по нажатию на оверлей
function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) { 
        closePopup(evt); 
    }
};

// закрытие попапа по Esc
function handleEscapeKeydown(evt) {
    if (evt.key === 'Escape') { 
        closePopup(evt)
    }
};

// открыть превью с картинкой
function handleImageViewPopupOpen(event) {
    const placeImage = event.target.src;
    const placeName = event.target.alt;
    
    imageViewPopup.querySelector('.popup__image').src = placeImage;
    imageViewPopup.querySelector('.popup__image-title').textContent = placeName;
    
    openPopup(imageViewPopup);
};

export {openPopup, closePopup}