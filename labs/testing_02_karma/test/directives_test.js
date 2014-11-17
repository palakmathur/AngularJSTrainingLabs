'use strict';

/**
 * Jasmine specs for the testing directives.
 */
 describe('Directive Tests', function() {
 	var createdElement, $rootScope;

 	//Get the application ready

    beforeEach(module('lemonadeApp'));

    //Write our specs
    beforeEach(inject(function($compile, _$rootScope_) {
    	$rootScope = _$rootScope_;
    	
    	//Creating an element that will call our directive
    	//	Looks the same as when we simply write it in our HTML
    	createdElement = angular.element(
    		'<div lemon-title></div>'
    	);

    	$compile(createdElement)($rootScope);

    }));

    it('should display the page header', function() {
    	$rootScope.$apply(function() {
    		$rootScope.page = {
    			title: 'Our Page Title'
    		};
      	});

    	expect( createdElement.html() ).toContain('Our Page Title');
    });
 });