import { makeObservable, observable, action } from "mobx";

class RouteStore {
  currentRoute: string = "";

  constructor() {
    makeObservable(this, {
      currentRoute: observable,
      navigateTo: action,
    });
  }

  navigateTo = (newRoute: string) => {
    this.currentRoute = newRoute;
  };
}

const routeStore = new RouteStore();
export default routeStore;
