'use strict';
/**
 *	Protractor e2e dealing with supplies scenarios.
 **/
describe('Give Supplies Scenarios', function() {

	beforeEach(function() {
		browser.get('/#/supplies');
	});

	it('should default actual cups to 4', function() {
		//This is being loaded async by the way :)
		var el = element(by.binding('actual.lemonadeQuantity'));
		expect(el.getText()).toEqual('4');
	});

	it('should default actual snacks to 2', function() {
		//This is being loaded async by the way :)
		var el = element(by.binding('actual.healthySnackQuantity'));
		expect(el.getText()).toEqual('2');
	});	

	it('should default actual treats to 2', function() {
		//This is being loaded async by the way :)
		var el = element(by.binding('actual.treatQuantity'));
		expect(el.getText()).toEqual('2');
	});	

	it('should default maximum cups to 100', function() {
		//This is being loaded async by the way :)
		var el = element(by.binding('maximum.lemonadeQuantity'));
		expect(el.getText()).toEqual('100');
	});		

	it('should default maximum snacks to 50', function() {
		//This is being loaded async by the way :)
		var el = element(by.binding('maximum.healthySnackQuantity'));
		expect(el.getText()).toEqual('50');
	});	

	it('should default maximum treats to 50', function() {
		//This is being loaded async by the way :)
		var el = element(by.binding('maximum.treatQuantity'));
		expect(el.getText()).toEqual('50');
	});		

});