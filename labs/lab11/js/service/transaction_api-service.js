'use strict';

/**
 * Transaction Service that aids in sale of lemonade.
 * Utilizing module revealing pattern
 **/
app.factory('TransactionApiService', 
	['$resource', 'TransactionRequestTransformer',
		function($resource, TransactionRequestTransformer) {

	var Transaction = $resource('/data/transactions/:transaction',
		{},
		{
			'save': {
				method:'POST', 
				transformRequest: TransactionRequestTransformer
			}			
		}

	);

	/**
	 * Getting all the complete list of transactions from the backend.
	 * @return a promise to utilize 'future' returned information
	 **/
	var getTransactions = function() {
		return Transaction.query().$promise;
	};

	/**
	 * Adding a transactions to the backend.
	 * @param transaction object that has needs to be transformed
	 *	- done through transformRequest above
	 * @return a promise to utilize 'future' returned information
	 **/
	var addTransaction = function(transaction) {
		return Transaction.save(transaction).$promise;
	};

	/**
	 * @deprecated 
	 * Removes the transaction from the backend.
	 * @param id number of transaction to remove
	 **/
	var removeTransaction = function(transactionId) {
		return Transaction.remove({transaction: transactionId}).$promise;
	};

	//API
	return {
		getTransactions: getTransactions,
		addTransaction: addTransaction,
		removeTransaction: removeTransaction
	};

}]);