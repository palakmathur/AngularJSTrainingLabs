'use strict';

/**
 * Product Controller handles the interaction with the products.
 **/
app.controller('ProductController', 
	['$scope', 'TransactionService', 
		function($scope, transactionService) {
			
	$scope.updateQuantityAndCost = function() {
 		$scope.transaction.transactionQuantity = transactionService.getCurrentTransactionQuantity();
 		$scope.transaction.transactionCost = transactionService.getCurrentTransactionCost();
	};

	/**
 	 * Action that increments the quantity of large lemonades 
 	 *  sold in this transaction.
 	 **/
 	$scope.incrementLargeLemonade = function() {
 		transactionService.incrementLargeLemonade();
 		$scope.transaction.largeLemonadeQuantity = transactionService.getLargeLemonadeQuantity();
 		$scope.updateQuantityAndCost();
 	};

 	/**
 	 * Action that increments the quantity of medium lemonades 
 	 *   sold in this transaction.
 	 **/
 	$scope.incrementMediumLemonade = function() {
 		transactionService.incrementMediumLemonade();
 		//We can use getters if we would like to
 		$scope.transaction.mediumLemonadeQuantity = transactionService.getMediumLemonadeQuantity();
 		$scope.updateQuantityAndCost();
 	};

 	/**
 	 * Action that increments the quantity of healthy snacks 
 	 *   sold in this transaction.
 	 **/
 	$scope.incrementHealthySnack = function() {
 		//We can simply use the functions return value to set quantity
 		$scope.transaction.healthySnackQuantity = transactionService.incrementHealthSnack();
 		$scope.updateQuantityAndCost();
 	};

 	/** 
 	 * Action that increments the quantity of treats sold in this
 	 *   transaction.
 	 **/
 	 $scope.incrementTreat = function() {
 		$scope.transaction.treatQuantity = transactionService.incrementTreat();
 		$scope.updateQuantityAndCost();
 	};
}]);