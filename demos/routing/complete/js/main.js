'use strict';

var app = angular.module('demo', ['ngRoute']);

 app.controller('HomeController', function($scope) {
	
 });

 app.controller('RouteOneController',function($scope, $routeParams){
 	$scope.id = $routeParams.foo;

 	$scope.$on('$routeChangeSuccess', function (event, nextRoute, previousRoute) {
 		console.log('change to ' + nextRoute);
 		console.log('from ' + previousRoute);
 	});
 });

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/templates/home.html',
			controller: 'HomeController',
		})
		.when('/routeone/:foo',{
			templateUrl: '/templates/routeone.html',
			controller: 'RouteOneController'
		})
		.otherwise({
			redirectTo: '/',
		});

		$locationProvider.html5Mode(true)
});
