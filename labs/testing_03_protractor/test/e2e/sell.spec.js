'use strict';
/**
 *	Protractor e2e dealing with sell scenarios.
 **/
 describe('Give Form Scenarios', function() {

 	beforeEach(function() {
		browser.get('/#/sell');
	});

	it('should increment large lemonade when clicked', function() {
		var input = element(by.css('[ng-click="incrementLargeLemonade()"]'));
		input.click();
		expect($('[ng-click="incrementLargeLemonade()"] mark').getText()).toEqual('1');
		input.click();
		expect($('[ng-click="incrementLargeLemonade()"] mark').getText()).toEqual('2');		
	});

	it('should increment medium lemonade when clicked', function() {
		var input = element(by.css('[ng-click="incrementMediumLemonade()"]'));
		input.click();
		expect($('[ng-click="incrementMediumLemonade()"] mark').getText()).toEqual('1');
	});

	it('should increment healthy snack when clicked', function() {
		var input = element(by.css('[ng-click="incrementHealthySnack()"]'));
		input.click();
		expect($('[ng-click="incrementHealthySnack()"] mark').getText()).toEqual('1');
	});

	it('should increment treat when clicked', function() {
		var input = element(by.css('[ng-click="incrementTreat()"]'));
		input.click();
		expect($('[ng-click="incrementTreat()"] mark').getText()).toEqual('1');
	});	

	it('should increment transaction quantity when clicked', function() {
		var treatInput = element(by.css('[ng-click="incrementTreat()"]'));
		var healthyInput = element(by.css('[ng-click="incrementHealthySnack()"]'));
		var mediumInput = element(by.css('[ng-click="incrementMediumLemonade()"]'));
		healthyInput.click();
		treatInput.click();
		treatInput.click();
		treatInput.click();
		mediumInput.click();
		treatInput.click();
		expect($('#transactionQuantity mark').getText()).toEqual('6');
		expect($('#transactionCost mark').getText()).toEqual('7');
	});	

	it('should clear a transaction', function() {
		var treatInput = element(by.css('[ng-click="incrementTreat()"]'));
		var healthyInput = element(by.css('[ng-click="incrementHealthySnack()"]'));
		var mediumInput = element(by.css('[ng-click="incrementMediumLemonade()"]'));
		healthyInput.click();
		treatInput.click();
		treatInput.click();
		treatInput.click();
		mediumInput.click();
		treatInput.click();
		$('#clearTransaction').click();
		expect($('#transactionQuantity mark').getText()).toEqual('0');
		expect($('#transactionCost mark').getText()).toEqual('0');
		expect($('[ng-click="incrementTreat()"] mark').getText()).toEqual('0');	
		expect($('[ng-click="incrementHealthySnack()"] mark').getText()).toEqual('0');
		expect($('[ng-click="incrementLargeLemonade()"] mark').getText()).toEqual('0');	
		expect($('[ng-click="incrementMediumLemonade()"] mark').getText()).toEqual('0');				
	});	

	it('should complete an order', function() {
		var treatInput = element(by.css('[ng-click="incrementTreat()"]'));
		var healthyInput = element(by.css('[ng-click="incrementHealthySnack()"]'));
		healthyInput.click();
		treatInput.click();
		healthyInput.click();
		treatInput.click();
		$('[ng-click="completeOrder()"]').click();
		browser.setLocation('/supplies');

		//Transferring to supplies page to see the quantity decremented
		var el = element(by.binding('actual.healthySnackQuantity'));
		expect(el.getText()).toEqual('0');
	});			

 });