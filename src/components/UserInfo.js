import { pageElements } from "../utils/page-elements.js";

export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector) {
    this._profileName = profileNameSelector;
    this._profileAbout = profileAboutSelector;
  }

  getUserInfo() {
    const data = { name: this._profileName, about: this._profileAbout };

    return data;
  }

  setUserInfo(data) {
    const name = data["popup__input_type_profile-name"];
    const about = data["popup__input_type_profile-about"];

    pageElements.PROFILE_NAME.textContent = name;
    pageElements.PROFILE_ABOUT.textContent = about;

    this._profileName = name;
    this._profileAbout = about;
  }
}
