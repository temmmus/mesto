import { pageElements } from "../utils/page-elements.js";

export default class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
    this._profileName = profileNameSelector;
    this._profileAbout = profileAboutSelector;
    this.userInfo = {};
  }

  getUserInfo() {
    this.userInfo["name"] = this._profileName;
    this.userInfo["about"] = this._profileAbout;

    return userInfo;
  }

  setUserInfo(data) {
    pageElements.PROFILE_NAME.textContent =
      data["popup__input_type_profile-name"];
    pageElements.PROFILE_ABOUT.textContent =
      data["popup__input_type_profile-about"];
  }
}
