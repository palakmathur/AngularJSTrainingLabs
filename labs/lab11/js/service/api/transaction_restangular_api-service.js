'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('TransactionApiService', 
	['Restangular', 'error',
		function(Restangular, error) {

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