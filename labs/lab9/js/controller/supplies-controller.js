'use strict';

/**
 * Supplies Controller for the supplies route.
 **/
 app.controller('SuppliesController', ['$scope', '$http', 'SuppliesService',
  function($scope, $http, SuppliesService) {
 	
 	//Setting the page properties
 	$scope.page = {
 		title: 'Supplies'
 	};

 	$scope.actual = {
 		lemonadeQuantity: SuppliesService.getLemonadeQuantity(),
 		healthySnackQuantity: SuppliesService.getHealthySnackQuantity(),
 		treatQuantity: SuppliesService.getTreatQuantity(),
 	};

 	$scope.maximum = {
 		lemonadeQuantity: 100,
 		healthySnackQuantity: 50,
 		treatQuantity: 50,
 	};

 	var init = function() {
 		if (!SuppliesService.isInitialized()) {
 			setSupplies();
 		}
 	};

 	/**
 	 * Gets the supplies from the backend
 	 **/
 	var setSupplies = function() {

	 	$http({method: 'GET', url: '/data/supplies.json'})
	 		.success(function(data) {
	 			if (data && data.initial) {

					SuppliesService.initialize(
						data.initial.lemonadeQuantity,
						data.initial.healthySnackQuantity,
						data.initial.treatQuantity
					);

	 				$scope.actual.lemonadeQuantity = SuppliesService.getLemonadeQuantity();
	 				$scope.actual.healthySnackQuantity = SuppliesService.getHealthySnackQuantity();
	 				$scope.actual.treatQuantity = SuppliesService.getTreatQuantity();
	 				console.log('supplies set');				
	 			}
	 		})
	 		.error(function() {
	 			console.log('couldn\'t get the request');
	 		});
 	};

 	//Get the controller initialization running
 	init();

 }]);