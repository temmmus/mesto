export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector) {
    this._profileNameSelector = profileNameSelector;
    this._profileAboutSelector = profileAboutSelector;
    this.userInfo = {};
  }

  //
  getUserInfo() {
    this.userInfo["name"] = document.querySelector(
      this._profileNameSelector
    ).textContent;
    this.userInfo["about"] = document.querySelector(
      this._profileAboutSelector
    ).textContent;

    return this.userInfo;
  }

  // добавление новых данных на страницу
  setUserInfo(data) {
    console.log("это в классе ", data);
    document.querySelector(this._profileNameSelector).textContent =
      data["popup__input_type_profile-name"];
    document.querySelector(this._profileAboutSelector).textContent =
      data["popup__input_type_profile-about"];
  }
}
