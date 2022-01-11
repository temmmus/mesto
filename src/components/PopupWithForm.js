import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import { formConfig } from "../utils/constants.js";

export default class extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector(formConfig.formSelector);
    this._validator = new FormValidator(formConfig, this._popupForm);
  }

  _getInputValues() {
    const data = {};

    const inputList = Array.from(
      this._popup.querySelectorAll(formConfig.inputSelector)
    );

    inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  open() {
    super.open();
    this._enableValidation();
  }

  close() {
    super.close();
    this._popup.querySelector(formConfig.formSelector).reset(); // очистить поля формы
    this._popup.removeEventListener("submit", this._handleFormSubmit); // удалить обработчик сохранения
    this._resetValidation();
  }

  _enableValidation() {
    this._validator.enableValidation();
  }

  _resetValidation() {
    this._validator.resetValidation();
  }

  _handleFormSubmit(event) {
    const data = this._getInputValues();
    this._formSubmit(data);
    this.close();
    event.preventDefault();
  }

  setEventListeners() {
    super.setEventListeners();

    // ообработчик сабмита формы
    // this._popup.addEventListener(
    //   "submit",
    //   (evt) => {
    //     this._formSubmit(this._getInputValues());
    //     this.close();
    //     evt.preventDefault();
    //   },
    //   { once: true } // удаление обработчика
    // );
    this._popup.addEventListener("submit", this._handleFormSubmit.bind(this));
  }
}
