import {EventAggregator} from 'aurelia-event-aggregator';
import {MyDataService} from "../../services/my-data-service";

export class CustomerOrders {
  static inject = [EventAggregator, MyDataService];

  constructor(messageBus, dataService) {
    this.messageBus = messageBus;
    this.dataService = dataService;
    this.messageBus.subscribe('data-sort:sort', payload => {
      this.currentItem.orders = payload.sort;
    });    
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
  
  getState(state) {
    return this.stateList.find(f => f.value === state);
  }
  getTotal() {
    return this.currentItem.orders
      .map(m => m.unitPrice * m.quantity)
      .reduce((acc, cur) => acc + cur, 0);
  }

  camelCaseToProperCase(input) {
    return this.dataService.camelCaseToProperCase(input);
  }
  
}