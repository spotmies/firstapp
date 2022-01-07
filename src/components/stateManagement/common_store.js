import { makeAutoObservable } from "mobx";
import { apiGetMethod } from "../../api_services/api_calls/api_calls";
import constants from "../../helpers/constants";
class CommonStore {
  isUserLogin = false;
  userDetails = {};
  feedbackQuestions = {};
  constructor() {
    makeAutoObservable(this);
  }

  setUserLogin = (value) => {
    this.isUserLogin = value ?? true;
  };
  setUserDetails = (value) => {
    this.userDetails = value ?? {};
  };

  getFeedbackQuestionFromDB = async () => {
    const response = await apiGetMethod(
      constants.api.feedback_questions + "61d830c239e162b750e2414e"
    );
    if (response != null) {
      this.feedbackQuestions = response;
    }
  };
}

export default CommonStore;
