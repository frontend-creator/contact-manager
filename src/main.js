export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature('src/resources');

  aurelia.use.plugin('aurelia-animator-css');

  aurelia.start().then(a => a.setRoot());
}