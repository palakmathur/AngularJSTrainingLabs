'use strict';

//List of supply quantities
var supplies = {
			'lemonadeQuantity': 4, 
			'healthySnackQuantity': 2, 
			'treatQuantity' : 3
		};

/**
 * Gets supplies.
 **/
exports.getSupplies = function() {
	return supplies;
};

/**
 * Sets supplies.
 * @param object of supplies to set
 **/
exports.setSupplies = function(pSupplies) {
	supplies.lemonadeQuantity = pSupplies.lemonadeQuantity;
	supplies.treatQuantity = pSupplies.treatQuantity;
	supplies.healthySnackQuantity = pSupplies.healthySnackQuantity;
	return supplies;
};
