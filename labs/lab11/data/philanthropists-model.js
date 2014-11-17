/** 
 * Philanthropists Model.
 **/
(function() {
	'use strict';

	//List of donors
	var philanthropists = [{
				'id': 1,
				'name': 'Kamren Z', 
				'phone': '(877) 629-5631', 
				'address': '',
				'zipcode': '80301',
				'email': 'kamren@developintelligence.com',
				'contact': 'Phone'
			}];

	/**
	 * Gets an individual philanthropist.
	 * @param id is the id number given to the donor.
	 * @return the appropriate donor
	 **/
	exports.getPhilanthropist = function(id) {
		var count = philanthropists.length;
		var philanthropist = '';

		//Finding the appropriate donor
		while(count--) {
			if (philanthropists[count].id === id) {
				philanthropist = philanthropists[count];
			}
		} 

		return philanthropist;
	};

	/**
	 * Gets all philanthropists.
	 * @returns all the donors
	 **/
	exports.getPhilanthropists = function() {
		return philanthropists;
	};

	/**
	 * Adds a donor to philanthropists supplies.
	 * @param object of supplies to set
	 * @return the donor id number
	 **/
	exports.addPhilanthropist = function(pDonor) {
		
		//Adding an empty address if no address was given
		if (!pDonor.address) {
			pDonor.address = '';
		}

		//Simply incrementing the philanthropist id
		//	No deleting allowed :)
		pDonor.id = createPhilanthropistId();

		//Pushing the donor on the philanthropists object
		philanthropists.push(pDonor);
		return pDonor.id;
	};

	/**
	 * Removes the donor from the list.
	 **/
	exports.removePhilanthropist = function(id) {

		console.log('philanthropists length before:' + philanthropists.length);
		var count = philanthropists.length;
		var toRemoveIndex = 0;

		//Finding the appropriate donor
		while(count--) {
			if (philanthropists[count].id == id) {
				toRemoveIndex = count;
			}
		} 
		console.log('toRemoveIndex: ' + toRemoveIndex);
		philanthropists.splice(toRemoveIndex, 1);
		console.log('philanthropists length after:' + philanthropists.length);
	};

	/**
	 * Creates a philanthropist id.
	 * @return the new id for the donor
	 **/
	var createPhilanthropistId = function() {
		var count = philanthropists.length;
		var id = 0;

		//Finding the appropriate donor
		while(count--) {
			if (philanthropists[count].id > id) {
				id = philanthropists[count].id + 1;
			}
		} 
		if (philanthropists.length === 0) {
			console.log('It\'s zero');
			id = 1;
		}

		return id;
	};

}());
