'use strict';

/**
 * Configure our application to give us basic routing
 **/
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	//Take me to the lemonaide route
	$urlRouterProvider.otherwise('/lemonaide/');

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
					templateUrl: '/src/templates/header.html',
					controller: 'HeaderController'
				},
				'footer': {
					templateUrl: '/src/templates/footer.html',
					controller: 'FooterController'					
				}
			}			
		})
		//home state ... /lemonaide/home
		.state('home', {
			url:'/',
			parent: 'lemonaide',
			templateUrl: '/src/templates/home.html',
			controller: 'HomeController'
		})
		//Give state ... /lemonaide/give
		.state('give', {
			url: '/give',
			parent: 'lemonaide',
			templateUrl: '/src/templates/give.html',
			controller: 'GiveController'
		})		
		//Supplies state ... /lemonaide/supplies
		.state('supplies', {
			url: '/supplies',
			parent: 'lemonaide',
			templateUrl: '/src/templates/supplies.html',
			resolve: {
				//Needed service for dealing with Philanthropist API
				suppliesService: 'SuppliesService',

				//Returned supplies if needed
				supplies: ['suppliesService', function(suppliesService) {
					
					//Checking to see if the supplies are initialized
					if (!suppliesService.isInitialized()) {
						return suppliesService.initialize();
					}

				}]
			},			
			controller: 'SuppliesController'
		});
}]);


'use strict';

/**
 * Configure our application to give us basic routing
 **/
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('/lemonaide/reports', '/lemonaide/reports/sales');

	$stateProvider
		//Report state ... /report //lemonaide/reports/donors
		.state('reports', {
			url: '/reports',
			parent: 'lemonaide',
			templateUrl: '/src/templates/reports/reports.html',
			controller: 'ReportController',
			abstract: true
		})
			//Report: Sales sub-state ... /report/sales
			.state('reports.sales', {
				url: '/sales',
				templateUrl: '/src/templates/reports/sales.html',
				controller: 'ReportSalesController'
			})
			//Report: Donors sub-state ... /reports/donors
			.state('reports.donors', {
				url: '/donors',
				templateUrl: '/src/templates/reports/donors.html',
				resolve: {
					//Needed service for dealing with Philanthropist API
					philanthropistApiService: 'PhilanthropistApiService',

					//Returned donors
					philanthropists: ['philanthropistApiService', function(philanthropistApiService) {
						//Returning a promise from the API Service
						return philanthropistApiService.getDonorsInformation();
					}]
				},
				controller: 'ReportDonorsController'
			})
				//Report: Donors : Donor sub-state ... /reports/donors/:donor
				.state('reports.donors.donor', {
					url: '/:donor',
					templateUrl: '/src/templates/reports/donor.html',
					controller: ['$scope', '$stateParams', 'philanthropists', function($scope, $stateParams, philanthropists){
						//Getting the specified donor via $stateParams 
						//	and resolved 'philanthropists' promise
						$scope.donor = _.find(philanthropists, function(donor) {
							return donor.id === Number($stateParams.donor);
						});
		        	}]
				})
			//Report: Transactions sub-state ... /reports/transactions
			.state('reports.transactions', {
				url: '/transactions',
				templateUrl: '/src/templates/reports/transactions.html',
				resolve: {
					//Needed service for dealing with Transactions API
					transactionApiService: 'TransactionApiService',

					//Returned transactions
					transactions: ['transactionApiService', function(transactionApiService) {
						//Returning a promise from the API Service
						return transactionApiService.getTransactions();
					}]
				},				
				controller: 'ReportTransactionsController'
			});
}]);

'use strict';

/**
 * Configure our "Sell" page application routing
 **/
app.config(['$stateProvider', function($stateProvider) {
	$stateProvider	
		//Sell state ... /lemonaide/sell
		.state('sell', {
			url:'/sell',
			parent: 'lemonaide',
			templateUrl: '/src/templates/sell/sell.html',
			controller: 'SellController'
		})
		//Sell: Lemonaide sub-state ... /sell/lemonade
		//	If the sell state was written
		//	.state('lemonaide.sell') with no parent:'lemonaide'
		//	then the state below would have to be written
		//	.state('lemonaide.sell.lemonade')
		.state('sell.lemonade', {
			url: '/lemonade',
			templateUrl: '/src/templates/sell/lemonade.html',
			controller: ['$scope', function($scope) {
				$scope.info = {
					description: 'I love drinking this stuff',
					health: 'Little lemon ... lots of sugar!'
				};
			}]
		})
		//Sell: Healthy sub-state ... /sell/healthy
		.state('sell.healthy', {
			url: '/healthy',
			templateUrl: '/src/templates/sell/healthy.html',
			controller: ['$scope', function($scope) {
				$scope.info = {
					description: 'An apple a day keeps the doctor away'
				};
			}]
		})
		//Sell: Treat sub-state ... /sell/treat
		.state('sell.treat', {
			url: '/treat',
			templateUrl: '/src/templates/sell/treat.html',
			controller: ['$scope', function($scope) {
				$scope.info = {
					lifeSpan: -42
				};
			}]
		});
}]);


