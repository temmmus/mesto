export default class Card {
    constructor(title, link) {
        this._title = title;
        this._link = link;
    }
    
    // получение шаблонаы
    _getTemplate() {
        // забираем разметку из HTML и клонируем элемент
        const cardElement = document
            .querySelector('#place-template')
            .content
            .querySelector('.place')
            .cloneNode(true);
          
        // возвращаем DOM-элемент карточки
        return cardElement;
    } 
    
    // создание карточки
    generateCard() {
        // записываем разметку в приватное поле _element
        this._element = this._getTemplate();

        // добавляем слушатели
        this._setEventListeners();

        // добавляем данные
        this._element.querySelector('.place__title').textContent = this._title;
        this._element.querySelector('.place__image').src = this._link;
        this._element.querySelector('.place__image').alt = this._title

        // возвращаем элемент
        return this._element;
    }   

    // добавление слушателей
    _setEventListeners() {
        // открытие попапа
        this._element.querySelector('.place__image').addEventListener('click', this._handleOpenPopup);

        // лайк карточки
        this._element.querySelector('.place__like-button').addEventListener('click', event => {
            event.target.closest('.place__like-button').classList.toggle('place__like-button_active');
        });

        // удаление карточки  
        this._element.querySelector('.place__remove-button').addEventListener('click', event => {
            event.target.closest('.place').remove();
        });
      }
    

    _handleOpenPopup(evt) {
        // получение данных из элемента карточки
        const placeImage = evt.target.src;
        const placeName = evt.target.alt;
    
        const imageViewPopup = document.querySelector('.popup_type_view-image'); // Попап превью

        // вставка данных в попап
        imageViewPopup.querySelector('.popup__image').src = placeImage;
        imageViewPopup.querySelector('.popup__image-title').textContent = placeName;
    
        // добавление класса для открытия попапа
        imageViewPopup.classList.add('popup_opened');

        // закрытие попапа по кнопке
        imageViewPopup.querySelector('.popup__close-button').addEventListener('click', () => {
            imageViewPopup.classList.remove('popup_opened');
        });

    }
}


