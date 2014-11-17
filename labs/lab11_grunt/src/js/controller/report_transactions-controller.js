'use strict';

/**
* Report Transactions Controller for today's sales.
**/
app.controller('ReportTransactionsController', 
  ['$scope', 'transactions',
    function($scope, transactions) {

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