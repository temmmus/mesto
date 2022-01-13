export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector) {
    // this._profileNameSelector = profileNameSelector;
    // this._profileAboutSelector = profileAboutSelector;

    this._name = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileAboutSelector);
    this.userInfo = {};
  }

  //
  getUserInfo() {
    this.userInfo["name"] = this._name.textContent;
    this.userInfo["about"] = this._about.textContent;
    // this.userInfo["name"] = document.querySelector(
    //   this._profileNameSelector
    // ).textContent;
    // this.userInfo["about"] = document.querySelector(
    //   this._profileAboutSelector
    // ).textContent;

    return this.userInfo;
  }

  // добавление новых данных на страницу
  setUserInfo(data) {
    console.log(data["popup__input_type_profile-name"]);
    this._name = data["popup__input_type_profile-name"];
    this._about = data["popup__input_type_profile-about"];
    // document.querySelector(this._profileNameSelector).textContent =
    //   data["popup__input_type_profile-name"];
    // document.querySelector(this._profileAboutSelector).textContent =
    //   data["popup__input_type_profile-about"];
  }
}
