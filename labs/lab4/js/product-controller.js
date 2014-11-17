'use strict';

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