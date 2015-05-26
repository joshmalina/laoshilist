'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobeditCtrl
 * @description
 * # JobeditCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobeditCtrl', ['$scope', 'subjects', function ($scope, subjects) {
    $scope.subjects = subjects;
  }]);
