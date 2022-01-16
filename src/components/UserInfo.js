export default class UserInfo {
  constructor() {
    // this._userInfo;
  }

  static userInfo;
  // созранение данных пользователя
  setUserInfo(data) {
    this._userInfo = data;
  }

  // получение данных со пользователя
  getUserInfo() {
    return this._userInfo;
  }

  // добавление имени и профессии на страницу
  setUserInfoOnPage(selectors) {
    document.querySelector(selectors.profileName).textContent =
      this._userInfo.name;
    document.querySelector(selectors.profileAbout).textContent =
      this._userInfo.about;
  }

  // добавление аватара на страницу
  setUserAvatarOnPage(selectors) {
    document.querySelector(selectors.profileAvatar).src = this._userInfo.avatar;
  }

  // добавление данных в форму
  setUserInfoInForm(selectors) {
    document.querySelector(selectors.profileFormNameInput).value =
      this._userInfo.name;
    document.querySelector(selectors.profileFormAboutInput).value =
      this._userInfo.about;
  }
}
