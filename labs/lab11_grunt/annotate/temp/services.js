'use strict';

/**
 * Application Constants.
 **/
 app.constant('error', {
 	'SYSTEM_ISSUE_ERROR': 'Sorry, we are having server issues',
 	'NO_ERRORS': '',
 	'DEPRECATED': 'This has been deprecated'
 });


'use strict';

/**
 * Service to handle interaction with Philanthropist API.
 * Utilizing ngResource for service interaction.
 **/
app.factory('PhilanthropistApiService', 
	['$resource', 'DonorsResponseTansformer', function($resource, DonorsResponseTansformer) {

	//A $resource object that serves as an interface to our back-end
	//	Includes transform for donor information
	var Philanthropist = $resource('/data/philanthropists/:donor', 
			//URL Parameters to add on every request
			{}, 
			//Actions object defining what we want to happen
			//	for specific $resource methods
			{
				'query': {
					method:'GET', 
					isArray:true,
					transformResponse: DonorsResponseTansformer
				}
			}
		);

	/**
	 * Gets all of the donors from the backend.
	 *	Abstraction over $resource.query().
	 * @return a promise object to be evaluated when complete
	 **/
	var getDonorsInformation = function() {

		return Philanthropist.query().$promise;
		//return Philanthropist.get({id:'hat', code:42}).$promise;
	};

	/**
	 * Adds a donor to the back-end. Renaming of save.
	 *	Abstraction over $resource.save()
	 * @return a promise object to be evaluated when complete
	 **/
	var addDonor = function(data) {

		//Will place the data in the body of the Ajax call
		return Philanthropist.save(data).$promise;

	};

	/**
	 * Removes a donor from the backend.
	 *	Abstraction over $resource.remove().
	 * @return a promise object to be evaluated when complete	 
	 **/
	var removeDonor = function(donorId) {

		//Setting donor allows us to have it as part of the URL
		//	because it is a named
		//	(i.e. /data/philanthropists/7)
		//	instead of a URL parameter
		//	(i.e. /data/philanthropists?donor=7)
		return Philanthropist.remove({donor: donorId}).$promise;

	};

	//API
	return {
		getDonorsInformation: getDonorsInformation,
		addDonor: addDonor,
		removeDonor: removeDonor
	};

	//As a note we could have just returned the $resource,
	//	This would change our API interaction as we would need
	//	to grab the $promise off the $resource object on our services
	/*
	return $resource('/data/philanthropists/:donor', 
		{}, 
		{
			'getDonorsInformation': {
				method:'GET', 
				isArray:true,
				transformResponse: DonorsResponseTansformer
			},
			'addDonor': {
				method: 'POST'
			},
			'removeDonor': {
				method: 'DELETE'
			}
		});
	*/


}]);
'use strict';

/**
 * Supplies API Service is the back-end interaction for supplies.
 * Utilizing module revealing pattern
 **/
app.factory('SuppliesApiService', 
	['$http', 'SuppliesResponseTransformer', function($http, SuppliesResponseTransformer) {

	/**
	 *  Get the initial supply quantities for the day.
	 **/
	var getSupplyQuantities = function() {
	 	return $http({
	 			method: 'GET', 
	 			url: '/data/initial-supplies',
	 			transformResponse: SuppliesResponseTransformer
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
'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('TransactionApiService', 
	['Restangular', 'error', function(Restangular, error) {

	var transactions = Restangular.all('transactions');

	/**
	 * Getting all the complete list of transactions from the backend.
	 * @return a promise to utilize 'future' returned information
	 **/
	var getTransactions = function() {
		return transactions.getList();
	};

	/**
	 * Adding a transactions to the backend.
	 * @param transaction object that has needs to be configured
	 *		configured in the restangular provider
	 * @return a promise to utilize 'future' returned information
	 **/
	var addTransaction = function(transaction) {
		return transactions.post(transaction);
	};

	/**
	 * @deprecated 
	 * Removes the transaction from the backend.
	 * @param id number of transaction to remove
	 **/
	var removeTransaction = function(id) {
		//Functionality within Restangular remove() called from controller
		alert(error.DEPRECATED + ' param:' + id);
	};

	//API
	return {
		getTransactions: getTransactions,
		addTransaction: addTransaction,
		removeTransaction: removeTransaction
	};

}]);
'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('CurrentLocationService', ['$q', function($q) {

	var deferred = $q.defer();

	//Possible error codes thrown via the geolocation API
	var errorTypeCodes = [
		'Unknown error',
		'Permission denied by user',
		'Position is not available',
		'Request timed out'
	];

	/**
	 * Gets the current location of the user.
	 * @return promiseKept is a promise that is fullfilled when the 
	 *		geolocation has been found
	 **/
	var getLocation = function() {

		navigator.geolocation.getCurrentPosition(resolveLocation, resolveError);

		return deferred.promise;

	};

	/**
	 * Place the location information on the screen.
	 * @param position an object containing coordinates of the location
	 **/
	var resolveLocation = function(position) {
        //Angular's handling of promises
  		deferred.resolve(position.coords);
	};

	/**
	 * Handles error information if the browser had a problem getting the current position.
	 * @param error an object containing a code and additional message information property 
	 **/
	var resolveError = function(error) {
		var errorMessage = errorTypeCodes[error.code];

		//Error codes 0 and 2 have extra message information wrapped into the error message
		if (error.code === 0 || error.code === 2) {
			errorMessage += ' ' + error.message;
		}

		//Angular's handling of promises: will return string error message
		deferred.reject('Geolocation error: ' + errorMessage);
	};

	return {
 		getLocation: getLocation
 	};

}]);
'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.provider('DistanceService', function() {
	//Position of where we want to get a distance from
	//	(i.e. Alex's Lemonade Stand Head Quarters)
	var latitude = 0;
	var longitude = 0;

	//A provider needs to return an object literal
	//	that exposes a $get method
	//Just like our factory function in the factory service
	return { 
		setLatitude: function(pLatitude) {
			latitude = pLatitude;
		},
		setLongitude: function(pLongitude) {
			longitude = pLongitude;
		},
		//We need to inject $q the $get function if we
		//	are planning on using it in our provider
		$get: ['$q', function($q) {

			var deferred = $q.defer();

			//Possible error codes thrown via the geolocation API
			var errorTypeCodes = [
				'Unknown error',
				'Permission denied by user',
				'Position is not available',
				'Request timed out'
			];

			/**
	 		 * Gets the distance from your current location to Alex's 
	 		 * LemonadeStand headquarters.
			 * @return promiseKept is a promise that is fullfilled when the 
			 *		geolocation has been found
			 **/
			var getDistance = function() {

				navigator.geolocation.getCurrentPosition(resolveDistance, resolveError);

				return deferred.promise;

			};

			/**
			 * Resolve distance between device location and lemonade stand headquarters.
			 * @param position an object containing coordinates of the location
			 **/
			var resolveDistance = function(position) {
				var latitude = position.coords.latitude;
        		var longitude = position.coords.longitude;
        		var distance = calculateDistance(latitude, longitude);
		        
		        //Angular's handling of promises
		  		deferred.resolve(distance);
			};

			/**
			 * Handles error information if the browser had a problem getting the current position.
			 * @param error an object containing a code and additional message information property 
			 **/
			var resolveError = function(error) {
				var errorMessage = errorTypeCodes[error.code];

				//Error codes 0 and 2 have extra message information wrapped into the error message
				if (error.code === 0 || error.code === 2) {
					errorMessage += ' ' + error.message;
				}

				//Angular's handling of promises: will return string error message
				deferred.reject('Geolocation error: ' + errorMessage);
			};

			/**
			 *  Takes 2 coordinates and returns the distance in kilometers between them.
			 *	@param startCoordinates is an object containing lat/lon
			 **/
			var calculateDistance = function(startLatitudeDegrees, startLongitudeDegrees) {
				//Starting latitude (i.e. device location)
				var startLatitudeRadians = degreesToRadians(startLatitudeDegrees);
				//Starting longitude (i.e. device location)
				var startLongitudeRadians = degreesToRadians(startLongitudeDegrees);
				//Finishing latitude (i.e. Alex's lemonade headquarters)
				var finishLatitudeRadians = degreesToRadians(latitude);
				//Finishing longitude (i.e. Alex's lemonade headquarters)
				var finishLongitudeRadians = degreesToRadians(longitude);

				//unit is kilometers
				var EARTH_RADIUS = 6371; 

				//Distance in kilometers from where your device is to Alex's headquarters
				//Spherical Law of Cosines equation
				var distanceInKM = Math.acos(Math.sin(startLatitudeRadians) * 
					Math.sin(finishLatitudeRadians) + Math.cos(startLatitudeRadians) * 
					Math.cos(finishLatitudeRadians) * 
					Math.cos(startLongitudeRadians - finishLongitudeRadians)) * EARTH_RADIUS;

				//We only want the integers off of the distance
				return parseInt(distanceInKM);
			};

			/** 
			 * Converts degrees to radians. 
			 **/
			var degreesToRadians = function(degrees) {
				var radians = (degrees * Math.PI) / 180;
				return radians;
			};

			return {
		 		getDistance: getDistance
		 	};
	}]};
});
'use strict';

/**
 * Supplies Service that aids in sale of lemonade.
 * @inject error is the error constant service 
 * Utilizing module revealing pattern
 **/
app.factory('SuppliesService', 
	['SuppliesApiService', 'error', function(SuppliesApiService, error) {

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
	 	return SuppliesApiService.getSupplyQuantities()
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
'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('TransactionService', 
	['TransactionApiService', 'SuppliesApiService', 'error', function(TransactionApiService, SuppliesApiService, error) {
		
	//Boolean to know if the transaction is ready to go
	var transactionInitialized = false;

 	//Healty Snack Cost 
	var healthySnackCost = 0;
	//Treats Cost
   	var treatCost = 0;
   	//Large Lemonade Cost
    var largeLemonadeCost = 0;
    //medium lemonade object
    var mediumLemonadeCost = 0;

    //Transaction Count holder
    var transactionCount = {
    	healthySnack: 0,
    	treats: 0,
    	mediumLemonade: 0,
    	largeLemonade: 0,
    };

    //Running total product count of the transaction
    var transactionCountTotal = 0;

    //Cost calculator for the transaction
    var transactionCost = 0;

 	/**
     * Adds up our current transaction cost.
     **/
    var addToTransacionCost = function(cost) {
    	transactionCost = transactionCost + cost;
    };

    /**
     * Adds up our current transaction cost.
     **/
    var addToTransacionQuantity = function() {
    	transactionCountTotal = transactionCountTotal + 1;
    };

 	/**
	 * Increments the private transaction.largeLemonade property.
	 * @return the large lemonade transaction count
	 **/
	var incrementLargeLemonade = function() {
		transactionCount.largeLemonade++;
		addToTransacionCost(largeLemonadeCost);
		addToTransacionQuantity();
		return transactionCount.largeLemonade;
	};

	/**
	 * Increments the private transaction.mediumLemonade property.
	 * @return the medium lemonade transaction count
	 **/
	var incrementMediumLemonade = function() {
		transactionCount.mediumLemonade++;
		addToTransacionCost(mediumLemonadeCost);
		addToTransacionQuantity();
		return transactionCount.mediumLemonade;
	};
	
	/**
	 * Increments the private transaction.incrementHealthSnack property.
	 * @return the healthy snack transaction count
	 **/
	var incrementHealthSnack = function() {
		transactionCount.healthySnack++;
		addToTransacionCost(healthySnackCost);
		addToTransacionQuantity();
		return transactionCount.healthySnack;
	};

	/**
	 * Increments the private transaction.incrementTreat property.
	 * @return the treats transaction count
	 **/
	var incrementTreat = function() {
		transactionCount.treats++;
		addToTransacionCost(treatCost);
		addToTransacionQuantity();
		return transactionCount.treats;
	};	   

	/**
	 * Clear Current Transaction.
	 **/
	var clearCurrentTransaction = function() {
		var x;
		for(x in transactionCount) {
			transactionCount[x] = 0;
		}
		//Resetting transactionCost
		transactionCost = 0;

		//Resetting transaction count
		transactionCountTotal = 0;
	};


	/**
	 * Get the current transaction cost.
	 * @return the transaction cost
	 **/
	var getCurrentTransactionCost = function() {
		return transactionCost;
	};

	/**
	 * Gets the current transaction quantity.
	 * @return the transaction quantity
	 **/
	var getCurrentTransactionQuantity = function() {
		return transactionCountTotal;
	};

	/**
	 * Get the lemonade quantity.
	 * @return the lemonade transaction quantity
	 **/
	var getLemonadeQuantity = function() {
		return transactionCount.mediumLemonade + 
			transactionCount.largeLemonade * 2;
	};

	/**
	 * Gets the medium lemonade quantity.
	 * @return the medium lemonade transaction quantity
	 **/
	var getMediumLemonadeQuantity = function() {
		return transactionCount.mediumLemonade;
	};

	/**
	 * Gets the large lemonade quantity.
	 * @return the large lemonade transaction quantity
	 **/
	var getLargeLemonadeQuantity = function() {
		return transactionCount.largeLemonade;
	};

	/**
	 * Get the healty snack quantity.
	 * @return the healthy snack transaction quantity
	 **/
	var getHealthySnackQuantity = function() {
		return transactionCount.healthySnack;
	};

	/**
	 * Get the treat quantity.
	 * @return the treats transaction quantity
	 **/
	var getTreatQuantity = function() {
		return transactionCount.treats;
	};

	/**
	 * Gets the large lemonade cost.
	 * @return the large lemonade cost
	 **/
	var getLargeLemonadeCost = function() {
		return largeLemonadeCost;
	};

	/**
	 * Gets the medium lemonade cost.
	 * @return the medium lemonade cost
	 **/
	var getMediumLemonadeCost = function() {
		return mediumLemonadeCost;
	};

	/**
	 * Gets the healthy snack cost.
	 * @return the healthy snack cost
	 **/
	var getHealthySnackCost = function() {
		return healthySnackCost;
	};

	/**
	 * Gets the treat cost.
	 * @return the treat cost
	 **/
	var getTreatCost = function() {
		return treatCost;
	};

	/**
	 * Exposes if the transaction has been initialized.
	 * @return boolean of transation state
	 **/
	var isTransactionInitialized = function() {
		return transactionInitialized;
	};

	/**
	 * Get the transaction service all setup.
	 **/
	var intializeTransaction = function() {

		return SuppliesApiService.getSupplyCosts()
			.then(function(resolved) {
				var data = resolved.data;

		  		healthySnackCost = data.healthySnack;
			  	treatCost = data.treat;
			  	mediumLemonadeCost = data.mediumLemonade;
			  	largeLemonadeCost = data.largeLemonade;
			  	transactionInitialized = true; 

			}, function() {
				console.log(error.SYSTEM_ISSUE_ERROR);
			});

	};

	/**
	 * Complete's the transaction interaction.
	 * @return promise api from TransactionApiService
	 **/
	var completeTransaction = function() {
		
		//Creating a transaction object to pass through
		var transaction = {
			transactionLemonade: getLemonadeQuantity(),
			transactionCount: transactionCount,
			transactionCountTotal: transactionCountTotal,
			transactionCost: transactionCost
		};
		
		return TransactionApiService.addTransaction(transaction);
	};

 	return {
		intializeTransaction: intializeTransaction,
		isTransactionInitialized: isTransactionInitialized,
		incrementLargeLemonade: incrementLargeLemonade,
		incrementMediumLemonade: incrementMediumLemonade,
		incrementHealthSnack: incrementHealthSnack,
		incrementTreat: incrementTreat,
		clearCurrentTransaction: clearCurrentTransaction,
		completeTransaction: completeTransaction,
		getCurrentTransactionQuantity: getCurrentTransactionQuantity,
		getCurrentTransactionCost: getCurrentTransactionCost,
		getLemonadeQuantity: getLemonadeQuantity,
		getMediumLemonadeQuantity: getMediumLemonadeQuantity,
		getLargeLemonadeQuantity: getLargeLemonadeQuantity,
		getHealthySnackQuantity: getHealthySnackQuantity,
		getTreatQuantity: getTreatQuantity,
		getLargeLemonadeCost: getLargeLemonadeCost,
		getMediumLemonadeCost: getMediumLemonadeCost,
		getHealthySnackCost: getHealthySnackCost,
		getTreatCost: getTreatCost
 	};

}]);
/**
 * Transformer used to change the incoming data to our own API
 *  (i.e. we will be changing incoming parameter 'contact' to 'bestContact')
 **/
 app.factory('DonorsResponseTansformer', function() {
 	'use strict';
 	
 	/**
 	 * Returns a function that parses the data
 	 **/
 	return function(data) {

 		//Need JSON.parse: Get a string when transforming
    	var transformedData = JSON.parse(data);

    	if (transformedData.length) {
    		
    		//Using underscore to map new response
    		transformedData = _.map(transformedData, function(item) {
    			return {
                    id: item.id,
    				name: item.name,
    				phone: item.phone,
    				address: item.address,
    				zipcode: item.zipcode,
    				email: item.email,
    				bestContact: item.contact
    			};
    		});

    	}

    	//Returning transformed response
        return transformedData;
	};
 });

/**
 * Transformer used to change the incoming data to our own API
 *  (i.e. we will be changing incoming parameter 'lemonadeQuantity' to 'lemonade')
 **/
 app.factory('SuppliesResponseTransformer', function() {
 	'use strict';
 	
 	/**
 	 * Returns a function that parses the data
 	 **/
 	return function(data) {

 		//Need JSON.parse: Get a string when transforming
    	data = JSON.parse(data);
        
        var transformedData = {
            lemonade: data.lemonadeQuantity,
            healthySnack: data.healthySnackQuantity,
            treat: data.treatQuantity
        };

    	//Returning transformed response
        return transformedData;
	};
 });
