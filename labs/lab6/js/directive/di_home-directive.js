'use strict';
/**
 *  Directive to be used across all page headers.
 **/
app.directive('diHome', function() {
	return {
		restrict: 'EA',
		replace: true,
		scope: {
			diUrl: '=',
			diLinkText: '='
		},
    	template: '<a href="{{diUrl}}" target="_blank">{{diLinkText}}</a>'
	};
});





