/**
 * Transformer used to change the outgoing data to our own API
 *  (i.e. we will be changing outgoing parameter 'treat' to 'treats')
 **/
 app.factory('TransactionRequestTransformer', function() {
 	'use strict';
 	
 	/**
 	 * Returns a function that parses the data
 	 **/
 	return function(data, headers) {

 		//Need JSON.parse: Get a string when transforming
    	//data = JSON.parse(data);
        
        var transformedData = {
			healthySnack: data.transactionCount.healthySnack,
			treat: data.transactionCount.treats,
			largeLemonade: data.transactionCount.largeLemonade,
			mediumLemonade: data.transactionCount.mediumLemonade,
			totalLemonade: data.transactionLemonade,
			productTotal: data.transactionCountTotal,
			grossProfit: data.transactionCost
        };

    	//Returning transformed response
    	//	Needs to be serialized for the return
        return angular.toJson(transformedData);
	};
 });
