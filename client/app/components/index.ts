import angular from 'angular';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import LoginComponent from './login/login.component';

const name = 'app.components';
angular.module(name, [
    ngMaterial,
    ngMessages
])
    .component(LoginComponent.name, LoginComponent);

export default name;
