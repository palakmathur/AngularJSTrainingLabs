/**
 * Transformer used to change the incoming data to our own API
 *  (i.e. we will be changing incoming parameter 'lemonadeQuantity' to 'lemonade')
 **/
 app.factory('SuppliesResponseTransformer', function() {
 	'use strict';
 	
 	/**
 	 * Returns a function that parses the data
 	 **/
 	return function(data) {

 		//Need JSON.parse: Get a string when transforming
    	data = JSON.parse(data);
        
        var transformedData = {
            lemonade: data.lemonadeQuantity,
            healthySnack: data.healthySnackQuantity,
            treat: data.treatQuantity
        };

    	//Returning transformed response
        return transformedData;
	};
 });
