export default class FormValidator {
    constructor(config, element) {
        this._config = config; 
        this._element = element; 
    }

    // показать ошибку
    _showInputError(inputElement, errorMessage) {
        const errorElement = inputElement.nextElementSibling;
  
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    };
  
    // скрыть ошибку
    _hideInputError(inputElement) {
        const errorElement = inputElement.nextElementSibling;
  
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };
  
    // проверка валидации полей ввода
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
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
    _setEventListeners() {
        const inputList = Array.from(this._element.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._element.querySelector(this._config.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement, this._config);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement, this._config);
            });
        });
    };
    
   // влючение валидации
    enableValidation() {
        this._setEventListeners();
    };
}