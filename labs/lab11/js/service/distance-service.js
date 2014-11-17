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