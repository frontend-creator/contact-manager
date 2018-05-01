import {EventAggregator} from 'aurelia-event-aggregator';
import {MyDataService} from "../../services/my-data-service";

export class Customers {
  static inject = [EventAggregator, MyDataService];

  items = [];
  origItems = [];
  filteredItems = [];
  pagedItems = [];
  maleImgUrl = "assets/business-man.png";
  femaleImgUrl = "assets/business-woman.png";

  constructor(messageBus, dataService) {
    this.messageBus = messageBus;
    this.dataService = dataService;

    this.messageBus.subscribe('data-pager:page', payload => {
      let startIndex = payload.currentPage * payload.pageSize;
      let amount = payload.pageSize;
      this.items = payload.items.filter((item, index) => {
        return index >= startIndex && index < startIndex + amount;
      });
      // console.log('customers:pager-page - startIndex: ', startIndex,
      //   ' - amount: ', amount,
      //   ' - items: ', this.items,
      //   ' - origItems: ', this.origItems);
    });
    this.messageBus.subscribe('data-filter:filter', payload => {
      this.items = payload.filter;
    });
  }

  activate(params, routeConfig) {
    // console.log('customers:activate');
    this.dataService.loadPeople().then(data => {
      // console.log(JSON.stringify(data, null, 2));
      this.origItems = data;
      // console.log('customers:activate - origItems', this.origItems);
    });
  }

  remove(item) {
    
  }

  camelCaseToProperCase(input) {
    return this.dataService.camelCaseToProperCase(input);
  }

}