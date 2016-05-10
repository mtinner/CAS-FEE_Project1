import {getHelloWorld} from './intlService.js';

var project1 = angular.module('project1', [
    'ngRoute'
]);

project1.config(['$routeProvider',
    function ($routeProvider) {
        alert(`calling intl service: ${getHelloWorld()}`);
    }]);
