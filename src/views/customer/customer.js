import {MyDataService} from "../../services/my-data-service";

export class Customer {
  static inject = [MyDataService];

  currentItem;
  genderList = [];
  stateList = [];

  constructor(dataService) {
    this.dataService = dataService;
  }

  activate(params, routeConfig) {
    return Promise.all([
      this.dataService.loadPeople(),
      this.dataService.loadGenders(),
      this.dataService.loadStates()
    ]).then(values => {
      this.items = values[0];
      this.genderList = values[1];
      this.stateList = values[2];
      this.currentItem = this.items.find(f => f.id == params.id);
    }).catch(error => {
      console.error("Error encountered while trying to get data.", error);
    });
  }
  
  camelCaseToProperCase(input) {
    return this.dataService.camelCaseToProperCase(input);
  }
  
}