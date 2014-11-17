'use strict';

//Creating an angular app
var app = angular.module('lemonadeApp', 
	['ui.router', 'app.filters', 'ngMessages', 'ngResource', 'restangular', 'ngAnimate'])
		.run(['$rootScope', '$state', '$stateParams', 
			function($rootScope, $state, $stateParams) {
				//Allows us to access state across all scopes
				$rootScope.$state = $state;
		        $rootScope.$stateParams = $stateParams;
			}])
		.config(function(DistanceServiceProvider) {
			DistanceServiceProvider.setLatitude(40.001947);
			DistanceServiceProvider.setLongitude(-75.278072);
		})
		.config(function(RestangularProvider) {
			//Specifying that all Restangular API interactions 
			//	will be off /data
			RestangularProvider.setBaseUrl('/data');
		})
		.config(function(RestangularProvider) {
			//Set up the element for the outgoing request
			//  @param elem is the object to be sent across the wire
			//  @param operation string of the request method (i.e. 'post' / 'getList')
			//  @param what string used in creating Restangular instance 
			//		(i.e. 'transactions' if Restangular.all('transactions'))
			RestangularProvider.setRequestInterceptor(
				function(elem, operation, what) {
					var transformation = {};

					if ( (what === 'transactions') && (operation === 'post') ) {
						transformation.healthySnack = elem.transactionCount.healthySnack;
						transformation.treat = elem.transactionCount.treats;
						transformation.largeLemonade = elem.transactionCount.largeLemonade;
						transformation.mediumLemonade = elem.transactionCount.mediumLemonade;
						transformation.totalLemonade = elem.transactionLemonade;
						transformation.productTotal = elem.transactionCountTotal;
						transformation.grossProfit = elem.transactionCost;
						elem = transformation;
					}
					return elem;
				}
			);
		});
