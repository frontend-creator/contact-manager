import {EventAggregator} from 'aurelia-event-aggregator';
import {MyDataService} from "../../services/my-data-service";

export class Orders {
  static inject = [EventAggregator, MyDataService];

  items = [];

  constructor(messageBus, dataService) {
    this.messageBus = messageBus;
    this.dataService = dataService;
    this.messageBus.subscribe('data-sort:sort-only', payload => {
      if (payload.index > -1) {
        this.items[payload.index].orders = payload.sort;
      }
      // this.currentItem.orders = payload.sort;
    });    

    // this.messageBus.subscribe('data-pager:page', payload => {
    //   let startIndex = payload.currentPage * payload.pageSize;
    //   let amount = payload.pageSize;
    //   this.items = payload.items.filter((item, index) => {
    //     return index >= startIndex && index < startIndex + amount;
    //   });
    //   // console.log('customers:pager-page - startIndex: ', startIndex,
    //   //   ' - amount: ', amount,
    //   //   ' - items: ', this.items,
    //   //   ' - origItems: ', this.origItems);
    // });
    this.messageBus.subscribe('data-filter:filter', payload => {
      this.items = payload.filter;
    });
  }

  activate(params, routeConfig) {
    return Promise.all([
      this.dataService.loadPeople(),
    ]).then(values => {
      this.items = values[0];
    }).catch(error => {
      console.error("Error encountered while trying to get data.", error);
    });
  }
  
  getTotal(currentItem) {
    if (!currentItem) return;
    return currentItem.orders
      .map(m => m.unitPrice * m.quantity)
      .reduce((acc, cur) => acc + cur, 0);
  }

  camelCaseToProperCase(input) {
    return this.dataService.camelCaseToProperCase(input);
  }
  
}