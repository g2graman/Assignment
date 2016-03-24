'use strict';

import * as io from 'socket.io-client';

import angular from 'angular';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngResource from 'angular-resource';
import 'angular-socket-io';
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
    'btford.socket-io',

    AppSubComponents,
    SharedModule
])
    .component(AppComponent.name, AppComponent)
    .factory('socket', ['socketFactory', function (socketFactory) {
        let ioSocket = io.connect('http://localhost:3000');

        return socketFactory({ioSocket});
    }]);

angular.element(document).ready(function() {
    angular.bootstrap(document, [name]);
});

export default name;
