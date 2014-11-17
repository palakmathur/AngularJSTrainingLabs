'use strict';
/**
 *	Protractor e2e dealing with reporting scenarios.
 **/
 describe('Reporting Scenarios', function() {

 	beforeEach(function() {
		browser.get('/#/report');
	});

 	it('should initialize with the number 10 in the form', function() {
 		var el = element(by.model('limiter.limitValue'));
 		expect(el.getAttribute('value')).toEqual('10');
 	});

 	it('should have a report with at most 10 rows', function() {
 		var els = element.all(by.repeater('sale in sales'));
 		expect(els.count()).toBeLessThan(11);
 	});

 	it('should have a $ in the cost of goods', function() {
 		element.all(by.repeater('sale in sales'))
 			.then(function(sales) {
 				var tdEl = sales[0].element(by.css('td:last-child'));
 				expect(tdEl.getText()).toContain('$');
 			});
 	});

 	it('should have a $ in the net sales', function() {
 		element.all(by.repeater('sale in sales'))
 			.then(function(sales) {
 				var tdEl = sales[0].element(by.css('td:nth-child(3)'));
 				expect(tdEl.getText()).toContain('$');
 			});
 	}); 	

 	it('should have all capital letters for the month', function() {
 		element.all(by.repeater('sale in sales'))
 			.then(function(sales) {
 				var tdElText = sales[0].element(by.css('td:first-child')).getText();
 				//Don't forget everything in Protractor is promise based
 				expect(tdElText).toEqual(tdElText.then(function(text) {
 					return text.toUpperCase();
 				}));
 			});
 	});

 	it('should show 24 months of sales', function() {
 		expect(element(by.binding('sales.length')).getText()).toEqual('24');
 	});

 	it('should show different rows when input is changed', function() {
 		//var initialCount = element.all(by.repeater('sale in sales')).count();
 		var finalCount ='';
 		var el = element(by.model('limiter.limitValue'));
 		el.clear();
 		el.sendKeys('2');
 		finalCount = element.all(by.repeater('sale in sales')).count();
 		expect(finalCount).toEqual(2);
 	});

 });