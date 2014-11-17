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
 			console.log('transaction ok');
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

 	/**
 	 * On intialization checking to see if the supplies have been loaded
 	 *   and if the cost needs to be loaded.
 	 **/
 	/*$scope.init = function() {
 		//If supplies service isn't setup ... set it up
 		if (!SuppliesService.isInitialized()) {
 			var promiseKept = SuppliesService.initialize();

 			promiseKept.then(function() {

 				//If the transaction service isn't setup ... set it up
				if (!TransactionService.isTransactionInitialized()) {
		 			$scope.setCosts();
		 		}

 			}, function(error) {
 				console.log(error);
 			});

 		//If the transaction service isn't setup ... set it up
 		} else if (!TransactionService.isTransactionInitialized()) {
 			$scope.setCosts();
 		}
 	};*/

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

 	/**
 	 * Sets the costs for the supplies controller
 	 **/
 	$scope.setCosts = function() {
		var Buyer = $resource('/data/cost.json');

		var buyer = Buyer.get({
		}, function (response) {
			//Interact with properties on the buyer object instance
		  	//buyer.name = 'Kamren';
			TransactionService.intializeTransaction(
		  		response.healthySnack,
			  	response.treat,
			  	response.mediumLemonade,
			  	response.largeLemonade
			);

			$scope.cost.largeLemonade = TransactionService.getLargeLemonadeCost();
 			$scope.cost.mediumLemonade = TransactionService.getMediumLemonadeCost();
 			$scope.cost.healthySnack = TransactionService.getHealthySnackCost();
 			$scope.cost.treat = TransactionService.getTreatCost();

			console.log('costs set');
		}, function(error) {
			//Do things because of erring
			console.log('failed');
		});

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