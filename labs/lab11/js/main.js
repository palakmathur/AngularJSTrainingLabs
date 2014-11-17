'use strict';

//Creating an angular app
var app = angular.module('lemonadeApp', 
	['ui.router', 'app.filters', 'ngMessages', 'ngResource', 'restangular'])
		.run(['$rootScope', '$state', '$stateParams', 
			function($rootScope, $state, $stateParams) {
				//Allows us to access state across all scopes
				$rootScope.$state = $state;
		        $rootScope.$stateParams = $stateParams;
			}])
		.config(function(DistanceServiceProvider, RestangularProvider) {
			DistanceServiceProvider.setLatitude(40.001947);
			DistanceServiceProvider.setLongitude(-75.278072);

			RestangularProvider.setBaseUrl('/data');
		});

    