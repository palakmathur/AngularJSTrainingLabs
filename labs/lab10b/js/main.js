'use strict';

//Creating an angular app
var app = angular.module('lemonadeApp', 
	['ui.router', 'app.filters', 'ngMessages', 'ngResource']);

/**
 * Configure our application to give us basic routing
 **/
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url:'/',
			templateUrl: 'templates/home.html',
			controller: 'HomeController'
		})
		.state('sell', {
			url:'/sell',
			templateUrl: 'templates/sell.html',
			controller: 'SellController'
		})
		.state('sell.lemonade', {
			url: '/lemonade',
			templateUrl: 'templates/sell-lemonade.html',
			controller: function($scope) {
				$scope.info = {
					description: 'I love drinking this stuff',
					health: 'Little lemon ... lots of sugar!'
				};
			}
		})
		.state('sell.healthy', {
			url: '/healthy',
			templateUrl: 'templates/sell-healthy.html',
			controller: function($scope) {
				$scope.info = {
					description: 'An apple a day keeps the doctor away'
				};
			}
		})
		.state('sell.treat', {
			url: '/treat',
			templateUrl: 'templates/sell-treat.html',
			controller: function($scope) {
				$scope.info = {
					lifeSpan: -42
				};
			}
		})
		.state('report', {
			url: '/report',
			templateUrl: 'templates/report.html',
			controller: 'ReportController'
		})
		.state('give', {
			url: '/give',
			templateUrl: 'templates/give.html',
			controller: 'GiveController'
		})
		.state('supplies', {
			url: '/supplies',
			templateUrl: 'templates/supplies.html',
			resolve: {
				//Needed service for dealing with Philanthropist API
				suppliesService: 'SuppliesService',

				//Returned supplies if needed
				supplies: function(suppliesService) {
					
					//Checking to see if the supplies are initialized
					if (!suppliesService.isInitialized()) {
						return suppliesService.initialize();
					}

				}
			},			
			controller: 'SuppliesController'
		});
}]);


