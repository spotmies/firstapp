import React from "react";
import ServiceList from "./servicesList"; 
import Reviews from "./reviews";

class RootStore {
    constructor() {
        this.services = new ServiceList(this);
        this.reviews = new Reviews(this);
    }
}

const StoreContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoreContext);