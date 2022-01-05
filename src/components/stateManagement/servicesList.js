import { makeAutoObservable } from "mobx";
import constants from "../../helpers/constants";
import {
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
      console.log(this.serviceList);
    } else {
      console.log("something went wrong", res.status);
    }
  };

  updateOrder = async (num, id, updateOrderr) => {
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
    if (resp != null) {
      body.orderState = resp.orderState;
      body.ordId = resp.ordId;
      // body.schedule = resp.schedule;
      updateOrderr(body);
    }

    console.log("Order Updated");
  };

  updateSchedule = async (num, id, orderUpdate) => {
    if (this.loading) {
      alert("Error, try again later..");
      return;
    }
    console.log("getting users from db", num);
    num = num.toString();
    this.loading = true;
    let body = {
      schedule: num,
    };
    let path = `/order/orders/${id}`;
    this.loading = true;
    const resp = await apiPostPut(body, path, "PUT");
    console.log(resp);
    if (resp != null) {
      body.schedule = resp.schedule;
      body.ordId = resp.ordId;
      body.orderState = resp.orderState;
      orderUpdate(body);
      alert("Schedule Updated");
    }
    this.loading = false;
    console.log("Schedule Updated");
  };

  submitReview = async (rating, comment, orderData,updateOrder) => {
    console.log(rating, comment, orderData);
    let mappedRating = (rating * 20).toString();
    let body = {
      rating: mappedRating,
      pId: orderData?.pId,
      uId: orderData?.uId,
      ordId: orderData?.ordId,
      pDetails: orderData?.pDetails?._id,
      uDetails: orderData?.uDetails?._id,
      orderDetails: orderData?._id,
      description: comment,
    };
    console.log(body);
    const resp = await apiPostPut(
      body,
      constants.api.new_partner_feedback,
      "POST"
    );
    if (resp != null) {
      let body = {
        orderState: 10,
        ordId: orderData?.ordId,
      }
      updateOrder(body)
      return alert("Review submitted");
    }
    return alert("Something went wrong");
  };

  convertor = (id) => {
    const index = this.serviceList.findIndex((item) => item.serviceId == id);
    console.log("index:", index);
    if (index < 0) return "The service is absent";
    return this.serviceList[index].nameOfService;
  };

  getServiceNameById = (id) => {
    const index = this.serviceList.findIndex((item) => item.serviceId == id);
    console.log("index:", index);
    if (index < 0) return "this service is unavailable";
    return this.serviceList[index].nameOfService;
  };
}

export default ServiceList;
