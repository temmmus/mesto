export default class FormValidator {
  constructor(element, config) {
    this._element = element;
    this._config = config;
    this._inputList = Array.from(
      this._element.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._element.querySelector(
      this._config.submitButtonSelector
    );
  }

  // показать ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling;

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // скрыть ошибку
  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling;

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  // проверка валидации полей ввода
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // проверка наличия невалидных импутов
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // отключение/включение кнопки сохранить
  _toggleButtonState(inputList, buttonElement, config) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", "");
    }
  }

  // добавление слушателей
  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement, this._config);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(
          this._inputList,
          this._buttonElement,
          this._config
        );
      });
    });
  }

  // сброс валидации
  resetValidation() {
    this._toggleButtonState(this._inputList, this._buttonElement, this._config);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  // влючение валидации
  enableValidation() {
    this._setEventListeners();
  }
}
