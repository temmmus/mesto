import Card from './Card.js';
// import FormValidator from './FormValidator.js';
import {initialCards} from './initial-сards.js';

const cardsContainer = document.querySelector('.places'); // Список карточек



initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.title, item.link);

  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardsContainer.append(cardElement);

});