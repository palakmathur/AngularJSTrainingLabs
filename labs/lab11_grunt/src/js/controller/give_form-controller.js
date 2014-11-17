'use strict';

/**
 * Give Form Controller for the form submission on the give page.
 **/
 app.controller('GiveFormController', 
 	['$scope', 'PhilanthropistApiService', 
 		function($scope, PhilanthropistApiService) {

 	//Setting the page properties
 	$scope.form = {
 		isNotSubmittable: false,
 		message: ''
 	};

 	//Form inputs: 
 	//	Need 'Email' defaulted for our select box
 	//	Everything else should be empty
 	$scope.giver = {
 		name: '',
 		phone: '',
 		address: '',
 		zipcode: '',
 		email: '',
 		contact: 'Email'
 	};

 	/**
 	 * Add Donor action invoked via submit event listener.
 	 **/
 	$scope.addDonor = function() {
 		var promiseKept = {};

 		if ($scope.giveForm.$valid) {
			promiseKept = PhilanthropistApiService.addDonor($scope.giver);

			promiseKept.then(function() {
				$scope.form.message = 'Thanks for donating';
			}, function() {
				$scope.form.message = 'No go: backend down - try again';
			});
 		} else {
			$scope.form.message = 'We cannot add you: ';
			generateFormError();
 		}
 	};

 	/**
 	 * Generates a simple error message for UI.
 	 */
 	var generateFormError = function() {
 		if ($scope.giveForm.giverName.$invalid) {
 			$scope.form.message += 'Please check your name input.';
 		} else if ($scope.giveForm.phone.$invalid) {
 			$scope.form.message += 'Please enter a phone number.';
 		} else if ($scope.giveForm.zipcode.$invalid) {
 			$scope.form.message += 'Please check your zipcode.';
 		} else if ($scope.giveForm.email.$invalid) {
 			$scope.form.message += 'Please check your email.';
 		}
 	};

 }]);