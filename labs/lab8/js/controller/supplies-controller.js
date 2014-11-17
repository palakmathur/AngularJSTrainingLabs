'use strict';

/**
 * Supplies Controller for the supplies route.
 **/
 app.controller('SuppliesController', ['$scope', '$http', function($scope, $http) {
 	
 	//Setting the page properties
 	$scope.page = {
 		title: 'Supplies'
 	};

 	$scope.initial = {
 		lemonadeQuantity: 30,
 		fruitQuantity: 20,
 		treatQuantity: 5,
 	};

 	$scope.maximum = {
 		lemonadeQuantity: 100,
 		fruitQuantity: 50,
 		treatQuantity: 50,
 	};

 	/**
 	 * Gets the supplies from the backend
 	 **/
 	$scope.resetSupplies = function() {

	 	$http({method: 'GET', url: '/data/supplies.json'})
	 		.success(function(data) {
	 			if (data && data.initial) {
	 				$scope.initial.lemonadeQuantity = data.initial.lemonadeQuantity;
	 				$scope.initial.fruitQuantity = data.initial.fruitQuantity;
	 				$scope.initial.treatQuantity = data.initial.treatQuantity;
	 				console.log('made it');				
	 			}
	 		})
	 		.error(function() {
	 			console.log('couldn\'t get the request');
	 		});
 	};

 }]);