'use strict';

/**
 *  Application filters
 **/

 /**
  * Show Date filter takes a date string, converst it to a new Date and
  *		then uppercases the date.
  **/
angular.module('app.filters', [])
	.filter('showDate', ['$filter', function($filter) {
		return function(item) {
			if (angular.isString(item)) {
				return $filter('date')(new Date(item), 'mediumDate').toUpperCase();
			}  
		}; 
	}]);