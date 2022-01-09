import { makeAutoObservable } from "mobx";
import { apiGetMethod } from "../../api_services/api_calls/api_calls";
import constants from "../../helpers/constants";
class CommonStore {
  isUserLogin = false;
  userDetails = {};
  feedbackQuestions = {};
  cloudConstants = {};
  currentConstants = [];
  showUi = false;
  constructor() {
    makeAutoObservable(this);
  }

  setUserLogin = (value) => {
    this.isUserLogin = value ?? true;
  };
  setUserDetails = (value) => {
    this.userDetails = value ?? {};
  };

  getFeedbackQuestionFromDB = async ({
    id = "61d830c239e162b750e2414e",
  } = {}) => {
    const response = await apiGetMethod(constants.api.feedback_questions + id);
    if (response != null) {
      this.feedbackQuestions = response;
    }
  };
  getLabelByKeyWithScreen(key, screen) {
    const currentConstants = this.cloudConstants[screen];
    const index = currentConstants.findIndex((item) => item.objId == key);
    if (index < 0) return "index";
    return currentConstants[index]["label"] ?? "";
  }
  getCloudConstantsFromDB = async () => {
    const response = await apiGetMethod(constants.api.cloud_constants);
    if (response != null) {
      this.cloudConstants = response;
      this.getFeedbackQuestionFromDB({
        id: this.getLabelByKeyWithScreen("feedback_question_id", "utilities"),
      });
      console.log("clound constants imported >>>>>>>>>>>>>>.");
      this.setCurrentConstantsLocation(window.location.pathname);
      this.showUi = true;
    }
  };
  setCurrentConstants = (constantsName) => {
    console.log("setting constatns >>>>>>>>>>>>>>>>>>>>");
    this.currentConstants = this.cloudConstants[constantsName] ?? [];
  };

  setCurrentConstantsLocation = (location) => {
    let routes = location.split("/");
    if (routes[1] == "") {
      this.setCurrentConstants("home");
    }
    let constantsName = constants.routeConstants[routes[1]] ?? "home";
    this.setCurrentConstants(constantsName);
  };

  getText(text_key) {
    const index = this.currentConstants.findIndex(
      (item) => item.objId == text_key
    );
    if (index < 0) return "index";
    return this.currentConstants[index]["label"] ?? "";
  }
}

export default CommonStore;
