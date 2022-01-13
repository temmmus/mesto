export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileAboutSelector);
    this.userInfo = {};
  }

  // получение данных со страницы
  getUserInfo() {
    this.userInfo["name"] = this._name.textContent;
    this.userInfo["about"] = this._about.textContent;

    return this.userInfo;
  }

  // добавление новых данных на страницу
  setUserInfo(data) {
    this._name.textContent = data["popup__input_type_profile-name"];
    this._about.textContent = data["popup__input_type_profile-about"];
  }
}
