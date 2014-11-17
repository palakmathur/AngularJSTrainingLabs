'use strict';

/**
 * Give Form Controller for the form submission on the give page.
 **/
 app.controller('GiveFormController', ['$scope', function($scope) {
 	
 	//Setting the page properties
 	$scope.form = {
 		submitted: false,
 		message: ''
 	};

 	$scope.submit = function() {
 		if ($scope.giveForm.$valid) {
			$scope.form.message = 'Thanks for donating';
 		} else {
 			$scope.form.submitted = true;
			$scope.form.message = 'We can not sumbit: ';
			$scope.generateFormError();
			console.log('Name $valid:' + $scope.giveForm.giverName.$valid);
 		}
 	};

 	$scope.generateFormError = function() {
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