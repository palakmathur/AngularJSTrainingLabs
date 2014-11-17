'use strict';

/**
 * Header Controller for the application header.
 **/
 app.controller('FooterController', 
 	['$scope', 'DistanceService', 
 		function($scope, DistanceService) {
 	
 	//Setting the page properties
 	$scope.headquarter = {
 		distance: ''
 	};

 	$scope.init = function() {
		var promiseKept = DistanceService.getDistance();

		promiseKept.then(function(distance) {
			$scope.headquarter.distance = distance;
		}, function(error) {
			console.log(error);
		});
 	};

 	$scope.init();

 }]);