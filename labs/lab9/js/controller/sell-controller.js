'use strict';

/**
 * Sell Controller for the sell route.
 **/
 app.controller('SellController', 
 	['$scope', '$resource', 'TransactionService', 'SuppliesService',  
 		function($scope, $resource, TransactionService, SuppliesService) {
 	
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

 	/**
 	 * If we can compelete the order do it.
 	 **/
 	$scope.completeOrder = function() {
 		if ($scope.isTransactionAllowable()) {
 			alert('transaction ok');
 			updateSupplies();
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
 	 * On intialization checking to see if the cost needs to be loaded
 	 **/
 	var init = function() {
 		if (!TransactionService.isTransactionInitialized()) {
 			setCosts();
 		}

 		//Reset the transaction each time we come to page
 		TransactionService.clearCurrentTransaction();
 	};

 	/**
 	 * Grab the costs from the backend and set them on the scope.
 	 **/
 	var setCosts = function() {
		var Buyer = $resource('/data/cost.json');

		var buyer = Buyer.get({
		}, function (response) {
			//Interact with properties on response data
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

 	/**
 	 * Updates the supply quantity on the Supplies Service.
 	 **/
 	var updateSupplies = function() {
		SuppliesService.setSupplies(
			TransactionService.getLemonadeQuantity(),
			TransactionService.getHealthySnackQuantity(),
			TransactionService.getTreatQuantity());
 	};

 	/**
 	 * Action that clears out the entire transaction.
 	 * Also called within the controller not just in the view.
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