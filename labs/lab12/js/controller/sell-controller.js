'use strict';

/**
 * Sell Controller for the sell route.
 * @inject error is the error constant service
 **/
 app.controller('SellController', 
 	['$scope', 'TransactionService', 'SuppliesService', 'error',
 		function($scope, transactionService, suppliesService, error) {
 	
 	//Error constants for the page
 	var pageError = {
 		TOO_MANY_PRODUCTS: 'Too many products the transaction won\'t work'
 	};

 	//Not robust just for the example :)
	$scope.class = '';

 	//Setting the page properties
 	$scope.page = {
 		title: 'Sell'
 	};

 	//Transaction quantity variables
 	$scope.transaction = {
 		largeLemonadeQuantity: 0,
 		mediumLemonadeQuantity: 0,
 		healthySnackQuantity: 0,
 		treatQuantity: 0,
 		transactionQuantity: 0,
 		transactionCost: 0,
 		allowable: false
 	};

 	//Product costs
 	$scope.cost = {
 		largeLemonade: 0,
 		mediumLemonade: 0,
 		healthySnack: 0,
 		treat: 0
 	};

 	//Error message for the page
 	$scope.messages = {
 		error: ''
 	};

 	/**
 	 * Complete Order action received from complete order
 	 *	button being clicked on the view.
 	 **/
 	$scope.completeOrder = function() {
 		var promiseKept = {};

 		if ($scope.isTransactionAllowable()) {
 			//Storing our 'future' interaction
 			promiseKept = transactionService.completeTransaction();
 			
 			//Update supplies on promise resolution
 			promiseKept.then(function() {
 				$scope.updateSupplies();
 				$scope.messages.error = error.NO_ERROR;
 			//Backend fail
 			}, function() {
 				$scope.messages.error = error.SYSTEM_ISSUE_ERROR;
 			});

 			//Update UI on fail or success
 			// Line blow is ie8 approved
 			//promiseKept['finally'](function() {
 			promiseKept.finally(function() {		
 				$scope.clearTransaction();
 			});

 		} else {

 			//Update UI if transaction isn't allowable
 			$scope.clearTransaction();
 			$scope.messages.error = pageError.TOO_MANY_PRODUCTS;
 		}
 	};

 	/**
 	 *	Verifies if the transaction can take place when
 	 *		the "Complete Order" button is pressed.
 	 **/
 	$scope.isTransactionAllowable = function() {
 		var allowable = false;

 		if (transactionService.isTransactionInitialized() &&
 			suppliesService.isProductAvailable(
 				transactionService.getLemonadeQuantity(),
 				transactionService.getHealthySnackQuantity(),
 				transactionService.getTreatQuantity())) {
 			//The transaction can go through
 			allowable = true;
 		}

 		return allowable;
 	};

 	/**
 	 * Needed initialization of the controller.
 	 * 	- Make sure the Supplies Service is setup
 	 *	- Make sure the Transaction Service is setup
 	 **/
 	$scope.init = function() {
 		
 		//If the supplies service isn't setup ... set it up
 		if (!suppliesService.isInitialized()) {
 			var suppliesPromiseKept = suppliesService.initialize();

 			suppliesPromiseKept.then(function() {
 				console.log('supplies service setup');
 			});

 			// Line blow is ie8 approved
 			//promiseKept['catch'](function() {
 			suppliesPromiseKept.catch(function() {
 				console.log(error);
 				$scope.messages.error = error.SYSTEM_ISSUE_ERROR;
 			});

 		} 

 		//If the transaction service isn't setup ... set it up
 		if (!transactionService.isTransactionInitialized()) {
 			var transactionPromiseKept = transactionService.intializeTransaction();

 			transactionPromiseKept.then(function() {
 				$scope.cost.largeLemonade = transactionService.getLargeLemonadeCost();
 				$scope.cost.mediumLemonade = transactionService.getMediumLemonadeCost();
 				$scope.cost.healthySnack = transactionService.getHealthySnackCost();
 				$scope.cost.treat = transactionService.getTreatCost();
 			}, function(error) {
				console.log(error.SYSTEM_ISSUE_ERROR);
 			});
 		}
 	};

 	/**
 	 * Sets the available supplies left for purchase.
 	 **/
 	$scope.updateSupplies = function() {
 		//Sets the avaiable supplies 
		suppliesService.setSupplies(
			transactionService.getLemonadeQuantity(),
			transactionService.getHealthySnackQuantity(),
			transactionService.getTreatQuantity()
		);
 	};

 	/**
 	 * Action that clears out the entire transaction.
 	 **/
 	$scope.clearTransaction = function() {
 		transactionService.clearCurrentTransaction();
 		$scope.transaction.largeLemonadeQuantity = transactionService.getMediumLemonadeQuantity();
 		$scope.transaction.mediumLemonadeQuantity = transactionService.getLargeLemonadeQuantity();
 		$scope.transaction.healthySnackQuantity = transactionService.getHealthySnackQuantity();
 		$scope.transaction.treatQuantity = transactionService.getTreatQuantity();
 		$scope.transaction.transactionQuantity = transactionService.getCurrentTransactionQuantity();
 		$scope.transaction.transactionCost = transactionService.getCurrentTransactionCost();
 		
 		//Not robust just for the example
 		$scope.class = 'class-animation';
 	};

 	$scope.init();
 }]);