/**
 * Transformer used to change the incoming data to our own API
 *  (i.e. we will be changing incoming parameter 'contact' to 'bestContact')
 **/
 app.factory('DonorsResponseTansformer', function() {
 	'use strict';
 	
 	/**
 	 * Returns a function that parses the data
 	 **/
 	return function(data) {

 		//Need JSON.parse: Get a string when transforming
    	var transformedData = JSON.parse(data);

    	if (transformedData.length) {
    		
    		//Using underscore to map new response
    		transformedData = _.map(transformedData, function(item) {
    			return {
                    id: item.id,
    				name: item.name,
    				phone: item.phone,
    				address: item.address,
    				zipcode: item.zipcode,
    				email: item.email,
    				bestContact: item.contact
    			};
    		});

    	}

    	//Returning transformed response
        return transformedData;
	};
 });
