// показать ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

    toggleButtonState(formElement);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

// скрыть ошибку
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

    toggleButtonState(formElement);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};


// проверка валидации полей ввода
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

  
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
      });
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

// отключение/включение кнопки сохранить
function toggleButtonState(inputList, buttonElement) {
    if ( hasInvalidInput(inputList) ) {
        buttonElement.classList.remove('popup__save-button_type_available');
        buttonElement.classList.add('popup__save-button_type_disabled');
    } else {
        buttonElement.classList.remove('popup__save-button_type_disabled');
        buttonElement.classList.add('popup__save-button_type_available');
    }
  };







// включить валидацию
const enableValidation = () => {
    let formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach( (formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    setEventListeners(formElement);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 