import angular from 'angular';
import ngResource from 'angular-resource';
import Resource from './resource';

const moduleName = 'SharedResources';
angular.module(moduleName, [
    ngResource
])
    .service(Resource('user'));

export default moduleName;
