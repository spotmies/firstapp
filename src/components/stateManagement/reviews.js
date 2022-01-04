import { makeAutoObservable } from "mobx";
import constants from "../../helpers/constants";
import {
  apiDelMethod,
  apiGetMethod,
  apiPostPut,
} from "../../api_services/api_calls/api_calls";

class Reviews {
    reviewList = [];
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    fetchReviews = async (pid) => {
        if(this.loading) {
            alert("Error, Try again later");
            return;
        }
        console.log("getting reviews data");
        this.loading = true;
        const res = await apiGetMethod(constants.reviews+pid);
        this.loading = false;
        if (res !== null) {
          this.reviewList = res;
          console.log(res);
          console.log("reviewList object", this.reviewList)
        } else {
          console.log("something went wrong", res.status);
        }
    }
}

export default Reviews;