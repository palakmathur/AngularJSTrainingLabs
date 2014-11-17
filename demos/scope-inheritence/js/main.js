'use strict';

var app = angular.module('demo', []).run(function($rootScope){
	$rootScope.root = "from root scope";

});


 app.controller('ParentController', function($scope) {
	$scope.parent = "from parent's scope";
 });


 app.controller('ChildController',function($scope){
 	$scope.child = "from child scope";

 });