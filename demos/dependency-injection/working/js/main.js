'use strict';

var app = angular.module('demo', ['ngRoute']);

var $injector = angular.injector();
var myController = function MyController($scope, $routeParams){
	console.log('inside controller');
};

var result = $injector.annotate(myController);
console.log(result);

app.run(function($injector) {
    //$rootScope.annotations = $injector.annotate(myController);
    $injector.invoke(myController);
 
});




 
