'use strict';

/**
 * Jasmine specs for the transaction service.
 */
 describe('Transaction Service', function() {
 	var TransactionService;

 	beforeEach(module('lemonadeApp'));
 	beforeEach(inject(function(_TransactionService_) {
 		TransactionService = _TransactionService_;
 	}));

 	describe('accessors', function() {
 		
 		it('should have transaction quantity defaulted to zero', function() {
 			expect(TransactionService.getCurrentTransactionQuantity()).toEqual(0);
 		});

 		it('should have transaction cost defaulted to zero', function() {
 			expect(TransactionService.getCurrentTransactionCost()).toEqual(0);
 		});

 		it('should have large lemonade quantity defaulted to zero', function() {
 			expect(TransactionService.getHealthySnackQuantity()).toEqual(0);
 		});

 		it('should have medium lemonade quantitiy defaulted to zero', function() {
 			expect(TransactionService.getMediumLemonadeQuantity()).toEqual(0);
 		});

 		it('should have lemonade quantitiy defaulted to zero', function() {
 			expect(TransactionService.getLemonadeQuantity()).toEqual(0);
 		}); 

 		it('should have healthy snack quantitiy defaulted to zero', function() {
 			expect(TransactionService.getHealthySnackQuantity()).toEqual(0);
 		});

 		it('should have treat quantitiy defaulted to zero', function() {
 			expect(TransactionService.getTreatQuantity()).toEqual(0);
 		});  

 		it('should have large lemonade cost defaulted to zero', function() {
 			expect(TransactionService.getHealthySnackQuantity()).toEqual(0);
 		});

 		it('should have medium lemonade cost defaulted to zero', function() {
 			expect(TransactionService.getTreatQuantity()).toEqual(0);
 		});  

 		it('should have healthy snack cost defaulted to zero', function() {
 			expect(TransactionService.getHealthySnackQuantity()).toEqual(0);
 		});

 		it('should have treat cost defaulted to zero', function() {
 			expect(TransactionService.getTreatQuantity()).toEqual(0);
 		});   		 						

 	});

 	describe('mutators', function() {
 		it('should increment large lemonade quantity', function() {
 			expect(TransactionService.incrementLargeLemonade()).toEqual(1);
 		}); 

 		it('should increment medium lemonade quantity', function() {
 			expect(TransactionService.incrementMediumLemonade()).toEqual(1);
 		});

 		it('should increment healthy snack quantity', function() {
 			expect(TransactionService.incrementHealthSnack()).toEqual(1);
 		}); 	

 		it('should increment treat quantity', function() {
 			expect(TransactionService.incrementTreat()).toEqual(1);
 		});  			

 		it('should clear transaction', function() {
 			TransactionService.incrementTreat();
 			TransactionService.incrementTreat();
 			TransactionService.incrementHealthSnack();
 			TransactionService.incrementMediumLemonade();
 			TransactionService.incrementLargeLemonade();

 			TransactionService.clearCurrentTransaction();
 			
 			expect(TransactionService.getMediumLemonadeQuantity()).toEqual(0);
 			expect(TransactionService.getLargeLemonadeQuantity()).toEqual(0);
 			expect(TransactionService.getHealthySnackQuantity()).toEqual(0);
 			expect(TransactionService.getTreatQuantity()).toEqual(0);		
 		});
 	});

	describe('initialize', function() {
 		
 		var $httpBackend, promiseKept;

 		beforeEach(inject(function(_$httpBackend_) {
 			$httpBackend = _$httpBackend_;
 		}));

 		beforeEach(function() {

        	$httpBackend.expect('GET', '/app/data/cost.json')
        		.respond(200, 	
					{ 
						largeLemonade: 3, 
						mediumLemonade: 2,
						healthySnack: 1,
						treat: 1
					}
    			);

        	promiseKept = TransactionService.intializeTransaction();

 		});

 		it('should initialize large lemonade cost', function() {
 			promiseKept.$promise.then(function(resolved) {
 				expect(resolved.largeLemonade).toBe(3);
 				expect(TransactionService.getLargeLemonadeCost())
 					.toBe(resolved.largeLemonade);
        	});
        	$httpBackend.flush();
 		});

 		it('should initialize medium lemonade cost', function() {
 			promiseKept.$promise.then(function(resolved) {
 				expect(resolved.mediumLemonade).toBe(2);
 				expect(TransactionService.getMediumLemonadeCost())
 					.toBe(resolved.mediumLemonade);
        	});
        	$httpBackend.flush();
 		}); 		

 		it('should initialize healthy snack cost', function() {
 			promiseKept.$promise.then(function(resolved) {
 				expect(resolved.healthySnack).toBe(1);
 				expect(TransactionService.getHealthySnackCost())
 					.toBe(resolved.healthySnack);
        	});
        	$httpBackend.flush();
 		}); 

 		it('should initialize treat cost', function() {
 			promiseKept.$promise.then(function(resolved) {
 				expect(resolved.treat).toBe(1);
 				expect(TransactionService.getTreatCost())
 					.toBe(resolved.treat);
        	});
        	$httpBackend.flush(); 	
 		}); 		

	});

});