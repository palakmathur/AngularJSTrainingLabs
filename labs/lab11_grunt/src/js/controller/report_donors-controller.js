'use strict';

/**
 * Report Controller for the reporting of sales.
 * @param philanthropists injected via angular-ui router
 **/
 app.controller('ReportDonorsController', 
 	['$scope', '$state', 'philanthropists', 'PhilanthropistApiService', 
 		function($scope, $state, philanthropists, philanthropistApiService) {

		 	//The donors who want to give to Alex's Lemonade Stand
		 	$scope.donors = philanthropists;

		 	//Specified search criteria
			$scope.search = {
				nameAndBestContact: ''
			};

		 	//Message booleans for UI
		 	$scope.messages = {
		 		donorRemovalError: false
		 	};

		 	/**
		 	 * Search criteria based on name or best contact info.
			 * Used within ng-repeat
		 	 * @param donor is passed in at each iteration
		 	 * @return donorMatched is true if a donor matched the search criteria
		 	 **/
		 	$scope.searchNameAndBestContact = function(donor) {
		 		var donorMatched = false;

		 		//-1 Means it can't be found
		 		if ( (donor.name.indexOf($scope.search.nameAndBestContact) !== -1 ) || 
		 			(donor.bestContact.indexOf($scope.search.nameAndBestContact) !== -1 )) {
		 			donorMatched = true;
		 		}

		 		//Need boolean evaluation of donor to see if 
		 		//	it should be included in UI
		 		return donorMatched;
		 	};

		 	/**
		 	 * Removes the donor from the list of donors.
		 	 **/
		 	$scope.deleteDonor = function(id) {

		 		//Interact with the philanthropist service 
		 		var promiseKept = philanthropistApiService.removeDonor(id);
		 		//As a note if we changed the $resource API to simply return $resource
		 		//	then we have to pass in an object
		 		//var promiseKept = philanthropistApiService.removeDonor({donor: id});

		 		//Bye-bye donor
		 		promiseKept.then(function(data) {
		 		//As a note if we changed the $resource API to simply return $resource
		 		//  then we have to grab the $promise object off of the promiseKept
		 		//promiseKept.$promise.then(function(data) {
		 			
		 			//Get the data in as a JS object
		 			$scope.donors = data.toJSON().philanthropists;
		 			
		 			$scope.messages.donorRemovalError = false;
		 			
		 			//Redirect back to complete list of donors
		 			$state.go('reports.donors');
		 		}, function() {
		 			//Shucks there was an error
		 			$scope.messages.donorRemovalError = true;
		 		});
		 	};

 }]);