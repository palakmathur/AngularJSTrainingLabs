'use strict';

/**
 * Sell Controller for the sell route.
 **/
 app.controller('SellController', ['$scope', 'TransactionService', 'SuppliesService', '$resource', 
 	function($scope, TransactionService, SuppliesService, $resource) {
 	
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
 		transactionCost: 0,
 		allowable: false
 	};

 	$scope.cost = {
 		largeLemonade: 0,
 		mediumLemonade: 0,
 		healthySnack: 0,
 		treat: 0
 	};

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

 	$scope.init = function() {
 		
 		if (!SuppliesService.isInitialized()) {
 			var promiseKept = SuppliesService.initialize();

 			promiseKept.then(function() {

 				console.log('supplies service setup');

 			}, function(error) {
 				console.log(error);
 			});

 		//If the transaction service isn't setup ... set it up
 		} 

 		if (!TransactionService.isTransactionInitialized()) {
 			var transactionPromiseKept = TransactionService.intializeTransaction();

 			transactionPromiseKept.$promise.then(function(data) {
 				$scope.cost.largeLemonade = data.largeLemonade;
 				$scope.cost.mediumLemonade = data.mediumLemonade;
 				$scope.cost.healthySnack = data.healthySnack;
 				$scope.cost.treat = data.treat;
 				console.log('transaction service setup');
 			}, function(error) {
				console.log(error.data);
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

 	$scope.init();
 }]);