export const popupOpenedSelector = "popup_opened";
export const popupWithImageSelector = ".popup_type_add-card";
export const cardListSelector = ".places";
export const cardTemplateSelector = "place-template";
export const cardSelector = ".place";

export const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const dombay = new URL("../images/Домбай.jpg", import.meta.url);
const elbrus = new URL("../images/Эльбрус.jpg", import.meta.url);
const manpupuner = new URL("../images/Маньпупунёр.jpg", import.meta.url);
const lakeTroitsk = new URL("../images/Озеро_Троицкое.jpg", import.meta.url);
const vasyuganSwamp = new URL(
  "../images/Васюганские_болота.jpg",
  import.meta.url
);
const lakeElton = new URL("../images/Озеро_Эльтон.jpg", import.meta.url);

export const initialCards = [
  {
    title: "Домбай",
    link: dombay,
  },
  {
    title: "Гора Эльбрус",
    link: elbrus,
  },
  {
    title: "Маньпупунёр",
    link: manpupuner,
  },
  {
    title: "Озеро Троицкое",
    link: lakeTroitsk,
  },
  {
    title: "Васюганские болота",
    link: vasyuganSwamp,
  },
  {
    title: "Озеро Эльтон",
    link: lakeElton,
  },
];
