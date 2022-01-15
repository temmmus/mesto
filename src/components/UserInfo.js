export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector, getUserId) {
    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileAboutSelector);
    this.userId = getUserId;
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
    this._name.textContent = data["name"];
    this._about.textContent = data["about"];
  }
}
