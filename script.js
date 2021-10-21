let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let saveButton = document.querySelector(".popup__save-button");
let profileName= document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__occupation");
let popupProfileName = document.querySelector(".popup__input_name");
let popupProfileOccupation= document.querySelector(".popup__input_occupation");
let popup = document.querySelector(".popup");
let likeCheckbox = document.querySelector(".place__like-checkbox");
let likeLable = document.querySelector(".place__like-lable");



// открытие попапа
editButton.addEventListener('click', function () {
    popup.classList.add('popup_opened');
  }); 

// закрытие попапа
closeButton.addEventListener('click', function () {
    popup.classList.toggle('popup_opened');
  });   


saveButton.addEventListener('click', function () {
    profileName.textContent = popupProfileName.textContent;
    popup.classList.toggle('popup_opened');
    return profileName.textContent;
  });     



// проставление лайка
// likeCheckbox.addEventListener('change', function () {
//     likeLable.classList.toggle('place__like-lable_checked');
//   });   
