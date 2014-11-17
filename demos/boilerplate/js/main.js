'use strict';

var app = angular.module('demo', []);


 app.controller('HomeController', function($scope) {
	$scope.data = {message: ''};
	$scope.data.message = 'hello';	
 	
 });

 app.controller('RouteOneController',function($scope){

 });