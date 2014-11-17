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