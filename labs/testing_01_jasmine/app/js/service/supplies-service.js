'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('SuppliesService', ['$http', function($http) {

	var suppliesServiceInitialized = false;

	var quantity = {
		lemonade: 0,
		healthySnack: 0,
		treat: 0
	};

	var setSupplies = function(lemonadeQuantity, healthySnackQuantity, treatQuantity) {
		quantity.lemonade = quantity.lemonade - lemonadeQuantity;
		quantity.healthySnack = quantity.healthySnack - healthySnackQuantity;
		quantity.treat = quantity.treat - treatQuantity;
	};
/*
	var initialize = function(lemonadeQuantity, healthySnackQuantity, treatQuantity) {
		quantity.lemonade = lemonadeQuantity;
		quantity.healthySnack = healthySnackQuantity;
		quantity.treat = treatQuantity;
		suppliesServiceInitialized = true;
	};
*/
	var initialize = function() {

	 	return $http({method: 'GET', url: '/app/data/supplies.json'})
	 		.success(function(data) {
	 			if (data && data.initial) {
					quantity.lemonade = data.initial.lemonadeQuantity;
					quantity.healthySnack = data.initial.healthySnackQuantity;
					quantity.treat = data.initial.treatQuantity;
					suppliesServiceInitialized = true;				
	 			}
	 		})
	 		.error(function() {
	 			console.log('error initializing supplies-service');

	 		});

	};

	var isProductAvailable = function(lemonadeQuantity, healthySnackQuantity, treatQuantity) {
		var available = false;

		if ( (quantity.lemonade >= lemonadeQuantity) && 
			(quantity.healthySnack >= healthySnackQuantity) &&
			(quantity.treat >= treatQuantity) ) {
				available = true;
			}

		return available;
	};

	var isInitialized = function() {
		return suppliesServiceInitialized;
	};

	var getLemonadeQuantity = function() {
		return quantity.lemonade;
	};

	var getHealthySnackQuantity = function() {
		return quantity.healthySnack;
	};

	var getTreatQuantity = function() {
		return quantity.treat;
	};

	return {
		initialize: initialize,
		isInitialized: isInitialized,
		isProductAvailable: isProductAvailable,
		setSupplies: setSupplies,
		getLemonadeQuantity: getLemonadeQuantity,
		getHealthySnackQuantity: getHealthySnackQuantity,
		getTreatQuantity: getTreatQuantity
	};
}]);