import { makeAutoObservable } from "mobx";
class CommonStore {
  isUserLogin = false;
  userDetails = {};
  constructor() {
    makeAutoObservable(this);
  }

  setUserLogin = (value) => {
    this.isUserLogin = value ?? true;
  };
  setUserDetails = (value) => {
   
    this.userDetails = value ?? {};
  };
}

export default CommonStore;
