'use strict';

/**
 * Product Controller handles the interaction with the products.
 **/
app.controller('ProductController', 
	['$scope', 'TransactionService', 
		function($scope, TransactionService) {
			
	$scope.updateQuantityAndCost = function() {
 		$scope.transaction.transactionQuantity = TransactionService.getCurrentTransactionQuantity();
 		$scope.transaction.transactionCost = TransactionService.getCurrentTransactionCost();
	};

	/**
 	 * Action that increments the quantity of large lemonades 
 	 *  sold in this transaction.
 	 **/
 	$scope.incrementLargeLemonade = function() {
 		TransactionService.incrementLargeLemonade();
 		$scope.transaction.largeLemonadeQuantity = TransactionService.getLargeLemonadeQuantity();
 		$scope.updateQuantityAndCost();
 	};

 	/**
 	 * Action that increments the quantity of medium lemonades 
 	 *   sold in this transaction.
 	 **/
 	$scope.incrementMediumLemonade = function() {
 		TransactionService.incrementMediumLemonade();
 		//We can use getters if we would like to
 		$scope.transaction.mediumLemonadeQuantity = TransactionService.getMediumLemonadeQuantity();
 		$scope.updateQuantityAndCost();
 	};

 	/**
 	 * Action that increments the quantity of healthy snacks 
 	 *   sold in this transaction.
 	 **/
 	$scope.incrementHealthySnack = function() {
 		//We can simply use the functions return value to set quantity
 		$scope.transaction.healthySnackQuantity = TransactionService.incrementHealthSnack();
 		$scope.updateQuantityAndCost();
 	};

 	/** 
 	 * Action that increments the quantity of treats sold in this
 	 *   transaction.
 	 **/
 	 $scope.incrementTreat = function() {
 		$scope.transaction.treatQuantity = TransactionService.incrementTreat();
 		$scope.updateQuantityAndCost();
 	};
}]);