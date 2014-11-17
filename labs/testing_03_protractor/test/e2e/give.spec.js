'use strict';
/**
 *	Protractor e2e dealing with give scenarios.
 **/
describe('Give Form Scenarios', function() {

	beforeEach(function() {
		browser.get('/#/give');
	});

	it('should remove input messages with name filled out', function() {
		var input = element(by.model('giver.name'));
		input.sendKeys('Kamren');
		//Message element has ng-active when it still has errors
		expect($('#giverName + div').getAttribute('class')).toContain('ng-inactive');
	});

	it('should remove input messages with the phone number filled out', function() {
		var input = element(by.model('giver.phone'));
		input.sendKeys('616-616-6161');
		expect($('#phone + div').getAttribute('class')).toContain('ng-inactive');
	});

	it('should remove input messages with the zipcode filled out', function() {
		var input = element(by.model('giver.zipcode'));
		input.sendKeys('48906');
		expect($('#zipcode + div').getAttribute('class')).toContain('ng-inactive');
	});	

	it('should remove input messages with the email filled out', function() {
		var input = element(by.model('giver.email'));
		input.sendKeys('kamren@developintelligence.com');
		expect(input.getAttribute('class')).toContain('ng-valid');
	});	

	it('should give a thank you message if form is properly filled out', function() {
		//Fill out Kamren
		element(by.model('giver.name')).sendKeys('Kamren');

		//Fill out Phone Number
		element(by.model('giver.phone')).sendKeys('616-616-6161');

		//Fill out Zipcode
		element(by.model('giver.zipcode')).sendKeys('48906');
		
		//Fill out Email Address
		element(by.model('giver.email')).sendKeys('kamren@developintelligence.com');

		//Submit the form
		$('#submitDonation').click();

		//Expect a thank you message
		expect($('#errorMessage').getInnerHtml()).toEqual('Thanks for donating');
	});

	it('should give an error message if form is improperly filled out', function() {
		//Submit the form
		$('#submitDonation').click();

		//There should be something in the error message
		expect($('#errorMessage').getInnerHtml()).toNotEqual('Thanks for donating');

	});

	it('should show coordinates for the location of the user', function() {
		
		//Geolocation takes awhile 
		//	Angular doesn't resolve the promise
		browser.sleep(1000);
		var el = $('#pageCoordinates');
		expect(browser.isElementPresent(el)).toEqual(true);

	});

});