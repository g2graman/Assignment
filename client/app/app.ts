import angular from 'angular';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngResource from 'angular-resource';
//import uiRouter from 'angular-ui-router';

import AppComponent from './app.component';
import AppSubComponents from './components/index';

import SharedModule from './shared/index';

import 'normalize.css';
import 'angular-material/angular-material.css';

const name = 'app';
angular.module(name, [
    ngMaterial,
    ngMessages,
    ngResource,

    AppSubComponents,
    SharedModule
])
  .component(AppComponent.name, AppComponent);

export default name;
