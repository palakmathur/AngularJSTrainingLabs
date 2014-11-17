'use strict';
/**
 *  Directive to be used across all page headers.
 **/
app.directive('lemonTitle', function() {
	return {
		restrict: 'AE',  
    	scope: true,
		template: '<h2>{{page.title}}</h2>'
	};
});