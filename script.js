let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let saveButton = document.querySelector(".popup__save-button");
let popup = document.querySelector(".popup");
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let inputName = document.querySelector('.popup__input_name');
let inputAbout = document.querySelector('.popup__input_about');



// открытие попапа
function openPopup() {
    inputName.value = profileName.textContent
    inputAbout.value = profileAbout.textContent
    popup.classList.add('popup_opened');
};
editButton.addEventListener('click', openPopup);



// закрытие попапа
function closePopup() {
    popup.classList.toggle('popup_opened'); 
};
closeButton.addEventListener('click', closePopup);




// обновление профиля
function changeProfile() {
    profileName.textContent = inputName.value
    profileAbout.textContent = inputAbout.value
    popup.classList.toggle('popup_opened');
};
saveButton.addEventListener('click', changeProfile);

document.addEventListener('keypress', function(event) {
    if (popup.classList.contains('popup_opened') && event.key === 'Enter') {
        changeProfile()
  }
});

document.addEventListener('keyup', function(event) {
    if (popup.classList.contains('popup_opened') && event.key === 'Escape') {
        closePopup();
  }
});
