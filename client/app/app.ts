import angular from 'angular';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
//import uiRouter from 'angular-ui-router';

import AppComponent from './app.component';
import AppSubComponents from './components/index';

import 'normalize.css';
import 'angular-material/angular-material.css';

const name = 'app';
angular.module(name, [
    ngMaterial,
    ngMessages,

    AppSubComponents
])
  .component(AppComponent.name, AppComponent);

export default name;
