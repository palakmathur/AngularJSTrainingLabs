'use strict';

//Creating an angular app
window.app = angular.module('lemonadeApp', 
	['ui.router', 'app.filters', 'ngMessages', 'ngResource', 'restangular'])
		.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
				//Allows us to access state across all scopes
				$rootScope.$state = $state;
		        $rootScope.$stateParams = $stateParams;
			}])
		.config(['DistanceServiceProvider', function(DistanceServiceProvider) {
			DistanceServiceProvider.setLatitude(40.001947);
			DistanceServiceProvider.setLongitude(-75.278072);
		}])
		.config(['RestangularProvider', function(RestangularProvider) {
			//Specifying that all Restangular API interactions 
			//	will be off /data
			RestangularProvider.setBaseUrl('/data');
		}])
		.config(['RestangularProvider', function(RestangularProvider) {
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
		}]);

'use strict';

/**
 * Header Controller for the application header.
 **/
 app.controller('FooterController', 
 	['$scope', 'DistanceService', function($scope, DistanceService) {
 	
 	//Setting the page properties
 	$scope.headquarter = {
 		distance: ''
 	};

 	$scope.init = function() {
		var promiseKept = DistanceService.getDistance();

		promiseKept.then(function(distance) {
			$scope.headquarter.distance = distance;
		}, function(error) {
			console.log(error);
		});
 	};

 	$scope.init();

 }]);
'use strict';

/**
 * Give Form Controller for the form submission on the give page.
 **/
 app.controller('GiveFormController', 
 	['$scope', 'PhilanthropistApiService', function($scope, PhilanthropistApiService) {

 	//Setting the page properties
 	$scope.form = {
 		isNotSubmittable: false,
 		message: ''
 	};

 	//Form inputs: 
 	//	Need 'Email' defaulted for our select box
 	//	Everything else should be empty
 	$scope.giver = {
 		name: '',
 		phone: '',
 		address: '',
 		zipcode: '',
 		email: '',
 		contact: 'Email'
 	};

 	/**
 	 * Add Donor action invoked via submit event listener.
 	 **/
 	$scope.addDonor = function() {
 		var promiseKept = {};

 		if ($scope.giveForm.$valid) {
			promiseKept = PhilanthropistApiService.addDonor($scope.giver);

			promiseKept.then(function() {
				$scope.form.message = 'Thanks for donating';
			}, function() {
				$scope.form.message = 'No go: backend down - try again';
			});
 		} else {
			$scope.form.message = 'We cannot add you: ';
			generateFormError();
 		}
 	};

 	/**
 	 * Generates a simple error message for UI.
 	 */
 	var generateFormError = function() {
 		if ($scope.giveForm.giverName.$invalid) {
 			$scope.form.message += 'Please check your name input.';
 		} else if ($scope.giveForm.phone.$invalid) {
 			$scope.form.message += 'Please enter a phone number.';
 		} else if ($scope.giveForm.zipcode.$invalid) {
 			$scope.form.message += 'Please check your zipcode.';
 		} else if ($scope.giveForm.email.$invalid) {
 			$scope.form.message += 'Please check your email.';
 		}
 	};

 }]);
'use strict';

/**
 * Home Controller for the home route.
 **/
 app.controller('GiveController', 
 	['$scope', 'CurrentLocationService', function($scope, CurrentLocationService) {

 	//Setting the page properties
 	$scope.page = {
 		title: 'Give',
 		coords: ''
 	};

 	$scope.init = function() {
		var promiseKept = CurrentLocationService.getLocation();

		promiseKept.then(function(data) {
			$scope.page.coords = 'Latitude: ' + data.latitude + ' & Longitude: ' + data.longitude;
		}, function(error) {
			console.log(error);
		});
 	};

 	$scope.init();

 }]);
'use strict';

/**
 * Header Controller for the application header.
 **/
 app.controller('HeaderController', 
 	['$scope', function($scope) {
 	
 	//Setting the page properties
 	$scope.date = {
 		human: new Date(),
 		machine: new Date()
 	};

 }]);
'use strict';

/**
 * Home Controller for the home route.
 **/
 app.controller('HomeController', 
 	['$scope', function($scope) {
 	
 	//Setting the page properties
 	$scope.page = {
 		title: 'This one\'s on me'
 	};

 }]);
'use strict';

/**
 * Product Controller handles the interaction with the products.
 **/
app.controller('ProductController', 
	['$scope', 'TransactionService', function($scope, TransactionService) {
			
	$scope.updateQuantityAndCost = function() {
 		$scope.transaction.transactionQuantity = TransactionService.getCurrentTransactionQuantity();
 		$scope.transaction.transactionCost = TransactionService.getCurrentTransactionCost();
	};

	/**
 	 * Action that increments the quantity of large lemonades 
 	 *  sold in this transaction.
 	 **/
 	$scope.incrementLargeLemonade = function() {
 		TransactionService.incrementLargeLemonade();
 		$scope.transaction.largeLemonadeQuantity = TransactionService.getLargeLemonadeQuantity();
 		$scope.updateQuantityAndCost();
 	};

 	/**
 	 * Action that increments the quantity of medium lemonades 
 	 *   sold in this transaction.
 	 **/
 	$scope.incrementMediumLemonade = function() {
 		TransactionService.incrementMediumLemonade();
 		//We can use getters if we would like to
 		$scope.transaction.mediumLemonadeQuantity = TransactionService.getMediumLemonadeQuantity();
 		$scope.updateQuantityAndCost();
 	};

 	/**
 	 * Action that increments the quantity of healthy snacks 
 	 *   sold in this transaction.
 	 **/
 	$scope.incrementHealthySnack = function() {
 		//We can simply use the functions return value to set quantity
 		$scope.transaction.healthySnackQuantity = TransactionService.incrementHealthSnack();
 		$scope.updateQuantityAndCost();
 	};

 	/** 
 	 * Action that increments the quantity of treats sold in this
 	 *   transaction.
 	 **/
 	 $scope.incrementTreat = function() {
 		$scope.transaction.treatQuantity = TransactionService.incrementTreat();
 		$scope.updateQuantityAndCost();
 	};
}]);
'use strict';

/**
 * Report Controller for the reporting of sales.
 * @param philanthropists injected via angular-ui router
 **/
 app.controller('ReportDonorsController', 
 	['$scope', '$state', 'philanthropists', 'philanthropistApiService', function($scope, $state, philanthropists, philanthropistApiService) {

		 	//The donors who want to give to Alex's Lemonade Stand
		 	$scope.donors = philanthropists;

		 	//Specified search criteria
			$scope.search = {
				nameAndBestContact: ''
			};

		 	//Message booleans for UI
		 	$scope.messages = {
		 		donorRemovalError: false
		 	};

		 	/**
		 	 * Search criteria based on name or best contact info.
			 * Used within ng-repeat
		 	 * @param donor is passed in at each iteration
		 	 * @return donorMatched is true if a donor matched the search criteria
		 	 **/
		 	$scope.searchNameAndBestContact = function(donor) {
		 		var donorMatched = false;

		 		//-1 Means it can't be found
		 		if ( (donor.name.indexOf($scope.search.nameAndBestContact) !== -1 ) || 
		 			(donor.bestContact.indexOf($scope.search.nameAndBestContact) !== -1 )) {
		 			donorMatched = true;
		 		}

		 		//Need boolean evaluation of donor to see if 
		 		//	it should be included in UI
		 		return donorMatched;
		 	};

		 	/**
		 	 * Removes the donor from the list of donors.
		 	 **/
		 	$scope.deleteDonor = function(id) {

		 		//Interact with the philanthropist service 
		 		var promiseKept = philanthropistApiService.removeDonor(id);
		 		//As a note if we changed the $resource API to simply return $resource
		 		//	then we have to pass in an object
		 		//var promiseKept = philanthropistApiService.removeDonor({donor: id});

		 		//Bye-bye donor
		 		promiseKept.then(function(data) {
		 		//As a note if we changed the $resource API to simply return $resource
		 		//  then we have to grab the $promise object off of the promiseKept
		 		//promiseKept.$promise.then(function(data) {
		 			
		 			//Get the data in as a JS object
		 			$scope.donors = data.toJSON().philanthropists;
		 			
		 			$scope.messages.donorRemovalError = false;
		 			
		 			//Redirect back to complete list of donors
		 			$state.go('reports.donors');
		 		}, function() {
		 			//Shucks there was an error
		 			$scope.messages.donorRemovalError = true;
		 		});
		 	};

 }]);
'use strict';

/**
 * Report Sales Controller for the reporting of sales.
 **/
 app.controller('ReportSalesController', 
  ['$scope', function($scope) {

  $scope.report = {
    limit: 10,
    selectedReport: ''
  };

  $scope.setSelectedReport = function(report) {
    $scope.report.selectedReport = report;
  };

 	$scope.sales = [{
 		date: '1-1-2012',
 		quantity: '500',
 		netSale: '750',
 		costOfGoods: '400'
 	}, {
  		date: '2-1-2012',
 		quantity: '425',
 		netSale: '650',
 		costOfGoods: '300'			
 	}, {
  		date: '3-1-2012',
 		quantity: '300',
 		netSale: '450',
 		costOfGoods: '300'
 	}, {
  		date: '4-1-2012',
 		quantity: '600',
 		netSale: '750',
 		costOfGoods: '400'
 	}, {
  		date: '5-1-2012',
 		quantity: '100',
 		netSale: '250',
 		costOfGoods: '175'			
 	}, {
  		date: '6-1-2012',
 		quantity: '100',
 		netSale: '250',
 		costOfGoods: '150' 		 		 	
 	}, {
  		date: '7-1-2012',
 		quantity: '425',
 		netSale: '750',
 		costOfGoods: '400'			
 	}, {
  		date: '8-1-2012',
 		quantity: '300',
 		netSale: '450',
 		costOfGoods: '250'
 	}, {
  		date: '9-1-2012',
 		quantity: '650',
 		netSale: '850',
 		costOfGoods: '650'			
 	}, {
  		date: '10-1-2012',
 		quantity: '100',
 		netSale: '350',
 		costOfGoods: '250'
 	}, {
  		date: '11-1-2012',
 		quantity: '100',
 		netSale: '350',
 		costOfGoods: '250' 		 		 	
 	}, {
  		date: '12-1-2012',
 		quantity: '300',
 		netSale: '450',
 		costOfGoods: '250'			
 	}, {
 		date: '1-1-2013',
 		quantity: '300',
 		netSale: '550',
 		costOfGoods: '350'
 	}, {
  		date: '2-1-2013',
 		quantity: '650',
 		netSale: '750',
 		costOfGoods: '450'			
 	}, {
  		date: '3-1-2013',
 		quantity: '300',
 		netSale: '450',
 		costOfGoods: '250'
 	}, {
  		date: '4-1-2013',
 		quantity: '650',
 		netSale: '850',
 		costOfGoods: '650'
 	}, {
  		date: '5-1-2013',
 		quantity: '100',
 		netSale: '350',
 		costOfGoods: '150'			
 	}, {
  		date: '6-1-2013',
 		quantity: '100',
 		netSale: '250',
 		costOfGoods: '150' 		 		 	
 	}, {
  		date: '7-1-2013',
 		quantity: '500',
 		netSale: '350',
 		costOfGoods: '250'			
 	}, {
  		date: '8-1-2013',
 		quantity: '500',
 		netSale: '750',
 		costOfGoods: '550'
 	}, {
  		date: '9-1-2013',
 		quantity: '650',
 		netSale: '850',
 		costOfGoods: '550'			
 	}, {
  		date: '10-1-2013',
 		quantity: '300',
 		netSale: '550',
 		costOfGoods: '350'
 	}, {
  		date: '11-1-2013',
 		quantity: '100',
 		netSale: '350',
 		costOfGoods: '250' 		 		 	
 	}, {
  		date: '12-1-2013',
 		quantity: '150',
 		netSale: '450',
 		costOfGoods: '150'
 	}];

 }]);
'use strict';

/**
* Report Transactions Controller for today's sales.
**/
app.controller('ReportTransactionsController', 
  ['$scope', 'transactions', function($scope, transactions) {

      //The lemonade stand transactions for today
      $scope.transactions = transactions;

      /**
       * Delete specified transaction.
       *  Because we have the pTransactions as input we have 
       *  access to Restangular which created pTransactions with
       *  its getList(). Our transaction instance has access
       *  directly to Restangular's remove() API. remove() needs
       *  to be called off of a specific transaction, not the 
       *  collection as a whole. Therefore we will build no
       *  deleteTransaction() method into our TransactionAPIService.
       **/
      $scope.deleteTransaction = function() {
        //Creating a transaction reference to use within our callback
        var transaction = this.transaction;

        //Calling Restangualr's remove()
        transaction.remove().then(function() {
          //On success removing the transaction from our transactions list
          $scope.transactions = _.without($scope.transactions, transaction);
        });

      };
}]);
'use strict';

/**
 * Report Controller for the reporting of sales.
 **/
 app.controller('ReportController', 
 	['$scope', '$state', function($scope, $state) {

 	//Needed for deep state nesting of ui-router
 	//	Allows for easy .active class adding in UI
 	$scope.$state = $state;

 	//Setting the page properties
 	$scope.page = {
 		title: 'Reports'
 	};

 }]);
'use strict';

/**
 * Sell Controller for the sell route.
 * @inject error is the error constant service
 **/
 app.controller('SellController', 
 	['$scope', 'TransactionService', 'SuppliesService', 'error', function($scope, TransactionService, SuppliesService, error) {
 	
 	//Error constants for the page
 	var pageError = {
 		TOO_MANY_PRODUCTS: 'Too many products the transaction won\'t work'
 	};

 	//Setting the page properties
 	$scope.page = {
 		title: 'Sell'
 	};

 	//Transaction quantity variables
 	$scope.transaction = {
 		largeLemonadeQuantity: 0,
 		mediumLemonadeQuantity: 0,
 		healthySnackQuantity: 0,
 		treatQuantity: 0,
 		transactionQuantity: 0,
 		transactionCost: 0,
 		allowable: false
 	};

 	//Product costs
 	$scope.cost = {
 		largeLemonade: 0,
 		mediumLemonade: 0,
 		healthySnack: 0,
 		treat: 0
 	};

 	//Error message for the page
 	$scope.messages = {
 		error: ''
 	};

 	/**
 	 * Complete Order action received from complete order
 	 *	button being clicked on the view.
 	 **/
 	$scope.completeOrder = function() {
 		var promiseKept = {};

 		if ($scope.isTransactionAllowable()) {
 			//Storing our 'future' interaction
 			promiseKept = TransactionService.completeTransaction();
 			
 			//Update supplies on promise resolution
 			promiseKept.then(function() {
 				$scope.updateSupplies();
 				$scope.messages.error = error.NO_ERROR;
 			//Backend fail
 			}, function() {
 				$scope.messages.error = error.SYSTEM_ISSUE_ERROR;
 			});

 			//Update UI on fail or success
 			// Line blow is ie8 approved
 			//promiseKept['finally'](function() {
 			promiseKept.finally(function() {		
 				$scope.clearTransaction();
 			});

 		} else {

 			//Update UI if transaction isn't allowable
 			$scope.clearTransaction();
 			$scope.messages.error = pageError.TOO_MANY_PRODUCTS;
 		}
 	};

 	/**
 	 *	Verifies if the transaction can take place when
 	 *		the "Complete Order" button is pressed.
 	 **/
 	$scope.isTransactionAllowable = function() {
 		var allowable = false;

 		if (TransactionService.isTransactionInitialized() &&
 			SuppliesService.isProductAvailable(
 				TransactionService.getLemonadeQuantity(),
 				TransactionService.getHealthySnackQuantity(),
 				TransactionService.getTreatQuantity())) {
 			//The transaction can go through
 			allowable = true;
 		}

 		return allowable;
 	};

 	/**
 	 * Needed initialization of the controller.
 	 * 	- Make sure the Supplies Service is setup
 	 *	- Make sure the Transaction Service is setup
 	 **/
 	$scope.init = function() {
 		
 		//If the supplies service isn't setup ... set it up
 		if (!SuppliesService.isInitialized()) {
 			var suppliesPromiseKept = SuppliesService.initialize();

 			suppliesPromiseKept.then(function() {
 				console.log('supplies service setup');
 			});

 			// Line blow is ie8 approved
 			//promiseKept['catch'](function() {
 			suppliesPromiseKept.catch(function() {
 				console.log(error);
 				$scope.messages.error = error.SYSTEM_ISSUE_ERROR;
 			});

 		} 

 		//If the transaction service isn't setup ... set it up
 		if (!TransactionService.isTransactionInitialized()) {
 			var transactionPromiseKept = TransactionService.intializeTransaction();

 			transactionPromiseKept.then(function() {
 				$scope.cost.largeLemonade = TransactionService.getLargeLemonadeCost();
 				$scope.cost.mediumLemonade = TransactionService.getMediumLemonadeCost();
 				$scope.cost.healthySnack = TransactionService.getHealthySnackCost();
 				$scope.cost.treat = TransactionService.getTreatCost();
 			}, function(error) {
				console.log(error.SYSTEM_ISSUE_ERROR);
 			});
 		}
 	};

 	/**
 	 * Sets the available supplies left for purchase.
 	 **/
 	$scope.updateSupplies = function() {
 		//Sets the avaiable supplies 
		SuppliesService.setSupplies(
			TransactionService.getLemonadeQuantity(),
			TransactionService.getHealthySnackQuantity(),
			TransactionService.getTreatQuantity()
		);
 	};

 	/**
 	 * Action that clears out the entire transaction.
 	 **/
 	$scope.clearTransaction = function() {
 		TransactionService.clearCurrentTransaction();
 		$scope.transaction.largeLemonadeQuantity = TransactionService.getMediumLemonadeQuantity();
 		$scope.transaction.mediumLemonadeQuantity = TransactionService.getLargeLemonadeQuantity();
 		$scope.transaction.healthySnackQuantity = TransactionService.getHealthySnackQuantity();
 		$scope.transaction.treatQuantity = TransactionService.getTreatQuantity();
 		$scope.transaction.transactionQuantity = TransactionService.getCurrentTransactionQuantity();
 		$scope.transaction.transactionCost = TransactionService.getCurrentTransactionCost();
 	};

 	$scope.init();
 }]);
'use strict';

/**
 * Supplies Controller for the supplies route.
 **/
 app.controller('SuppliesController', 
 	['$scope', 'suppliesService', function($scope, suppliesService) {
 	
 	//Setting the page properties
 	$scope.page = {
 		title: 'Supplies'
 	};

 	//Actual quantities available
 	$scope.actual = {
 		lemonadeQuantity: suppliesService.getLemonadeQuantity(),
 		healthySnackQuantity: suppliesService.getHealthySnackQuantity(),
 		treatQuantity: suppliesService.getTreatQuantity(),
 	};

 	//Maximum level of quantities
 	$scope.maximum = {
 		lemonadeQuantity: 100,
 		healthySnackQuantity: 50,
 		treatQuantity: 50,
 	};

 }]);
'use strict';
/**
 *  Directive to be used across all page headers.
 **/
app.directive('lemonTitle', function() {
	return {
		restrict: 'AE',
    	replace: true,    
    	scope: true,
		template: '<h2>{{page.title}}</h2>'
	};
});
'use strict';
/**
 *  Directive to be used across all page headers.
 **/
app.directive('lemonReportListing', function() {
	
	var URL = [
		'/src/images/thumbsUp.png',
		'/src/images/smiley_face.jpg',
		'/src/images/hands_clapping.png'
	];

	return {
		//Only want attribute directive
		restrict: 'EA',  
		//Isolate scope
    	scope: {
    		//2 way binding on a report object
    		report: '=',
    		//Referencing a method on the parent scope
    		action: '&',
    		//Bringing in the one-way binding
    		limit: '@'
    	},
    	//Include user-defined HTML
    	transclude: true,
    	//We want to deal with an external template
		templateUrl: '/src/templates/directive/report-listing.html',
		controller: ['$scope', function($scope) {
				//var imageChoice = Math.round(Math.random()*2);
				//$scope.report.goodImage = URL[imageChoice];
				$scope.report.grossProfit = $scope.report.netSale - $scope.report.costOfGoods;
				$scope.report.profitable = $scope.report.grossProfit > 200 ? true : false;
				$scope.showSelected = function() {
					$scope.action({selectedReport: $scope.report});
				};
		}],
		link: function(scope, instElement) {
			
			var imageChoice;
			scope.$watch('limit', function() {
				imageChoice = Math.round(Math.random()*2);
				console.log('imageChoice' + imageChoice);
				scope.report.goodImage = URL[imageChoice];
			});
			

			instElement.bind('click', function() {
				instElement.parent().children().removeClass('selected');
				instElement.addClass('selected');
			});
		}
	};
});
'use strict';

/**
 *  Application filters
 **/

 /**
  * Show Date filter takes a date string, converst it to a new Date and
  *		then uppercases the date.
  **/
angular.module('app.filters', [])
	.filter('showDate', ['$filter', function($filter) {
		return function(item) {
			if (angular.isString(item)) {
				return $filter('date')(new Date(item), 'mediumDate').toUpperCase();
			}
		};
	}]);
'use strict';

/**
 * Application Constants.
 **/
 app.constant('error', {
 	'SYSTEM_ISSUE_ERROR': 'Sorry, we are having server issues',
 	'NO_ERRORS': '',
 	'DEPRECATED': 'This has been deprecated'
 });


'use strict';

/**
 * Service to handle interaction with Philanthropist API.
 * Utilizing ngResource for service interaction.
 **/
app.factory('PhilanthropistApiService', 
	['$resource', 'DonorsResponseTansformer', function($resource, DonorsResponseTansformer) {

	//A $resource object that serves as an interface to our back-end
	//	Includes transform for donor information
	var Philanthropist = $resource('/data/philanthropists/:donor', 
			//URL Parameters to add on every request
			{}, 
			//Actions object defining what we want to happen
			//	for specific $resource methods
			{
				'query': {
					method:'GET', 
					isArray:true,
					transformResponse: DonorsResponseTansformer
				}
			}
		);

	/**
	 * Gets all of the donors from the backend.
	 *	Abstraction over $resource.query().
	 * @return a promise object to be evaluated when complete
	 **/
	var getDonorsInformation = function() {

		return Philanthropist.query().$promise;
		//return Philanthropist.get({id:'hat', code:42}).$promise;
	};

	/**
	 * Adds a donor to the back-end. Renaming of save.
	 *	Abstraction over $resource.save()
	 * @return a promise object to be evaluated when complete
	 **/
	var addDonor = function(data) {

		//Will place the data in the body of the Ajax call
		return Philanthropist.save(data).$promise;

	};

	/**
	 * Removes a donor from the backend.
	 *	Abstraction over $resource.remove().
	 * @return a promise object to be evaluated when complete	 
	 **/
	var removeDonor = function(donorId) {

		//Setting donor allows us to have it as part of the URL
		//	because it is a named
		//	(i.e. /data/philanthropists/7)
		//	instead of a URL parameter
		//	(i.e. /data/philanthropists?donor=7)
		return Philanthropist.remove({donor: donorId}).$promise;

	};

	//API
	return {
		getDonorsInformation: getDonorsInformation,
		addDonor: addDonor,
		removeDonor: removeDonor
	};

	//As a note we could have just returned the $resource,
	//	This would change our API interaction as we would need
	//	to grab the $promise off the $resource object on our services
	/*
	return $resource('/data/philanthropists/:donor', 
		{}, 
		{
			'getDonorsInformation': {
				method:'GET', 
				isArray:true,
				transformResponse: DonorsResponseTansformer
			},
			'addDonor': {
				method: 'POST'
			},
			'removeDonor': {
				method: 'DELETE'
			}
		});
	*/


}]);
'use strict';

/**
 * Supplies API Service is the back-end interaction for supplies.
 * Utilizing module revealing pattern
 **/
app.factory('SuppliesApiService', 
	['$http', 'SuppliesResponseTransformer', function($http, SuppliesResponseTransformer) {

	/**
	 *  Get the initial supply quantities for the day.
	 **/
	var getSupplyQuantities = function() {
	 	return $http({
	 			method: 'GET', 
	 			url: '/data/initial-supplies',
	 			transformResponse: SuppliesResponseTransformer
	 		});
	};

	/**
	 * Get the costs of the individual supplies.
	 **/
	var getSupplyCosts = function() {
		return $http({
	 			method: 'GET', 
	 			url: '/data/cost.json'
	 		});
	};

	//API
	return {
		getSupplyQuantities: getSupplyQuantities,
		getSupplyCosts: getSupplyCosts
	};

}]);
'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('TransactionApiService', 
	['Restangular', 'error', function(Restangular, error) {

	var transactions = Restangular.all('transactions');

	/**
	 * Getting all the complete list of transactions from the backend.
	 * @return a promise to utilize 'future' returned information
	 **/
	var getTransactions = function() {
		return transactions.getList();
	};

	/**
	 * Adding a transactions to the backend.
	 * @param transaction object that has needs to be configured
	 *		configured in the restangular provider
	 * @return a promise to utilize 'future' returned information
	 **/
	var addTransaction = function(transaction) {
		return transactions.post(transaction);
	};

	/**
	 * @deprecated 
	 * Removes the transaction from the backend.
	 * @param id number of transaction to remove
	 **/
	var removeTransaction = function(id) {
		//Functionality within Restangular remove() called from controller
		alert(error.DEPRECATED + ' param:' + id);
	};

	//API
	return {
		getTransactions: getTransactions,
		addTransaction: addTransaction,
		removeTransaction: removeTransaction
	};

}]);
'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('CurrentLocationService', ['$q', function($q) {

	var deferred = $q.defer();

	//Possible error codes thrown via the geolocation API
	var errorTypeCodes = [
		'Unknown error',
		'Permission denied by user',
		'Position is not available',
		'Request timed out'
	];

	/**
	 * Gets the current location of the user.
	 * @return promiseKept is a promise that is fullfilled when the 
	 *		geolocation has been found
	 **/
	var getLocation = function() {

		navigator.geolocation.getCurrentPosition(resolveLocation, resolveError);

		return deferred.promise;

	};

	/**
	 * Place the location information on the screen.
	 * @param position an object containing coordinates of the location
	 **/
	var resolveLocation = function(position) {
        //Angular's handling of promises
  		deferred.resolve(position.coords);
	};

	/**
	 * Handles error information if the browser had a problem getting the current position.
	 * @param error an object containing a code and additional message information property 
	 **/
	var resolveError = function(error) {
		var errorMessage = errorTypeCodes[error.code];

		//Error codes 0 and 2 have extra message information wrapped into the error message
		if (error.code === 0 || error.code === 2) {
			errorMessage += ' ' + error.message;
		}

		//Angular's handling of promises: will return string error message
		deferred.reject('Geolocation error: ' + errorMessage);
	};

	return {
 		getLocation: getLocation
 	};

}]);
'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.provider('DistanceService', function() {
	//Position of where we want to get a distance from
	//	(i.e. Alex's Lemonade Stand Head Quarters)
	var latitude = 0;
	var longitude = 0;

	//A provider needs to return an object literal
	//	that exposes a $get method
	//Just like our factory function in the factory service
	return { 
		setLatitude: function(pLatitude) {
			latitude = pLatitude;
		},
		setLongitude: function(pLongitude) {
			longitude = pLongitude;
		},
		//We need to inject $q the $get function if we
		//	are planning on using it in our provider
		$get: ['$q', function($q) {

			var deferred = $q.defer();

			//Possible error codes thrown via the geolocation API
			var errorTypeCodes = [
				'Unknown error',
				'Permission denied by user',
				'Position is not available',
				'Request timed out'
			];

			/**
	 		 * Gets the distance from your current location to Alex's 
	 		 * LemonadeStand headquarters.
			 * @return promiseKept is a promise that is fullfilled when the 
			 *		geolocation has been found
			 **/
			var getDistance = function() {

				navigator.geolocation.getCurrentPosition(resolveDistance, resolveError);

				return deferred.promise;

			};

			/**
			 * Resolve distance between device location and lemonade stand headquarters.
			 * @param position an object containing coordinates of the location
			 **/
			var resolveDistance = function(position) {
				var latitude = position.coords.latitude;
        		var longitude = position.coords.longitude;
        		var distance = calculateDistance(latitude, longitude);
		        
		        //Angular's handling of promises
		  		deferred.resolve(distance);
			};

			/**
			 * Handles error information if the browser had a problem getting the current position.
			 * @param error an object containing a code and additional message information property 
			 **/
			var resolveError = function(error) {
				var errorMessage = errorTypeCodes[error.code];

				//Error codes 0 and 2 have extra message information wrapped into the error message
				if (error.code === 0 || error.code === 2) {
					errorMessage += ' ' + error.message;
				}

				//Angular's handling of promises: will return string error message
				deferred.reject('Geolocation error: ' + errorMessage);
			};

			/**
			 *  Takes 2 coordinates and returns the distance in kilometers between them.
			 *	@param startCoordinates is an object containing lat/lon
			 **/
			var calculateDistance = function(startLatitudeDegrees, startLongitudeDegrees) {
				//Starting latitude (i.e. device location)
				var startLatitudeRadians = degreesToRadians(startLatitudeDegrees);
				//Starting longitude (i.e. device location)
				var startLongitudeRadians = degreesToRadians(startLongitudeDegrees);
				//Finishing latitude (i.e. Alex's lemonade headquarters)
				var finishLatitudeRadians = degreesToRadians(latitude);
				//Finishing longitude (i.e. Alex's lemonade headquarters)
				var finishLongitudeRadians = degreesToRadians(longitude);

				//unit is kilometers
				var EARTH_RADIUS = 6371; 

				//Distance in kilometers from where your device is to Alex's headquarters
				//Spherical Law of Cosines equation
				var distanceInKM = Math.acos(Math.sin(startLatitudeRadians) * 
					Math.sin(finishLatitudeRadians) + Math.cos(startLatitudeRadians) * 
					Math.cos(finishLatitudeRadians) * 
					Math.cos(startLongitudeRadians - finishLongitudeRadians)) * EARTH_RADIUS;

				//We only want the integers off of the distance
				return parseInt(distanceInKM);
			};

			/** 
			 * Converts degrees to radians. 
			 **/
			var degreesToRadians = function(degrees) {
				var radians = (degrees * Math.PI) / 180;
				return radians;
			};

			return {
		 		getDistance: getDistance
		 	};
	}]};
});
'use strict';

/**
 * Supplies Service that aids in sale of lemonade.
 * @inject error is the error constant service 
 * Utilizing module revealing pattern
 **/
app.factory('SuppliesService', 
	['SuppliesApiService', 'error', function(SuppliesApiService, error) {

	var suppliesServiceInitialized = false;

	var quantity = {
		lemonade: 0,
		healthySnack: 0,
		treat: 0
	};

	var setSupplies = function(lemonadeQuantity, healthySnackQuantity, treatQuantity) {
		quantity.lemonade = quantity.lemonade - lemonadeQuantity;
		quantity.healthySnack = quantity.healthySnack - healthySnackQuantity;
		quantity.treat = quantity.treat - treatQuantity;
	};

	var initialize = function() {
	 	return SuppliesApiService.getSupplyQuantities()
	 		.then(function(resolved) {
		 		//$http service puts the resolved information on a 'data' object
		 		var data = resolved.data;
				if (resolved.data) {
					quantity.lemonade = data.lemonade;
					quantity.healthySnack = data.healthySnack;
					quantity.treat = data.treat;
					suppliesServiceInitialized = true;				
	 			}
		 	}, function() {
		 		console.log(error.SYSTEM_ISSUE_ERROR);
		 	});
	};

	var isProductAvailable = function(lemonadeQuantity, healthySnackQuantity, treatQuantity) {
		var available = false;

		if ( (quantity.lemonade >= lemonadeQuantity) && 
			(quantity.healthySnack >= healthySnackQuantity) &&
			(quantity.treat >= treatQuantity) ) {
				available = true;
			}

		return available;
	};

	var isInitialized = function() {
		return suppliesServiceInitialized;
	};

	var getLemonadeQuantity = function() {
		return quantity.lemonade;
	};

	var getHealthySnackQuantity = function() {
		return quantity.healthySnack;
	};

	var getTreatQuantity = function() {
		return quantity.treat;
	};

	return {
		initialize: initialize,
		isInitialized: isInitialized,
		isProductAvailable: isProductAvailable,
		setSupplies: setSupplies,
		getLemonadeQuantity: getLemonadeQuantity,
		getHealthySnackQuantity: getHealthySnackQuantity,
		getTreatQuantity: getTreatQuantity
	};
}]);
'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('TransactionService', 
	['TransactionApiService', 'SuppliesApiService', 'error', function(TransactionApiService, SuppliesApiService, error) {
		
	//Boolean to know if the transaction is ready to go
	var transactionInitialized = false;

 	//Healty Snack Cost 
	var healthySnackCost = 0;
	//Treats Cost
   	var treatCost = 0;
   	//Large Lemonade Cost
    var largeLemonadeCost = 0;
    //medium lemonade object
    var mediumLemonadeCost = 0;

    //Transaction Count holder
    var transactionCount = {
    	healthySnack: 0,
    	treats: 0,
    	mediumLemonade: 0,
    	largeLemonade: 0,
    };

    //Running total product count of the transaction
    var transactionCountTotal = 0;

    //Cost calculator for the transaction
    var transactionCost = 0;

 	/**
     * Adds up our current transaction cost.
     **/
    var addToTransacionCost = function(cost) {
    	transactionCost = transactionCost + cost;
    };

    /**
     * Adds up our current transaction cost.
     **/
    var addToTransacionQuantity = function() {
    	transactionCountTotal = transactionCountTotal + 1;
    };

 	/**
	 * Increments the private transaction.largeLemonade property.
	 * @return the large lemonade transaction count
	 **/
	var incrementLargeLemonade = function() {
		transactionCount.largeLemonade++;
		addToTransacionCost(largeLemonadeCost);
		addToTransacionQuantity();
		return transactionCount.largeLemonade;
	};

	/**
	 * Increments the private transaction.mediumLemonade property.
	 * @return the medium lemonade transaction count
	 **/
	var incrementMediumLemonade = function() {
		transactionCount.mediumLemonade++;
		addToTransacionCost(mediumLemonadeCost);
		addToTransacionQuantity();
		return transactionCount.mediumLemonade;
	};
	
	/**
	 * Increments the private transaction.incrementHealthSnack property.
	 * @return the healthy snack transaction count
	 **/
	var incrementHealthSnack = function() {
		transactionCount.healthySnack++;
		addToTransacionCost(healthySnackCost);
		addToTransacionQuantity();
		return transactionCount.healthySnack;
	};

	/**
	 * Increments the private transaction.incrementTreat property.
	 * @return the treats transaction count
	 **/
	var incrementTreat = function() {
		transactionCount.treats++;
		addToTransacionCost(treatCost);
		addToTransacionQuantity();
		return transactionCount.treats;
	};	   

	/**
	 * Clear Current Transaction.
	 **/
	var clearCurrentTransaction = function() {
		var x;
		for(x in transactionCount) {
			transactionCount[x] = 0;
		}
		//Resetting transactionCost
		transactionCost = 0;

		//Resetting transaction count
		transactionCountTotal = 0;
	};


	/**
	 * Get the current transaction cost.
	 * @return the transaction cost
	 **/
	var getCurrentTransactionCost = function() {
		return transactionCost;
	};

	/**
	 * Gets the current transaction quantity.
	 * @return the transaction quantity
	 **/
	var getCurrentTransactionQuantity = function() {
		return transactionCountTotal;
	};

	/**
	 * Get the lemonade quantity.
	 * @return the lemonade transaction quantity
	 **/
	var getLemonadeQuantity = function() {
		return transactionCount.mediumLemonade + 
			transactionCount.largeLemonade * 2;
	};

	/**
	 * Gets the medium lemonade quantity.
	 * @return the medium lemonade transaction quantity
	 **/
	var getMediumLemonadeQuantity = function() {
		return transactionCount.mediumLemonade;
	};

	/**
	 * Gets the large lemonade quantity.
	 * @return the large lemonade transaction quantity
	 **/
	var getLargeLemonadeQuantity = function() {
		return transactionCount.largeLemonade;
	};

	/**
	 * Get the healty snack quantity.
	 * @return the healthy snack transaction quantity
	 **/
	var getHealthySnackQuantity = function() {
		return transactionCount.healthySnack;
	};

	/**
	 * Get the treat quantity.
	 * @return the treats transaction quantity
	 **/
	var getTreatQuantity = function() {
		return transactionCount.treats;
	};

	/**
	 * Gets the large lemonade cost.
	 * @return the large lemonade cost
	 **/
	var getLargeLemonadeCost = function() {
		return largeLemonadeCost;
	};

	/**
	 * Gets the medium lemonade cost.
	 * @return the medium lemonade cost
	 **/
	var getMediumLemonadeCost = function() {
		return mediumLemonadeCost;
	};

	/**
	 * Gets the healthy snack cost.
	 * @return the healthy snack cost
	 **/
	var getHealthySnackCost = function() {
		return healthySnackCost;
	};

	/**
	 * Gets the treat cost.
	 * @return the treat cost
	 **/
	var getTreatCost = function() {
		return treatCost;
	};

	/**
	 * Exposes if the transaction has been initialized.
	 * @return boolean of transation state
	 **/
	var isTransactionInitialized = function() {
		return transactionInitialized;
	};

	/**
	 * Get the transaction service all setup.
	 **/
	var intializeTransaction = function() {

		return SuppliesApiService.getSupplyCosts()
			.then(function(resolved) {
				var data = resolved.data;

		  		healthySnackCost = data.healthySnack;
			  	treatCost = data.treat;
			  	mediumLemonadeCost = data.mediumLemonade;
			  	largeLemonadeCost = data.largeLemonade;
			  	transactionInitialized = true; 

			}, function() {
				console.log(error.SYSTEM_ISSUE_ERROR);
			});

	};

	/**
	 * Complete's the transaction interaction.
	 * @return promise api from TransactionApiService
	 **/
	var completeTransaction = function() {
		
		//Creating a transaction object to pass through
		var transaction = {
			transactionLemonade: getLemonadeQuantity(),
			transactionCount: transactionCount,
			transactionCountTotal: transactionCountTotal,
			transactionCost: transactionCost
		};
		
		return TransactionApiService.addTransaction(transaction);
	};

 	return {
		intializeTransaction: intializeTransaction,
		isTransactionInitialized: isTransactionInitialized,
		incrementLargeLemonade: incrementLargeLemonade,
		incrementMediumLemonade: incrementMediumLemonade,
		incrementHealthSnack: incrementHealthSnack,
		incrementTreat: incrementTreat,
		clearCurrentTransaction: clearCurrentTransaction,
		completeTransaction: completeTransaction,
		getCurrentTransactionQuantity: getCurrentTransactionQuantity,
		getCurrentTransactionCost: getCurrentTransactionCost,
		getLemonadeQuantity: getLemonadeQuantity,
		getMediumLemonadeQuantity: getMediumLemonadeQuantity,
		getLargeLemonadeQuantity: getLargeLemonadeQuantity,
		getHealthySnackQuantity: getHealthySnackQuantity,
		getTreatQuantity: getTreatQuantity,
		getLargeLemonadeCost: getLargeLemonadeCost,
		getMediumLemonadeCost: getMediumLemonadeCost,
		getHealthySnackCost: getHealthySnackCost,
		getTreatCost: getTreatCost
 	};

}]);
/**
 * Transformer used to change the incoming data to our own API
 *  (i.e. we will be changing incoming parameter 'contact' to 'bestContact')
 **/
 app.factory('DonorsResponseTansformer', function() {
 	'use strict';
 	
 	/**
 	 * Returns a function that parses the data
 	 **/
 	return function(data) {

 		//Need JSON.parse: Get a string when transforming
    	var transformedData = JSON.parse(data);

    	if (transformedData.length) {
    		
    		//Using underscore to map new response
    		transformedData = _.map(transformedData, function(item) {
    			return {
                    id: item.id,
    				name: item.name,
    				phone: item.phone,
    				address: item.address,
    				zipcode: item.zipcode,
    				email: item.email,
    				bestContact: item.contact
    			};
    		});

    	}

    	//Returning transformed response
        return transformedData;
	};
 });

/**
 * Transformer used to change the incoming data to our own API
 *  (i.e. we will be changing incoming parameter 'lemonadeQuantity' to 'lemonade')
 **/
 app.factory('SuppliesResponseTransformer', function() {
 	'use strict';
 	
 	/**
 	 * Returns a function that parses the data
 	 **/
 	return function(data) {

 		//Need JSON.parse: Get a string when transforming
    	data = JSON.parse(data);
        
        var transformedData = {
            lemonade: data.lemonadeQuantity,
            healthySnack: data.healthySnackQuantity,
            treat: data.treatQuantity
        };

    	//Returning transformed response
        return transformedData;
	};
 });

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


