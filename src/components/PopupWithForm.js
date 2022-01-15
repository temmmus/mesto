import Popup from "./Popup.js";

export default class extends Popup {
  constructor(popupSelector, formConfig, formSubmit) {
    super(popupSelector);
    this._formConfig = formConfig;
    this._formSubmit = formSubmit;
    this._submitButton = this._popup.querySelector(
      this._formConfig.submitButtonSelector
    );
    this.popupForm = this._popup.querySelector(this._formConfig.formSelector);
    this._inputList = Array.from(
      this._popup.querySelectorAll(this._formConfig.inputSelector)
    );
  }

  _getInputValues() {
    const data = {};

    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  close() {
    super.close();
    this._submitButton.textContent = "Сохранить";
    this.popupForm.reset(); // очистить поля формы
  }

  _handleFormSubmit(event) {
    const data = this._getInputValues();
    this._submitButton.textContent = "Сохранение...";
    this._formSubmit(data);
    event.preventDefault();
  }

  setEventListeners() {
    super.setEventListeners();

    this.popupForm.addEventListener(
      "submit",
      this._handleFormSubmit.bind(this)
    );
  }
}
