'use strict';

//Creating an angular app
var app = angular.module('lemonadeApp', ['ui.router']);

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
		});
}]);

/**
 * Home Controller for the home route.
 **/
 app.controller('HomeController', ['$scope', function($scope) {
 	
 	//Setting the page properties
 	$scope.page = {
 		title: 'This one\'s on me'
 	};

 }]);

/**
 * Sell Controller for the sell route.
 **/
 app.controller('SellController', ['$scope', function($scope) {
 	
 	//Setting the page properties
 	$scope.page = {
 		title: 'Sell'
 	};

 	$scope.transaction = {
 		largeLemonadeQuantity: 0,
 		mediumLemonadeQuantity: 0,
 		healthySnackQuantity: 0,
 		treatQuantity: 0,
 		transactionQuantity: 0,
 		transactionCost: 0
 	};

 	/**
 	 * Action that clears out the entire transaction.
 	 **/
 	$scope.clearTransaction = function() {
 		$scope.transaction.largeLemonadeQuantity = 0;
 		$scope.transaction.mediumLemonadeQuantity = 0;
 		$scope.transaction.healthySnackQuantity = 0;
 		$scope.transaction.treatQuantity = 0;
 		$scope.transaction.transactionQuantity = 0;
 		$scope.transaction.transactionCost = 0;
 	};
 }]);

/**
 * Product Controller handles the interaction with the products.
 **/
app.controller('ProductController', ['$scope', function($scope) {
	/**
 	 * Action that increments the quantity of large lemonades 
 	 *  sold in this transaction.
 	 **/
 	$scope.incrementLargeLemonade = function() {
 		$scope.transaction.largeLemonadeQuantity++;
 		$scope.transaction.transactionQuantity ++;
 		$scope.transaction.transactionCost += 2;
 	};

 	/**
 	 * Action that increments the quantity of medium lemonades 
 	 *   sold in this transaction.
 	 **/
 	$scope.incrementMediumLemonade = function() {
 		$scope.transaction.mediumLemonadeQuantity++;
 		$scope.transaction.transactionQuantity++;
 		$scope.transaction.transactionCost++;
 	};

 	/**
 	 * Action that increments the quantity of healthy snacks 
 	 *   sold in this transaction.
 	 **/
 	$scope.incrementHealthySnack = function() {
 		$scope.transaction.healthySnackQuantity++;
 		$scope.transaction.transactionQuantity ++;
 		$scope.transaction.transactionCost++;
 	};

 	/** 
 	 * Action that increments the quantity of treats sold in this
 	 *   transaction.
 	 **/
 	 $scope.incrementTreat = function() {
 		$scope.transaction.treatQuantity++;
 		$scope.transaction.transactionQuantity ++;
 		$scope.transaction.transactionCost++;
 	};
}]);