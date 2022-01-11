// открытие попапа
function openPopup(elem) {
    elem.classList.add('popup_opened'); // добавление класса открытия попапа
    elem.addEventListener('click', closeByOverlayClick); // обработчик закрытия по нажатию на оверлей   
    window.addEventListener('keydown', handleEscapeKeydown); // обработчик закрытия по Esc
};

// закрытие попапа
function closePopup() { 
    const openedPopup = document.querySelector('.popup_opened') // найти открытый попап
    const closeButton = openedPopup.querySelector('.popup__close-button'); // найти кнопку закрытия

    openedPopup.removeEventListener('click', closeByOverlayClick); // удалить обработчик нажатия на оверлей
    window.removeEventListener('keydown', handleEscapeKeydown); // удалить обработчик закрытия по Esc

    openedPopup.classList.remove('popup_opened'); // удалить класс открытого состояния попапа
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

// добавление обработчиков закрытия попапа по кнопке 
document.querySelectorAll('.popup__close-button').forEach((item) => {
    item.addEventListener('click', closeByButtonClick);
});


export {openPopup, closePopup}