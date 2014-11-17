'use strict';

var app = angular.module('demo', []).run(function($rootScope){
	$rootScope.greeter = {
 			greeting: 'Hey',
 			
 	};
});


 app.controller('HomeController', function($scope) {
 	$scope.greeter = {
 			greeting: 'Hi',
 			
 	};
 });

 app.directive('coExpander',function(){
 		return{
 			restrict:"EA",
 			template: '<div>{{greeter.greeting}} <span ng-transclude></span></div>',
 			replace: false,
 			transclude: true,
 			scope: false,
 			/*
 			scope:{
 				greeting:'=customGreeting',
 			}
 			*/
 		}
 });

