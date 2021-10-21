let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let saveButton = document.querySelector(".popup__save-button");
let profileName= document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__occupation");
let popupProfileName = document.querySelector(".popup__input_name");
let popupProfileOccupation= document.querySelector(".popup__input_occupation");
let popup = document.querySelector(".popup");

editButton.addEventListener('click', function () {
    popup.classList.add('popup_condition_opened');
  }); 

closeButton.addEventListener('click', function () {
    popup.classList.toggle('popup_condition_opened');
  });   


saveButton.addEventListener('click', function () {
    
    profileName.textContent = popupProfileName.textContent;
    popup.classList.toggle('popup_condition_opened');
    console.log(popupProfileName.textContent);
    console.log(profileName);
    return profileName.textContent;
  });     