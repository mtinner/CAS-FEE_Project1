'use strict';

/* App Module */

var project1 = angular.module('project1', [
    'ngRoute'
]);

project1.config(['$routeProvider',
    function ($routeProvider) {
        const getText = () => {
            return 'This is ES6 code! ';
        };
        alert(getText());
    }]);
