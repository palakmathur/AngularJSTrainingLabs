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