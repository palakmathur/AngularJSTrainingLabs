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
			});
}]);
