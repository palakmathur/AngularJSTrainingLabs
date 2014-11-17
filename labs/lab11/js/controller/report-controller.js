'use strict';

/**
 * Report Controller for the reporting of sales.
 **/
 app.controller('ReportController', 
 	['$scope', '$state', 
 		function($scope, $state) {

 	//Needed for deep state nesting of ui-router
 	//	Allows for easy .active class adding in UI
 	$scope.$state = $state;

 	//Setting the page properties
 	$scope.page = {
 		title: 'Reports'
 	};

 }]);