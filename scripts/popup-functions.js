// открытие попапа
function openPopup(elem) {
    elem.classList.add('popup_opened'); // добавление класса открытия попапа
    elem.addEventListener('click', closeByOverlayClick); // обработчик закрытия по нажатию на оверлей   
    window.addEventListener('keydown', handleEscapeKeydown); // обработчик закрытия по Esc
    // elem.querySelector('.popup__close-button').addEventListener('click', closeByButtonClick); // обработчик закрытия по кнопке 
};

// закрытие попапа
function closePopup() { 
    const openedPopup = document.querySelector('.popup_opened') // найти открытый попап
    const closeButton = openedPopup.querySelector('.popup__close-button'); // найти кнопку закрытия

    openedPopup.removeEventListener('click', closeByOverlayClick); // удалить обработчик нажатия на оверлей
    closeButton.removeEventListener('click', closeByButtonClick); // удалить обработчик кнопки закрытия
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

// не согласен с комментарием касательно добавления обработчиков для кнопок закрытия
// если обработку крестиков сделать отдельно 1 раз, то она и отрабатывает только 1 раз
// получается ситуация, если открыти, а затем закрыть попап по крестику, то при повторном открытии закрытие по крестику больше работать не будет
// почему мы не можем добавлять обработчик при открытии, ведь он все равно будет удален при закрытии окна (при вызове closePopup)?
// возможно я неправильно понял, к сожалению, где оставить комментарий по ревью я не разобрался, решил написать здесь
document.querySelectorAll('.popup__close-button').forEach((item) => {
    item.addEventListener('click', closeByButtonClick);
});


export {openPopup, closePopup}