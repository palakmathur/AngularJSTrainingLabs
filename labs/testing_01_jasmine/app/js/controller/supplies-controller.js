'use strict';

/**
 * Supplies Controller for the supplies route.
 **/
 app.controller('SuppliesController', ['$scope', 'SuppliesService',
  function($scope, SuppliesService) {
 	
 	//Setting the page properties
 	$scope.page = {
 		title: 'Supplies'
 	};

 	//Actual quantities available
 	$scope.actual = {
 		lemonadeQuantity: SuppliesService.getLemonadeQuantity(),
 		healthySnackQuantity: SuppliesService.getHealthySnackQuantity(),
 		treatQuantity: SuppliesService.getTreatQuantity(),
 	};

 	//Maximum level of quantities
 	$scope.maximum = {
 		lemonadeQuantity: 100,
 		healthySnackQuantity: 50,
 		treatQuantity: 50,
 	};

 	/**
 	 * Initializing our Supplies Controller.
 	 **/
 	$scope.init = function() {
 		//Setting up the supplies service if it isn't already
 		if (!SuppliesService.isInitialized()) {
 			var promiseKept = SuppliesService.initialize();

 			promiseKept.then(function(resolved) {
				$scope.actual.lemonadeQuantity = resolved.data.initial.lemonadeQuantity;
	 			$scope.actual.healthySnackQuantity = resolved.data.initial.healthySnackQuantity;
	 			$scope.actual.treatQuantity = resolved.data.initial.treatQuantity;	
 			}, function(error) {
 				console.log(error.data);
 			});
 		}
 	};

 	//Invoking our init method
 	$scope.init();

 }]);