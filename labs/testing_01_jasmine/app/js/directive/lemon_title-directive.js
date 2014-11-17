'use strict';
/**
 *  Directive to be used across all page headers.
 **/
app.directive('lemonTitle', function() {
	return {
		restrict: 'AE',
    	//Deprecated in 1.3
    	replace: true,    
    	scope: true,
		template: '<h2>{{page.title}}</h2>'
	};
});