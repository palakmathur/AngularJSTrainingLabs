'use strict';

/**
 * Supplies API Service is the back-end interaction for supplies.
 * Utilizing module revealing pattern
 **/
app.factory('SuppliesApiService', 
	['$http', 'SuppliesResponseTransformer', 'error',
		function($http, suppliesResponseTransformer) {

	/**
	 *  Get the initial supply quantities for the day.
	 **/
	var getSupplyQuantities = function() {
	 	return $http({
	 			method: 'GET', 
	 			url: '/data/initial-supplies',
	 			transformResponse: suppliesResponseTransformer
	 		});
	};

	/**
	 * Get the costs of the individual supplies.
	 **/
	var getSupplyCosts = function() {
		return $http({
	 			method: 'GET', 
	 			url: '/data/cost.json'
	 		});
	};

	//API
	return {
		getSupplyQuantities: getSupplyQuantities,
		getSupplyCosts: getSupplyCosts
	};

}]);