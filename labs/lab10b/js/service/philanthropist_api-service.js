'use strict';

/**
 * Service to handle interaction with Philanthropist API.
 * Utilizing ngResource for service interaction.
 **/
app.factory('PhilanthropistApiService', 
	['$resource', 'DonorsResponseTansformer', 
		function($resource, donorsResponseTansformer) {

	//A $resource object that serves as an interface to our back-end
	//	Includes transform for donor information
	var Philanthropist = $resource('/data/philanthropists/:donor', 
			{}, 
			{
				'query': {
					method:'GET', 
					isArray:true,
					transformResponse: donorsResponseTansformer
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

	};

	/**
	 * Adds a donor to the back-end. Renaming of save.
	 *	Abstraction over $resource.save()
	 * @return a promise object to be evaluated when complete
	 **/
	var addDonor = function(data) {

		//Will place the data in the body of the Ajax call
		return Philanthropist.save({}, data).$promise;

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
		return Philanthropist.remove({donor: donorId}, {}).$promise;

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
				transformResponse: donorsResponseTansformer
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