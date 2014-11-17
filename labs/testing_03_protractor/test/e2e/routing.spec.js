'use strict';
/**
 *	Protractor e2e dealing with routing scenarios.
 **/
describe('Routing Scenarios', function() {

	
	beforeEach(function() {
		//Need to bring the application back home
		browser.get('/#/');
	});

	describe('basic direct routing', function() {

		it('should navigate to the home page', function() {
		 	browser.get('/#');
		 	expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/');
		});

		it('should navigate to home page and contain a Lemon-Aide title', function() {
		 	browser.get('/#');
		 	expect(browser.getTitle()).toContain('Lemon-Aide');
	   	});

	   	it('should navigate to the give page', function() {
	   		browser.get('/#/give');
	   		expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/give');
	   	});

	   	it('should navigate to supplies page', function() {
	   		browser.get('/#/supplies');
	   		expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/supplies');
	   	});

	   	it('should navigate to report page', function() {
	   		browser.get('/#/report');
	   		expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/report');
	   	});

	});

	describe('route transitions', function() {

		it('should start on home page then transition off home', function() {
			browser.get('/#');
			browser.setLocation('/give');
			expect(browser.getCurrentUrl()).toNotEqual(browser.baseUrl + '/#');
		});

		it('should start on home page then transition to give', function() {
			browser.get('/#');
			browser.setLocation('/give');
			expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/give');
		});

		it('should start at sell page then transition to report and then to supplies', function() {
			browser.get('/#/sell');
			browser.setLocation('/report');
			browser.setLocation('/supplies');
			expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/supplies');
		});

	});

	describe('home route', function() {

		it('should show a picture of a lemonade glass', function() {
			var el = element(by.css('img[alt]')) ;
			expect(el.getAttribute('alt')).toEqual('Lemonade in a glass');
		});

		it('should have a caption for the picture', function() {
			//$ shorthand for element(by.css('figure figcaption'))
			var el = $('figure figcaption');
			expect(browser.isElementPresent(el)).toBe(true);
		});

		it('should have a link to Alex\'s Lemonade Stand', function() {
			var el = $('a[href="http://www.alexslemonade.org/"]');
			expect(el.getText()).toEqual('The Imagineer!');
		});

		it('should have an external pointing link to Alex\'s Lemonade Stand', function() {
			var el = $('a[href="http://www.alexslemonade.org/"]');
			expect(el.getAttribute('target')).toEqual('_blank');
		});

		it('should have an active link of Lemon-Aide', function() {
			var el = $('li.active a');
			expect(el.getText()).toEqual('Lemon-Aide');
		});

		it('should show today\'s date', function() {
			var d = new Date();
			var el = $('time');
			expect(el.getText()).toMatch(d.getFullYear());
		});

	});

});