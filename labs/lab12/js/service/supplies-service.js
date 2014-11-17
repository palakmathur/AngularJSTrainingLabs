'use strict';

/**
 * Supplies Service that aids in sale of lemonade.
 * @inject error is the error constant service 
 * Utilizing module revealing pattern
 **/
app.factory('SuppliesService', 
	['SuppliesApiService', 'error', 
		function(suppliesApiService, error) {

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

	var initialize = function() {
	 	return suppliesApiService.getSupplyQuantities()
	 		.then(function(resolved) {
		 		//$http service puts the resolved information on a 'data' object
		 		var data = resolved.data;
				if (resolved.data) {
					quantity.lemonade = data.lemonade;
					quantity.healthySnack = data.healthySnack;
					quantity.treat = data.treat;
					suppliesServiceInitialized = true;				
	 			}
		 	}, function() {
		 		console.log(error.SYSTEM_ISSUE_ERROR);
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