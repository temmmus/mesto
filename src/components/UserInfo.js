export default class UserInfo {
  constructor() {}

  setUserInfo(data) {
    this.userInfo = data;
  }

  // получение данных со страницы
  getUserInfo() {
    return this.userInfo;
  }

  // добавление имени и профессии на страницу
  setUserInfoOnPage(selectors) {
    document.querySelector(selectors.profileName).textContent =
      this.userInfo.name;
    document.querySelector(selectors.profileAbout).textContent =
      this.userInfo.about;
  }

  // добавление аватара на страницу
  setUserAvatarOnPage(selectors) {
    document.querySelector(selectors.profileAvatar).src = this.userInfo.avatar;
  }

  // добавление данных в форму
  setUserInfoInForm(selectors) {
    document.querySelector(selectors.profileFormNameInput).value =
      this.userInfo.name;
    document.querySelector(selectors.profileFormAboutInput).value =
      this.userInfo.about;
  }
}
