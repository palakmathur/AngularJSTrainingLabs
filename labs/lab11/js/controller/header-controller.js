'use strict';

/**
 * Header Controller for the application header.
 **/
 app.controller('HeaderController', 
 	['$scope', 
 		function($scope) {
 	
 	//Setting the page properties
 	$scope.date = {
 		human: new Date(),
 		machine: new Date()
 	};

 }]);