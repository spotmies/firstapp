import { makeAutoObservable } from "mobx";
import constants from "../../helpers/constants";
import {
  apiDelMethod,
  apiGetMethod,
  apiPostPut,
} from "../../api_services/api_calls/api_calls";

class ServiceList {
  serviceList = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchServiceFromDb = async () => {
    if (this.loading) {
      alert("Error, try again later..");
      return;
    }
    console.log("getting users from db");
    thsi.loading = true;
    const res = await apiGetMethod(constants.servicesList);
    this.loading = false;
    if (res.status === 200) {
      this.serviceList = res.body;
      console.log(res.body);
    } else {
      console.log("something went wrong", res.status);
    }
  };
}

export default ServiceList;
