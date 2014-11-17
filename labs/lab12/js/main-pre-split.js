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

/**
 * Configure our application to give us basic routing
 **/
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('lemonaide/');
	$urlRouterProvider.when('/lemonaide/reports', '/lemonaide/reports/sales');

	$stateProvider
		//Base lemonaide state ... /lemonaide
		//	automatically redirects to lemonaide/ because of otherwise above
		.state('lemonaide', {
			url:'/lemonaide',
			abstract: true,
			views: {
				'': {
					template: '<div ui-view></div>'
				},
				'header': {
					templateUrl: 'templates/header.html',
					controller: 'HeaderController'
				},
				'footer': {
					templateUrl: 'templates/footer.html'					
				}
			}			
		})
		//home state ... /lemonaide/home
		.state('home', {
			url:'/',
			parent: 'lemonaide',
			templateUrl: 'templates/home.html',
			controller: 'HomeController'
		})
		//Give state ... /lemonaide/give
		.state('give', {
			url: '/give',
			parent: 'lemonaide',
			templateUrl: 'templates/give.html',
			controller: 'GiveController'
		})		
		//Sell state ... /lemonaide/sell
		.state('sell', {
			url:'/sell',
			parent: 'lemonaide',
			templateUrl: 'templates/sell/sell.html',
			controller: 'SellController'
		})
		//Sell: Lemonaide sub-state ... /sell/lemonade
		//	If the sell state was written
		//	.state('lemonaide.sell') with no parent:'lemonaide'
		//	then the state below would have to be written
		//	.state('lemonaide.sell.lemonade')
		.state('sell.lemonade', {
			url: '/lemonade',
			templateUrl: 'templates/sell/lemonade.html',
			controller: function($scope) {
				$scope.info = {
					description: 'I love drinking this stuff',
					health: 'Little lemon ... lots of sugar!'
				};
			}
		})
		//Sell: Healthy sub-state ... /sell/healthy
		.state('sell.healthy', {
			url: '/healthy',
			templateUrl: 'templates/sell/healthy.html',
			controller: function($scope) {
				$scope.info = {
					description: 'An apple a day keeps the doctor away'
				};
			}
		})
		//Sell: Treat sub-state ... /sell/treat
		.state('sell.treat', {
			url: '/treat',
			templateUrl: 'templates/sell/treat.html',
			controller: function($scope) {
				$scope.info = {
					lifeSpan: -42
				};
			}
		})
		//Report state ... /report //lemonaide/reports/donors
		.state('reports', {
			url: '/reports',
			parent: 'lemonaide',
			templateUrl: 'templates/reports/reports.html',
			controller: 'ReportController',
			abstract: true
		})
			//Report: Sales sub-state ... /report/sales
			.state('reports.sales', {
				url: '/sales',
				templateUrl: 'templates/reports/sales.html',
				controller: 'ReportSalesController'
			})
			//Report: Donors sub-state ... /reports/donors
			.state('reports.donors', {
				url: '/donors',
				templateUrl: 'templates/reports/donors.html',
				resolve: {
					//Needed service for dealing with Philanthropist API
					philanthropistApiService: 'PhilanthropistApiService',

					//Returned donors
					philanthropists: function(philanthropistApiService) {
						//Returning a promise from the API Service
						return philanthropistApiService.getDonorsInformation();
					}
				},
				controller: 'ReportDonorsController'
			})
				//Report: Donors : Donor sub-state ... /reports/donors/:donor
				.state('reports.donors.donor', {
					url: '/:donor',
					templateUrl: 'templates/reports/donor.html',
					controller: function($scope, $stateParams, philanthropists){
						//Getting the specified donor via $stateParams 
						//	and resolved 'philanthropists' promise
						$scope.donor = _.find(philanthropists, function(donor) {
							return donor.id === Number($stateParams.donor);
						});
		        	}
				})
			//Report: Transactions sub-state ... /reports/transactions
			.state('reports.transactions', {
				url: '/transactions',
				templateUrl: 'templates/reports/transactions.html',
				resolve: {
					//Needed service for dealing with Transactions API
					transactionApiService: 'TransactionApiService',

					//Returned transactions
					transactions: function(transactionApiService) {
						//Returning a promise from the API Service
						return transactionApiService.getTransactions();
					}
				},				
				controller: 'ReportTransactionsController'
			})
		//Supplies state ... /lemonaide/supplies
		.state('supplies', {
			url: '/supplies',
			parent: 'lemonaide',
			templateUrl: 'templates/supplies.html',
			resolve: {
				//Needed service for dealing with Philanthropist API
				suppliesService: 'SuppliesService',

				//Returned supplies if needed
				supplies: function(suppliesService) {
					
					//Checking to see if the supplies are initialized
					if (!suppliesService.isInitialized()) {
						return suppliesService.initialize();
					}

				}
			},			
			controller: 'SuppliesController'
		});
}]);

//Previous home route
/*
		// .state('home', {
		// 	url:'/',
		// 	templateUrl: 'templates/home.html',
		// 	controller: 'HomeController'
		// })


		//Give state ... /give
		.state('home.give', {
			url: '/give',
			templateUrl: 'templates/give.html',
			controller: 'GiveController'
		})
*/

/*
		.state('home', {
			url:'/home',
			views: {
				'': {
					templateUrl: 'templates/home.html',
					controller: 'HomeController'
				},
				'header@': {
					templateUrl: 'templates/header.html',
					controller: 'HeaderController'
				},
				'footer@': {
					templateUrl: 'templates/footer.html'					
				},
				'give@home': {
					templateUrl: 'templates/give.html',
					controller: 'GiveController'
				}
			}
		})

*/

//Previous index.html
/*
		<!-- AngularJS Directive for template insertion -->
		<div id="content" ui-view></div>
		
		<!-- Footer named view -->
		<!-- div ui-view="footer"></div -->
*/

