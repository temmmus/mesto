export default class FormValidator {
    constructor(config, element) {
        this._config = config; 
        this._element = element; 
    }

    // показать ошибку
    _showInputError(formElement, inputElement, errorMessage, config) {
        const errorElement = inputElement.nextElementSibling;
  
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    };
  
    // скрыть ошибку
    _hideInputError(formElement, inputElement, config) {
        const errorElement = inputElement.nextElementSibling;
  
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };
  
    // проверка валидации полей ввода
    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, this._config);
        } else {
            this._hideInputError(formElement, inputElement, this._config);
        }
    };

    //
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };

    // отключение/включение кнопки сохранить
    _toggleButtonState(inputList, buttonElement, config) {
        if ( this._hasInvalidInput(inputList) ) {
            buttonElement.classList.add(this._config.inactiveButtonClass);
            buttonElement.setAttribute('disabled', '');
        } else {
            buttonElement.classList.remove(this._config.inactiveButtonClass);
            buttonElement.removeAttribute('disabled', '');
        }
  };

    // добавление слушателей
    _setEventListeners(formElement, config) {
        const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
        const buttonElement = formElement.querySelector(this._config.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement, config);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement, this._config);
            });
        });
    };

   // влючение валидации
    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._config.formSelector));

        formList.forEach( (formElement) => {
            formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this._setEventListeners(formElement, this._config);
    });
};
}