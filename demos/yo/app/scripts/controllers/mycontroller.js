'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:MycontrollerCtrl
 * @description
 * # MycontrollerCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('MycontrollerCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
