'use strict';

var app = angular.module('demo', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url:'/',
			templateUrl: 'templates/home.html',
			controller: 'HomeController'
		})
		.state('about', {
			url:'/about',
			templateUrl: 'templates/about.html',
			controller: 'AboutController'
		})
		.state('about.detail', {
			url: '/detail/:name',
			templateUrl: 'templates/about-detail.html',
			controller: function($scope, $stateParams, $state) {
				$scope.info = {
					bio: 'This is the detail about ' + $stateParams.name,
				};

				$scope.goToAbout = function(){
					$state.go('^');
				}
			}
		})
}]);


 app.controller('HomeController', ['$scope','$rootScope', function($scope, $rootScope) {
 	
 	//Setting the page properties
 	$rootScope.page = {
 		heading: 'Home'
 	};

 }]);


 app.controller('AboutController', ['$scope','$rootScope', function($scope, $rootScope) {
 	
 	//Setting the page properties
 	$rootScope.page = {
 		heading: 'About'
 	};



 }]);

