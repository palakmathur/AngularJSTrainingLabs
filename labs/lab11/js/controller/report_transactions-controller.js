'use strict';

/**
* Report Transactions Controller for today's sales.
**/
app.controller('ReportTransactionsController', 
  ['$scope', 'transactions', 'TransactionApiService', 'errors',
    function($scope, pTransactions, TransactionApiService, errors) {

      //The lemonade stand transactions for today
      $scope.transactions = pTransactions;

      /** 
       * Deleting a transaction selected by the user.
       **/
      $scope.deleteTransaction = function(id) {
        //The transaction id to delete
        var transactionToDelete = id;
        //Index of transaction to splice
        var deleteIndex;
        //Storing reference to transactions to use out of scope
        var transactions = this.transactions;
        //Creating a promise to remove transactions
        var promiseKept = TransactionApiService.removeTransaction(id);
        
        promiseKept.then(function() {
          //Using underscore each for iteration
          _.each(transactions, function(item, index) {
            //Finding the correct index based on item.id comparison
            if (item.id === transactionToDelete) {
              deleteIndex = index;
            }
          });

          //Splicing item
          //  Can't make a copy and remove because we need to hold the same
          //  array in memory. JavaScript splice doesn't return a copy but
          //  works on actual array.
          transactions.splice(deleteIndex, 1);

        }, function() {
          console.log('Error: ' + errors.SYSTEM_ISSUE_ERROR);
        }); 
      };
}]);