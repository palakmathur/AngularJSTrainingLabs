'use strict';

var app = angular.module('demo', []);

 app.controller('DemoController', function($scope) {
	$scope.form = {
		isDisabled : false,
		isReadonly : false,
		isChecked: false,
	};

	$scope.changeMe = function(){
		alert('changed');	

	}
	
 });

 
