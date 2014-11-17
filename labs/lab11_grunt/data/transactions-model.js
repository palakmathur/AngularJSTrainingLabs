/** 
 * Philanthropists Model.
 **/
(function() {
	'use strict';

	//List of donors
	var transactions = [{
				'id': 1,
				'timeStamp': '1409177967968',
				'healthySnack': 0, 
				'treat': 0,
				'largeLemonade': 0, 
				'mediumLemonade': 0,
				'totalLemonade': 0,
				'productTotal': 0,
				'grossProfit': 0
			}];

	/**
	 * Gets all transactions.
	 * @returns all the transactions
	 **/
	exports.getTransactions = function() {
		return transactions;
	};

	/**
	 * Adds a transaction.
	 * @param pTransaction object to be set
	 * @return the transaction id number
	 **/
	exports.addTransaction = function(pTransaction) {
		
		//Adding an empty address if no address was given
		pTransaction.timeStamp = Date.now();

		//Simply incrementing the philanthropist id
		//	No deleting allowed :)
		pTransaction.id = createTransactionId();

		//Pushing the donor on the philanthropists object
		transactions.push(pTransaction);
		return pTransaction.id;
	};

	/** 
	 * Removes a transaction from the record.
	 **/
	exports.removeTransaction = function(id) {
		var count = transactions.length;
		var toRemoveIndex = 0;

		//Finding the appropriate donor
		while(count--) {
			if (transactions[count].id == id) {
				toRemoveIndex = count;
			}
		} 

		transactions.splice(toRemoveIndex, 1);
	};

	/**
	 * Creates a transaction id.
	 * @return the new id for the transaction
	 **/
	var createTransactionId = function() {
		var count = transactions.length;
		var id = 0;

		//Finding the appropriate transaction
		while(count--) {
			if (transactions[count].id > id) {
				id = transactions[count].id + 1;
			}
		} 
		if (transactions.length === 0) {
			id = 1;
		}

		return id;
	};

}());
