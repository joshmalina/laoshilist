'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
