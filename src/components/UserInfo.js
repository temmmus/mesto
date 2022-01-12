export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector) {
    this._profileName = document.querySelector(profileNameSelector).textContent;
    this._profileAbout =
      document.querySelector(profileAboutSelector).textContent;
    this.userInfo = {};
  }

  //
  getUserInfo() {
    this.userInfo["name"] = this._profileName;
    this.userInfo["about"] = this._profileAbout;

    return this.userInfo;
  }

  // добавление новых данных на страницу
  setUserInfo(data) {
    this.userInfo["name"] = data["popup__input_type_profile-name"];
    this.userInfo["about"] = data["popup__input_type_profile-about"];
  }
}
