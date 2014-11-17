'use strict';

/**
 * Urban Center constructor function.
 **/
function UrbanCenter(numOfPeople) {
  this.numOfPeople = numOfPeople;
}

/** 
 * Urban Center prototype object.
 **/
UrbanCenter.prototype = {
  constructor: UrbanCenter,
  getNumOfPeople: function() {
    return this.numOfPeople;
  },
  toString: function() {
    return 'Urban Center with ' + this.numOfPeople + ' people';
  }
};

/**
 * City constructor function.
 **/
function City(numOfPeople, hasMayor) {
  UrbanCenter.call(this, numOfPeople);
  this.hasMayor = hasMayor;
}

/** 
 * City prototype object.
 **/
City.prototype = Object.create(UrbanCenter.prototype);
City.prototype.constructor  = City;

//city instance and logging
var city = new City(100000, true);
console.log('Population: ' + city.getNumOfPeople());
console.log('city toString: ' + city.toString());
console.log('Is city an instance of City: ' + (city instanceof City));
console.log('Is city an instance of UrbanCenter: ' + (city instanceof UrbanCenter));
console.log('Is city an instance of Object: ' + (city instanceof Object));
console.log('What is the city constructor: ' + (city.constructor === City));
//city doesn't own getNumOfPeople
console.log('Does city has own property getNumOfPeople: ' + (city.hasOwnProperty('getNumOfPeople')));
//getNumOfPeople method is in the city object
console.log('Is getNumOfPeople in city: ' + ('getNumOfPeople' in city));
//City.prototype doesn't own getNumOfPeople
console.log('Does city prototype has own property getNumOfPeople: ' + Object.getPrototypeOf(city).hasOwnProperty('getNumOfPeople'));
console.log('Does city prototype has own property getNumOfPeople: ' + City.prototype.hasOwnProperty('getNumOfPeople'));
console.log('Does city prototype has own property getNumOfPeople: ' + city.__proto__.hasOwnProperty('getNumOfPeople'));
console.log('Does city have a mayor: ' + city.hasMayor);


//city instance and logging
var urbanCenter = new UrbanCenter(111000);
console.log('Population: ' + urbanCenter.getNumOfPeople());
console.log('urbanCenter toString: ' + urbanCenter.toString());
console.log('Is urbanCenter an instance of UrbanCenter: ' + (urbanCenter instanceof UrbanCenter));
console.log('Is urbanCenter an instance of Object: ' + (urbanCenter instanceof Object));
console.log('What is the urbanCenter constructor: ' + (urbanCenter.constructor === UrbanCenter));
//urbanCenter doesn't own getNumOfPeople
console.log('Does urbanCenter has own property getNumOfPeople: ' + (city.hasOwnProperty('getNumOfPeople')));
//getNumOfPeople method is in the urbanCenter object
console.log('Is getNumOfPeople in urbanCenter: ' + ('getNumOfPeople' in city));
//UrbanCenter.prototype does own getNumOfPeople
//  City inherits it from UrbanCenter
console.log('Does urbanCenter prototype has own property getNumOfPeople: ' + Object.getPrototypeOf(urbanCenter).hasOwnProperty('getNumOfPeople'));
console.log('Does urbanCenter prototype has own property getNumOfPeople: ' + UrbanCenter.prototype.hasOwnProperty('getNumOfPeople'));
console.log('Does urbanCenter prototype has own property getNumOfPeople: ' + urbanCenter.__proto__.hasOwnProperty('getNumOfPeople'));
console.log('Does urbanCenter have a mayor: ' + urbanCenter.hasMayor);

