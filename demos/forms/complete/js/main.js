'use strict';

var app = angular.module('demo', ['ngMessages']);

 app.controller('DemoController', function($scope) {
	$scope.form = {
		isDisabled : false,
		isReadonly : false,
		isChecked: true,
	};

	$scope.sentence = {
		feeling: 'good',
		speak:'',
		yell:''
	};

	$scope.cars = [
		{model:'Prius'},
		{model: 'Rav 4'},
		{model: 'Leaf'},
		{model: 'Volt' }
	];

	//$scope.currentlySelected1 = $scope.cars[0];
	$scope.currentlySelected2 = $scope.cars[0];
	$scope.currentlySelected3 = $scope.cars[0];

	$scope.amplify = function(){
		$scope.sentence.yell = $scope.sentence.speak.toUpperCase();
	};



	$scope.submitForm = function(){
		console.log('Form Pristine: ' + $scope.buyerInformation.$pristine);
		console.log('Form Dirty: ' + $scope.buyerInformation.$dirty);
		console.log('Name Pristine: ' + $scope.buyerInformation.name.$pristine);
		console.log('Form Valid: ' + $scope.buyerInformation.$valid);
	};


	
 });

 
