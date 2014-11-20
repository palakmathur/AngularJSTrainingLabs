'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('TransactionService', [function() {
 	//Healty Snack Cost 
	var healthySnackCost= 5;
	//Treats Cost
   	var treatCost = 5;
   	//Large Lemonade Cost
    var largeLemonadeCost = 5;
    //medium lemonade object
    var mediumLemonadeCost = 5;

    //Transaction Count holder
    var transaction = {
      largeLemonadeQty: 0,
      mediumLemonadeQty: 0,
      healthySnackQty: 0,
      treatQty: 0,
      transactionQty: 0,
      transactionCost: 0,

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
	 * Initialize the transaction.
	 * @pHealthySnackCost healthy snack cost
	 * @pTreatCost treat cost
	 * @pMediumLemonadeCost medium lemonade cost
	 * @pLargeLemonadeCost large lemonade cost
	 **/
	var intializeTransaction = function(pHealthySnackCost, pTreatCost, pMediumLemonadeCost, pLargeLemonadeCost) {
		healthySnackCost = pHealthySnackCost;
   		treatCost = pTreatCost;
   		mediumLemonadeCost = pMediumLemonadeCost;
    	largeLemonadeCost = pLargeLemonadeCost;
	};

 	return {
		intializeTransaction: intializeTransaction,
		incrementLargeLemonade: incrementLargeLemonade,
		incrementMediumLemonade: incrementMediumLemonade,
		incrementHealthSnack: incrementHealthSnack,
		incrementTreat: incrementTreat,
		clearCurrentTransaction: clearCurrentTransaction,
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