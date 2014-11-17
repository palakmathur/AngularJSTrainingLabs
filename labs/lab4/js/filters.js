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
	}])
	.filter('showCurrent', [function() {
	  return function(data, startingPoint, limit) {
	    var holder = [];
	    var endPoint = startingPoint + limit;
	    if (angular.isArray(data)) {
	      for(var i=0; i<data.length; i++) {
	        if(i > startingPoint && i < endPoint) {
	        	holder.push(data[i]);
	        }
	      }
	    }
	    return holder;
	  };
	}]);	