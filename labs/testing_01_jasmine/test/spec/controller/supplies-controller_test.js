'use strict';

/**
 * Jasmine specs for the supplies controller.
 */
describe('Supplies Controller', function(){

    var $controller, $httpBackend, $rootScope, SuppliesService, scope;

    beforeEach(module('lemonadeApp'));
    beforeEach(inject(function(_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
    }));

    describe('Default Quantities', function() {
        it('should have defaulted actual quantity levels', function() {
            var actual = {
                lemonadeQuantity: 0,
                healthySnackQuantity: 0,
                treatQuantity: 0,
            };

            $controller('SuppliesController', { $scope: scope });
            
            expect(scope.actual).toEqual(actual);
        });

        it('should have defaulted maximum quantity levels', function() {
            var maximum = {
                lemonadeQuantity: 100,
                healthySnackQuantity: 50,
                treatQuantity: 50,
            };

            $controller('SuppliesController', { $scope: scope });
            
            expect(scope.maximum).toEqual(maximum);
        });

        it('should have page title', function() {
            $controller('SuppliesController', { $scope: scope });
            expect(scope.page.title).toBe('Supplies');
        });        
    });

    describe('Setup', function() {

    	beforeEach(inject(function(_$httpBackend_, _SuppliesService_) {
    		
            $httpBackend = _$httpBackend_;
    		SuppliesService = _SuppliesService_;

    	}));

    	it('should successfully interact with the backend', inject(function() {

        	$httpBackend.when('GET', '/app/data/supplies.json')
        		.respond(200, 	
        			{ initial: 
        				{
    						lemonadeQuantity: 4, 
    						healthySnackQuantity: 2, 
    						treatQuantity : 2
    					}
    				}
    			);

        	var suppliesController = $controller('SuppliesController', { $scope: scope });

            //We mainly care that a backend mocking interaction was needed
            //  Let's us know we hit the Supplies Service
        	expect(suppliesController).toBeDefined();

      	}));

     	it('should fail when interacting with the backend', inject(function() {

        	$httpBackend.expect('GET', '/app/data/supplies.json')
        		.respond(404, 'Cannot GET /app/data/supplies.json');
        	
        	var suppliesController = $controller('SuppliesController', { $scope: {} });
        	
            //We mainly care that a backend mocking interaction was needed
            //  Let's us know we hit the Supplies Service            
        	expect(suppliesController).toBeDefined();

      	})); 	

    });

});