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
		});
}]);


