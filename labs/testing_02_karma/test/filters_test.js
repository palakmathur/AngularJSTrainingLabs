'use strict';

/**
 * Jasmine specs for our filters.
 */
 describe('Filters', function() {
 	var $filter; 

	beforeEach(module('lemonadeApp'));
	beforeEach(inject(function(_$filter_) {
		$filter = _$filter_;
	}));

	it('should give us a capitalized date', function() {
		//Broken with 1-1-2012 because not official format and Safari doesn't like it
		//	Needed to be changed to 1/1/2012
		expect( $filter('showDate')('1/1/2012') ).toBe('JAN 1, 2012');
	});

 });