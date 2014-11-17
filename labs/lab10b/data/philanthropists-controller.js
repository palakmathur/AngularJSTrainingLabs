/**
 * Philanthropist Controller that handles philanthropists route.
 **/
module.exports.controller = function(app) {
	'use strict';

	//Our Philanthropist Model
	var philanthropist = require('./philanthropists-model.js');

	/**
	 * Get all the philanthropists.
	 * Responds with a list of all philanthropist entries.
	 **/
	app.get('/data/philanthropists', function(req, res) {
		res.json(philanthropist.getPhilanthropists());
	});

	/**
	 * Get a specific philanthropist.
	 **/
	 app.get('/data/philanthropists/:id', function(req, res) {
	 	console.log('MADE IT!');
	 	//Dynamic URL parameter
	 	var id = req.params.id;

	 	//Get appropriate donor
	 	var donor = philanthropist.getPhilanthropist(Number(id));
	 	
	 	//If we found a donor send info back
	 	if (donor) {
	  		
	  		res.send({
				success: true, 
				philanthropist:donor
			});			

	  	//If no donor found send error
	 	} else {

	 		res.send({
				success: false, 
				error:'Could not find the philanthropist.'
			});	

	 	}
	 });

	/**
	 * Creating a registry of people donating money to our foundation.
	 **/
	app.post('/data/philanthropists', function(req, res) {
		if (req.body && req.body.name && req.body.phone &&
				req.body.zipcode && req.body.email) {

	  		var key = philanthropist.addPhilanthropist(req.body);
	  		res.send({
	  			success: true,
	  			url: '/data/philanthropists/' + key
	  		});

		} else {

			res.send({
				success: false, 
				error:'Could not save the data.'
			});

	 	}
	});

	/**
	 * Delete a donor resource.
	 **/
	app.delete('/data/philanthropists/:id', function(req, res) {
		//Dynamic URL parameter
	 	var id = req.params.id;

		philanthropist.removePhilanthropist(Number(id));

		res.send({
			success: true,
			philanthropists: philanthropist.getPhilanthropists()
		});	
	});

};
