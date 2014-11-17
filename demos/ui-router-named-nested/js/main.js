'use strict';

var app = angular.module('demo', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('app',{
		url: '/',
		views: {
			'header': {
				templateUrl: '/templates/partials/header.html'
			},
			'content': {
				templateUrl: '/templates/partials/content.html'	
			},
			'footer': {
				templateUrl: '/templates/partials/footer.html'
			}
		}
	})

	.state('app.dashboard', {
		url: 'dashboard',
		views: {
			'content@': {
				templateUrl: 'templates/dashboard.html',
				controller: 'DashboardController'
			}
		}
		
	})
	
	.state('app.campaigns', {
		url: 'campaigns',
		views: {
			'content@': {
				templateUrl: 'templates/campaigns.html',
				controller: 'CampaignController'
			}
		}
		
	})
	
	.state('app.subscribers', {
		url: 'subscribers',
		views: {
			'content@': {
				templateUrl: 'templates/subscribers.html',
				controller: 'SubscriberController'		
			}
		}
		
	})
	.state('app.subscribers.detail', {
		url: '/:id',
		/*
		templateUrl: 'templates/partials/subscriber-detail.html',
		controller: 'SubscriberDetailController'
		*/
		
		views: {
			'detail@app.subscribers': {
				templateUrl: 'templates/partials/subscriber-detail.html',
				controller: 'SubscriberDetailController'		
			}
		}
		
	});
	
});

app.controller('DashboardController', function($scope) {
    
});

app.controller('CampaignController', function($scope) {
    
});

app.controller('SubscriberController', function($scope, SubscribersService) {
    $scope.subscribers = SubscribersService.list();
    //$scope.
});

app.controller('SubscriberDetailController', function($scope, $stateParams, SubscribersService) {
    $scope.selected = SubscribersService.find($stateParams.id);
});

app.factory('SubscribersService',function(){
	var subscribers = [{id: 1, name:'Craig McKeachie',email: 'craig@test.com', description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, repellendus facere expedita, magni cumque, voluptas vero nulla fugit enim ullam repellat earum vitae. Porro repellendus, officia quasi, alias numquam commodi.'},{id: 2, name:'John Doe',email: 'johndoe@gmail.com', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore magnam nostrum officiis dolor delectus ipsa magni error culpa, autem sit, perferendis eligendi officia quod amet perspiciatis dignissimos omnis molestias tempore.'}];

	return {
		list: function(){
			return subscribers;
		},
		find: function(id){
			return _.find(subscribers,function(subscriber){
				return subscriber.id == id;
			})
		}

	}
});


