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
    if (res !== null) {
      this.serviceList = res;
      console.log(res);
      console.log(this.serviceList)
    } else {
      console.log("something went wrong", res.status);
    }
  };

  updateOrder = async (num, id) => {
    if (this.loading) {
      alert("Error, try again later..");
      return;
    }
    console.log("getting users from db");
    this.loading = true;
    let body = {
      orderState: num,
    };
    let path = `/order/orders/${id}`;
    this.loading = true;
    const resp = await apiPostPut(body, path, "PUT");
    this.loading = false;
    console.log("Order Updated");
  }

  updateSchedule = async (num, id) => {
    if (this.loading) {
      alert("Error, try again later..");
      return;
    }
    console.log("getting users from db",num);
    num = num.toString();
    this.loading = true;
    let body = {
      schedule: num,
    };
    let path = `/order/orders/${id}`;
    this.loading = true;
    const resp = await apiPostPut(body, path, "PUT");
    this.loading = false;
    console.log("Schedule Updated");
  }

  convertor = (id) => {
    const index = this.serviceList.findIndex(item => item.serviceId == id );
    console.log("index:",index);
    if(index < 0) return "The service is absent";
    return this.serviceList[index].nameOfService;
  }

  getServiceNameById = (id) => {
    const index = this.serviceList.findIndex(item => item.serviceId == id);
    console.log("index:", index);
    if(index < 0) return "this service is unavailable";
    return this.serviceList[index].nameOfService;
  }
}

export default ServiceList;
