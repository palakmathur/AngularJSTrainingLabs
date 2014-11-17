'use strict';

/**
 * Home Controller for the home route.
 **/
 app.controller('HeaderController', ['$scope', function($scope) {
 	
 	//Setting the page properties
 	$scope.date = {
 		human: new Date(),
 		machine: new Date()
 	};

 }]);