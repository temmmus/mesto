(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){var o=e.data,i=e.handleCardClick,a=e.handleDeleteClick,u=e.hendleLikeClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._currentUserId=r._id,this._id=o._id,this.ownerId=o.owner._id,this._name=o.name,this._link=o.link,this._likes=o.likes,this._handleCardClick=i,this._handleDeleteClick=a,this._hendleLikeClick=u,this._template=document.getElementById(n)}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return this._template.content.querySelector(".place").cloneNode(!0)}},{key:"_setEventListeners",value:function(){var e=this;this._cardLikeButton.addEventListener("click",(function(){e._hendleLikeClick(e._id)})),this._cardRemoveButton.addEventListener("click",(function(t){e._handleDeleteClick(e._id)})),this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._name,e._link)}))}},{key:"generateCard",value:function(){var e=this;return this._element=this._getTemplate(),this._element.setAttribute("id",this._id),this._cardImage=this._element.querySelector(".place__image"),this._cardName=this._element.querySelector(".place__title"),this._cardLikeButton=this._element.querySelector(".place__like-button"),this._cardLikeCount=this._element.querySelector(".place__like-count"),this._cardRemoveButton=this._element.querySelector(".place__remove-button"),this.ownerId!=this._currentUserId&&(this._cardRemoveButton.style.display="none"),this._likes.filter((function(t){return t._id===e._currentUserId})).length>0&&this._cardLikeButton.classList.add("place__like-button_active"),this._setEventListeners(),this._cardName.textContent=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardLikeCount.textContent=this._likes.length,this._element}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,r;return t=e,(r=[{key:"addItemAppend",value:function(e){this._container.append(e)}},{key:"addItemPrepend",value:function(e){this._container.prepend(e)}},{key:"removeItem",value:function(e){document.getElementById(e.cardId).remove()}},{key:"renderItems",value:function(){var e=this;this._renderedItems.forEach((function(t){return e._renderer(t)}))}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){document.removeEventListener("keydown",this._handleEscClose),this._popup.classList.remove("popup_opened")}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){(t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__close-button"))&&e.close()}))}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(){return c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=s(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},c.apply(this,arguments)}function s(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=f(e)););return e}function l(e,t){return l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},l(e,t)}function p(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},f(e)}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=f(r);if(o){var n=f(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function a(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,e))._formConfig=t,r._formSubmit=n,r._submitButton=r._popup.querySelector(r._formConfig.submitButtonSelector),r.popupForm=r._popup.querySelector(r._formConfig.formSelector),r._inputList=Array.from(r._popup.querySelectorAll(r._formConfig.inputSelector)),r}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){e[t.name]=t.value})),e}},{key:"close",value:function(){c(f(a.prototype),"close",this).call(this),this._submitButton.textContent="Сохранить",this.popupForm.reset()}},{key:"_handleFormSubmit",value:function(e){var t=this._getInputValues();this._submitButton.textContent="Сохранение...",this._formSubmit(t),e.preventDefault()}},{key:"setEventListeners",value:function(){c(f(a.prototype),"setEventListeners",this).call(this),this.popupForm.addEventListener("submit",this._handleFormSubmit.bind(this))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(i);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=m(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},y.apply(this,arguments)}function m(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}function v(e,t){return v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},v(e,t)}function b(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&v(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popup.querySelector(".popup__image"),t._popupImageName=t._popup.querySelector(".popup__image-title"),t}return t=a,(n=[{key:"open",value:function(e,t){y(k(a.prototype),"open",this).call(this),this._name=e,this._link=t,this._popupImage.src=this._link,this._popupImage.alt=this._name,this._popupImageName.textContent=this._name}}])&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(i);function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var I=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._element=t,this._config=n,this._inputList=Array.from(this._element.querySelectorAll(this._config.inputSelector)),this._buttonElement=this._element.querySelector(this._config.submitButtonSelector)}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t){var n=e.nextElementSibling;e.classList.add(this._config.inputErrorClass),n.textContent=t,n.classList.add(this._config.errorClass)}},{key:"_hideInputError",value:function(e){var t=e.nextElementSibling;e.classList.remove(this._config.inputErrorClass),t.classList.remove(this._config.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_toggleButtonState",value:function(e,t,n){this._hasInvalidInput(this._inputList)?(this._buttonElement.classList.add(this._config.inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.classList.remove(this._config.inactiveButtonClass),this._buttonElement.removeAttribute("disabled",""))}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState(e._inputList,e._buttonElement,e._config)}))}))}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&E(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var w,S,O,L=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,(n=[{key:"setUserInfo",value:function(e){this._userInfo=e}},{key:"getUserInfo",value:function(){return this._userInfo}},{key:"setUserInfoOnPage",value:function(e){document.querySelector(e.profileName).textContent=this._userInfo.name,document.querySelector(e.profileAbout).textContent=this._userInfo.about}},{key:"setUserAvatarOnPage",value:function(e){document.querySelector(e.profileAvatar).src=this._userInfo.avatar}},{key:"setUserInfoInForm",value:function(e){document.querySelector(e.profileFormNameInput).value=this._userInfo.name,document.querySelector(e.profileFormAboutInput).value=this._userInfo.about}}])&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}O=void 0,(S="userInfo")in(w=L)?Object.defineProperty(w,S,{value:O,enumerable:!0,configurable:!0,writable:!0}):w[S]=O;var A=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:{authorization:this._authToken}}).then(this._checkResponse)}},{key:"getUserInfo",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{method:"GET",headers:this._headers}).then(this._checkResponse).then((function(e){return e}))}},{key:"patchUserInfo",value:function(e,t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then(this._checkResponse).then((function(e){return e}))}},{key:"patchUserAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse).then((function(e){return e}))}},{key:"getCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._headers}).then(this._checkResponse).then((function(e){return e}))}},{key:"postNewCard",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._checkResponse).then((function(e){return e}))}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse).then((function(e){return e}))}},{key:"addLikeCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._checkResponse).then((function(e){return e}))}},{key:"deleteLikeCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._checkResponse).then((function(e){return e}))}}])&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),T={PROFILE_NAME:document.querySelector(".profile__name"),PROFILE_ABOUT:document.querySelector(".profile__about"),EDIT_AVATAR_BUTTON:document.querySelector(".profile__avatar-container"),EDIT_PROFILE_BUTTON:document.querySelector(".profile__edit-button"),ADD_CARD_BUTTON:document.querySelector(".profile__add-button")},U={popupAddCard:".popup_type_add-card",popupDeleteCard:".popup_type_delete-card",popupEditProfile:".popup_type_edit-profile",popupEditAvatar:".popup_type_edit-avatar",popupCardPreview:".popup_type_view-image",cardList:".places",cardTemplate:"place-template",card:".place",profileName:".profile__name",profileAbout:".profile__about",profileAvatar:".profile__avatar",profileFormNameInput:".popup__input_type_profile-name",profileFormAboutInput:".popup__input_type_profile-about",popupDeleteCardIdInput:".popup__input_type_card-id"},j={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_type_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function R(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var B=new A({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-33",headers:{authorization:"62b19013-c791-48d0-84cf-12391364b61d","Content-Type":"application/json"}});Promise.all([B.getUserInfo(),B.getCards()]).then((function(e){var n,o,i=(o=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(n,o)||function(e,t){if(e){if("string"==typeof e)return R(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?R(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=i[0],u=i[1],c=new L;c.setUserInfo(a),c.setUserInfoOnPage(U),c.setUserAvatarOnPage(U);var s=new r({items:u,renderer:function(e){s.addItemAppend(l(e))}},U.cardList);function l(e){return new t({data:e,handleCardClick:function(e,t){!function(e,t){d.open(e,t)}(e,t)},handleDeleteClick:function(e){!function(e){document.querySelector(U.popupDeleteCardIdInput).value=e,p.open()}(e)},hendleLikeClick:function(e){document.getElementById(e).querySelector(".place__like-button").classList.contains("place__like-button_active")?B.deleteLikeCard(e).then((function(t){document.getElementById(e).querySelector(".place__like-button").classList.remove("place__like-button_active"),document.getElementById(e).querySelector(".place__like-count").textContent=t.likes.length})).catch((function(e){console.log(e)})):B.addLikeCard(e).then((function(t){document.getElementById(e).querySelector(".place__like-button").classList.add("place__like-button_active"),document.getElementById(e).querySelector(".place__like-count").textContent=t.likes.length})).catch((function(e){console.log(e)}))}},U.cardTemplate,c.getUserInfo()).generateCard()}s.renderItems();var p=new h(U.popupDeleteCard,j,(function(e){B.deleteCard(e.cardId).then((function(){s.removeItem(e)})).catch((function(e){console.log(e)})).finally((function(){p.close()}))})),f=new h(U.popupAddCard,j,(function(e){B.postNewCard(e.name,e.link).then((function(e){s.addItemPrepend(l(e))})).catch((function(e){console.log(e)})).finally((function(){f.close()}))}));f.setEventListeners();var d=new g(U.popupCardPreview);d.setEventListeners(),p.setEventListeners();var _,y={};_=j,Array.from(document.querySelectorAll(_.formSelector)).forEach((function(e){var t=new I(e,_),n=e.getAttribute("name");y[n]=t,t.enableValidation()})),T.ADD_CARD_BUTTON.addEventListener("click",(function(){f.open(),y[f.popupForm.getAttribute("name")].resetValidation()}));var m=new h(U.popupEditProfile,j,(function(e){B.patchUserInfo(e.name,e.about).then((function(){c.setUserInfo(e),m.close()})).catch((function(e){console.log(e)})).finally((function(){c.setUserInfoOnPage(U)}))}));m.setEventListeners();var v=new h(U.popupEditAvatar,j,(function(e){B.patchUserAvatar(e.link).then((function(e){c.setUserInfo(e),v.close()})).catch((function(e){})).finally((function(){c.setUserAvatarOnPage(U)}))}));v.setEventListeners(),T.EDIT_AVATAR_BUTTON.addEventListener("click",(function(){v.open(),y[v.popupForm.getAttribute("name")].resetValidation()})),T.EDIT_PROFILE_BUTTON.addEventListener("click",(function(){c.setUserInfoInForm(U),m.open(),y[f.popupForm.getAttribute("name")].resetValidation()}))}))})();