'use strict';

/**
 * Jasmine specs for the router.
 */
describe('Routing Tests', function(){

	var $location, $state, $rootScope, $urlRouter, $httpBackend;

	beforeEach(module('lemonadeApp'));

	beforeEach(inject(function(_$location_, _$state_, _$rootScope_, _$urlRouter_, _$httpBackend_) {
		$location = _$location_;
		$state = _$state_;
		$rootScope = _$rootScope_;
		$urlRouter = _$urlRouter_;
		$httpBackend = _$httpBackend_;
	}));

    afterEach(function() {
 		//Makes sure that all of the requests in the expect were made
 		//	Throws exception if they are not
	  	$httpBackend.verifyNoOutstandingExpectation();
		//Makes sure there aren't any requests that need to be flushed
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('home route', function() {

		beforeEach(inject(function() {
			$httpBackend.expectGET('templates/home.html')
				.respond(200, 'main html');
		}));

		it('should load the home page when / is hit', function() {
			$location.path('/');

			//This will accomplish the same code as above
			//$state.transitionTo('home');
			//Need to flush the caught call in the $httpBackend for the 
			//	transition of the state to occur
			$httpBackend.flush();
			
			expect($state.current.controller).toBe('HomeController');
		});

		it('should redirect the user to the home page on a bad route', function() {
			$location.path('/non/existent');
			$httpBackend.flush();
			expect($state.current.controller).toBe('HomeController');
			expect($state.current.templateUrl).toBe('templates/home.html');
		});
	
	});

	describe('sell route', function() {

		beforeEach(inject(function() {
			$httpBackend.expectGET('templates/sell.html')
				.respond(200, 'sell html');
		}));

		it('should load the sell page when /sell is hit', function() {
			$location.path('/sell');
			$httpBackend.flush();
			expect($state.current.controller).toBe('SellController');
		});
	
	});

});