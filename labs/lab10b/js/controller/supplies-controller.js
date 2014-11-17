'use strict';

/**
 * Supplies Controller for the supplies route.
 **/
 app.controller('SuppliesController', 
 	['$scope', 'SuppliesService', 
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

 }]);