export const template = require('./app.jade')();
class App {
  constructor () {
    return {
      name: 'app',
      template: template,
      restrict: 'E',
      replace: true
    };
  }
}
export default new App();

