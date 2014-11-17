'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('TransactionService', 
	['TransactionApiService', 'SuppliesApiService', 'error',
		function(transactionApiService, suppliesApiService, error) {
		
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

		return suppliesApiService.getSupplyCosts()
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
		
		return transactionApiService.addTransaction(transaction);
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