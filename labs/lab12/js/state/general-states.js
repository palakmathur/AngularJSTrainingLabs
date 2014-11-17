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
					templateUrl: 'templates/header.html',
					controller: 'HeaderController'
				},
				'footer': {
					templateUrl: 'templates/footer.html',
					controller: 'FooterController'					
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

