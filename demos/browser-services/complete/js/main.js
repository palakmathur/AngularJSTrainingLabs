'use strict';

var app = angular.module('demo', ['ngRoute']);

 app.controller('HomeController', function($scope, $location,$window,$document) {
	
	$scope.changeRoute = function(){
		$location.path('/routeone').replace();
	};

	$scope.reload = function(){
		$window.location.href = '';
	};

	$document[0].title = "No place like home";

 });

 app.controller('RouteOneController',function($scope, $routeParams){
 	$scope.id = $routeParams.id;

 	$scope.$on('$routeChangeSuccess', function (event, nextRoute, previousRoute) {
 		console.log('change to ' + nextRoute);
 		console.log('from ' + previousRoute);
 	});
 });

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/templates/home.html',
			controller: 'HomeController',
		})
		.when('/routeone/',{
			templateUrl: '/templates/routeone.html',
			controller: 'RouteOneController'
		})
		.otherwise({
			redirectTo: '/',
		});
});
