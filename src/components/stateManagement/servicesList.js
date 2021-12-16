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
    this.loading = true;
    const res = await apiGetMethod(constants.servicesList);
    this.loading = false;
    if (res.status === 200) {
      this.serviceList = res.body;
      console.log(res.body);
    } else {
      console.log("something went wrong", res.status);
    }
  };

  convertor = (id) => {
    const index = this.serviceList.findIndex(item => item.serviceId == id );
    console.log("index:",index);
    if(index < 0) return "the service is absent";
    return this.serviceList[index].nameOfService;
  }
}

export default ServiceList;