'use strict';

/**
 * Give Controller for the give route.
 **/
 app.controller('GiveController', 
 	['$scope', 'CurrentLocationService', 
 		function($scope, CurrentLocationService) {
 	
 	//Setting the page properties
 	$scope.page = {
 		title: 'Give',
 		coords: ''
 	};

 	$scope.init = function() {
		var promiseKept = CurrentLocationService.getLocation();

		promiseKept.then(function(data) {
			$scope.page.coords = 'Latitude: ' + data.latitude + ' & Longitude: ' + data.longitude;
		}, function(error) {
			console.log(error);
		});
 	};

 	$scope.init();

 }]);