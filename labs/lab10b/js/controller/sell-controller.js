'use strict';

/**
 * Sell Controller for the sell route.
 **/
 app.controller('SellController', 
 	['$scope', 'TransactionService', 'SuppliesService',
 		function($scope, TransactionService, SuppliesService) {
 	
 	//Setting the page properties
 	$scope.page = {
 		title: 'Sell'
 	};

 	//Transaction model holding quantity and cost of current transaction
 	$scope.transaction = {
 		largeLemonadeQuantity: 0,
 		mediumLemonadeQuantity: 0,
 		healthySnackQuantity: 0,
 		treatQuantity: 0,
 		transactionQuantity: 0,
 		transactionCost: 0,
 		allowable: false
 	};

 	//Cost model holding product cost information 
 	$scope.cost = {
 		largeLemonade: 0,
 		mediumLemonade: 0,
 		healthySnack: 0,
 		treat: 0
 	};

 	/**
 	 * If we can compelete the order do it.
 	 **/
 	$scope.completeOrder = function() {
 		if ($scope.isTransactionAllowable()) {
 			alert('transaction ok');
 			$scope.updateSupplies();
 			$scope.clearTransaction();
 		} else {
 			alert('transaction won\'t work');
 			$scope.clearTransaction();
 		}
 	};


 	/**
 	 * Checks to make sure the transaction is initialized
 	 *	and that there are enough supplies for the transaction
 	 *	to take place.
 	 **/
 	$scope.isTransactionAllowable = function() {
 		var allowable = false;
 		if (TransactionService.isTransactionInitialized() &&
 			SuppliesService.isProductAvailable(
 				TransactionService.getLemonadeQuantity(),
 				TransactionService.getHealthySnackQuantity(),
 				TransactionService.getTreatQuantity())) {
 			allowable = true;
 		}
 		return allowable;
 	};

 	/**
 	 * Get the controller setup for business.
 	 **/
 	var init = function() {
 		
 		//If the supplies service isn't initialized ... set it up
 		if (!SuppliesService.isInitialized()) {
 			//Don't need to deal with the returned promise
 			SuppliesService.initialize();
 		} 
		
		//If the transaction service isn't setup ... set it up
 		if (!TransactionService.isTransactionInitialized()) {
 			var transactionPromiseKept = TransactionService.intializeTransaction();

 			transactionPromiseKept.finally(function() {
 				$scope.cost.largeLemonade = TransactionService.getLargeLemonadeCost();
 				$scope.cost.mediumLemonade = TransactionService.getMediumLemonadeCost();
 				$scope.cost.healthySnack = TransactionService.getHealthySnackCost();
 				$scope.cost.treat = TransactionService.getTreatCost();
 				console.log('transaction service setup');
 			});
 		}
 	};

 	$scope.updateSupplies = function() {
		SuppliesService.setSupplies(
			TransactionService.getLemonadeQuantity(),
			TransactionService.getHealthySnackQuantity(),
			TransactionService.getTreatQuantity());
 	};

 	/**
 	 * Action that clears out the entire transaction.
 	 **/
 	$scope.clearTransaction = function() {
 		TransactionService.clearCurrentTransaction();
 		$scope.transaction.largeLemonadeQuantity = TransactionService.getMediumLemonadeQuantity();
 		$scope.transaction.mediumLemonadeQuantity = TransactionService.getLargeLemonadeQuantity();
 		$scope.transaction.healthySnackQuantity = TransactionService.getHealthySnackQuantity();
 		$scope.transaction.treatQuantity = TransactionService.getTreatQuantity();
 		$scope.transaction.transactionQuantity = TransactionService.getCurrentTransactionQuantity();
 		$scope.transaction.transactionCost = TransactionService.getCurrentTransactionCost();
 	};

 	init();
 }]);