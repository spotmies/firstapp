import React from "react";
import ServiceList from "./servicesList";
import Reviews from "./reviews";
import CommonStore from "./common_store";

class RootStore {
  constructor() {
    this.services = new ServiceList(this);
    this.reviews = new Reviews(this);
    this.commonStore = new CommonStore(this);
  }
}

const StoreContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoreContext);
