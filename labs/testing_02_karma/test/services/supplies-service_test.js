'use strict';

/**
 * Jasmine specs for the supplies service.
 */
 describe('Supplies Service', function() {

 	var SuppliesService;

 	beforeEach(module('lemonadeApp'));
 	beforeEach(inject(function(_SuppliesService_) {
 		SuppliesService = _SuppliesService_;
 	}));


 	describe('accessors', function() { 
 		it('should have lemonade quantity defaulted to zero', function() {
 			expect(SuppliesService.getLemonadeQuantity()).toEqual(0);
 		});

  		it('should have healthy snack quantity defaulted to zero', function() {
 			expect(SuppliesService.getHealthySnackQuantity()).toEqual(0);
 		});		

  		it('should have treat quantity defaulted to zero', function() {
 			expect(SuppliesService.getTreatQuantity()).toEqual(0);
 		});	 

  		it('should have product not available before initialization', function() {
 			expect(SuppliesService.isProductAvailable()).toEqual(false);
 		});	

  		it('should not have service initialized before initialization', function() {
 			expect(SuppliesService.isInitialized()).toEqual(false);
 		});	 		

 	});

 	describe('mutators', function() {

 		beforeEach(function() {
 			SuppliesService.setSupplies(10, 20, 30);
 		});

 		//Negative 10 because this is a subtraction method
 		it('should update lemonade quantity', function() {
 			expect(SuppliesService.getLemonadeQuantity()).toEqual(-10);
 		});

 		//Negative 20 because this is a subtraction method
 		it('should update lemonade quantity', function() {
 			expect(SuppliesService.getHealthySnackQuantity()).toEqual(-20);
 		});

		//Negative 30 because this is a subtraction method
 		it('should update lemonade quantity', function() {
 			expect(SuppliesService.getTreatQuantity()).toEqual(-30);
 		});  		 		
 	});

 	describe('initialize', function() {

 		var $httpBackend, promiseKept;

 		beforeEach(inject(function(_$httpBackend_) {
 			$httpBackend = _$httpBackend_;
 		}));

 		beforeEach(function() {

        	$httpBackend.expect('GET', '/app/data/supplies.json')
        		.respond(200, 	
        			{ initial: 
        				{
    						lemonadeQuantity: 6, 
    						healthySnackQuantity: 4, 
    						treatQuantity : 2
    					}
    				}
    			);

        	promiseKept = SuppliesService.initialize();	

 		});

		afterEach(function() {
  		$httpBackend.verifyNoOutstandingExpectation();
  		$httpBackend.verifyNoOutstandingRequest();
		}); 		

 		it('should return a promise', function() {
			expect(angular.isFunction(promiseKept.then)).toBeTruthy();
			$httpBackend.flush();
 		});

 		it('should initialize lemonade quantity', function() {
 			promiseKept.then(function(resolved) {
 				expect(resolved.data.initial.lemonadeQuantity).toBe(6);
 				expect(SuppliesService.getLemonadeQuantity())
 					.toBe(resolved.data.initial.lemonadeQuantity);
        	});
 			$httpBackend.flush();
 		});

 		it('should initialize the snack quantity', function() {
 			promiseKept.then(function(resolved) {
 				expect(resolved.data.initial.healthySnackQuantity).toBe(4);
 				expect(SuppliesService.getHealthySnackQuantity())
 					.toBe(resolved.data.initial.healthySnackQuantity);
        	});
 			$httpBackend.flush();
 		});

 		it('should initialize the treat quantity', function() {
 			promiseKept.then(function(resolved) {
 				expect(resolved.data.initial.treatQuantity).toBe(2);
 				expect(SuppliesService.getTreatQuantity())
 					.toBe(resolved.data.initial.treatQuantity);
        	});
 			$httpBackend.flush();
 		}); 		

 	});

 });