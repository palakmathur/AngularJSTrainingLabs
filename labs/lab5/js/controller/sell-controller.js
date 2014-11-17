'use strict';

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