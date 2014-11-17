'use strict';

/**
 * Jasmine specs for the testing templates.
 */
 describe('Template tests', function() {

 	//This tries to map the path when $location changes 
 	//var $route;
 	var $state;

 	beforeEach(module('lemonadeApp'));

 	beforeEach(inject(function(_$state_) {
 		$state = _$state_;
 	}));

 	describe('Configuration', function() {	
 	
 		it('should map our sell route correctly', function() {
 	 		expect($state.get('sell').controller).toBe('SellController');
 			expect($state.get('sell').templateUrl).toEqual('templates/sell.html');
 		});

 		it('should map our / route correctly', function() {
 			expect($state.get('home').controller).toBe('HomeController');
 			expect($state.get('home').templateUrl).toEqual('templates/home.html');			
 		});
 	});

 	describe('Loading', function() {
 		var $httpBackend, $location, $rootScope;

	 	beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$location_) {
	 		$httpBackend = _$httpBackend_;
	 		$location = _$location_;
	 		$rootScope = _$rootScope_;
	 	}));

	    afterEach(function() {
	 		//Makes sure that all of the requests in the expect were made
	 		//	Throws exception if they are not
		  	$httpBackend.verifyNoOutstandingExpectation();
			//Makes sure there aren't any requests that need to be flushed
			$httpBackend.verifyNoOutstandingRequest();
		});



		it('should load the home template at /sell', function() {
	  		$httpBackend.expectGET('templates/sell.html')
	  			.respond(200);

	  		//Transition to the report path
			$location.path('/sell');

			$httpBackend.flush();

			//This isn't needed we only care that the path loaded
			expect($location.path()).toBe('/sell');

		});

		it('should load the home template at /', function() {
	  		$httpBackend.expectGET('templates/home.html')
	  			.respond(200);

	  		//Transition to the report path
			$location.path('/');

			$httpBackend.flush();
			
			//This isn't needed we only care that the path loaded
			expect($location.path()).toBe('/');		

		});	

 	});

 });