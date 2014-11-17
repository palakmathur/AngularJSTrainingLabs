'use strict';

/* jasmine specs for controllers go here */

describe('Home Controller', function(){
  beforeEach(module('lemonadeApp'));

  //We don't have to write our injection within a beforeEach
  it('should be defined', inject(function(_$controller_) {
    //spec body
    var homeController = _$controller_('HomeController', { $scope: {} });
    expect(homeController).toBeDefined();
  }));

});