/**
 * Transactions Controller that handles transactions route.
 **/
module.exports.controller = function(app) {
	'use strict';

	//Our Transaction Model
	var transaction = require('./transactions-model.js');

	/**
	 * Get all the transactions.
	 * Responds with a list of all transactions.
	 **/
	app.get('/data/transactions', function(req, res) {
		res.json(transaction.getTransactions());
	});

	/**
	 * Creating a registry transactions for today.
	 **/
	app.post('/data/transactions', function(req, res) {

  		var key = transaction.addTransaction(req.body);
  		res.send({
  			success: true,
  			url: '/data/addTransaction/' + key
  		});

	});

	/**
	 * Deleting a transaction from the records.
	 **/
	app.delete('/data/transactions/:id', function(req, res) {
		console.log('here');
		var id = req.params.id;

		transaction.removeTransaction(Number(id));

		res.send({
			success: true,
			transactions: transaction.getTransactions()
		});

	});

};
