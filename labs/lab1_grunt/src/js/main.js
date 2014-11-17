'use strict';
//Creating an angular app
var app = angular.module('lemonadeApp', []);

/**
 * Sell Controller for the sell route.
 **/
 app.controller('SellController', function($scope) {
 	
 	$scope.transaction = {
 		largeLemonadeQuantity: 0,
 		mediumLemonadeQuantity: 0,
 		healthySnackQuantity: 0,
 		treatQuantity: 0,
 		transactionQuantity: 0,
 		transactionCost: 0
 	};

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
 });