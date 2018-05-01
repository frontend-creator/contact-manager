import 'jQuery';
import 'bootstrap';

export class App {

  configureRouter(config, router) {
    config.title = '';
    config.map([
      {route: ["", "customers"], moduleId: "src/views/customers/customers", href: "", title: "Customers", nav: true},
      {route: "customers/:id", moduleId: "src/views/customer/customer", href: "", title: "Customer", nav: false},
      {route: "customers/:id/orders", moduleId: "src/views/customer-orders/customer-orders", href: "", title: "Customer Orders", nav: false},
      {route: "orders", moduleId: "src/views/orders/orders", href: "#/orders", title: "Orders", nav: true},
      {route: "about", moduleId: "src/views/about/about", href: "#/about", title: "About", nav: true}
    ]);

    this.router = router;
  }
  
}