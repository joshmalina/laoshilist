'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobviewCtrl
 * @description
 * # JobviewCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobviewCtrl', ['$scope', 'firebasePath', '$firebaseObject', function ($scope, firebasePath, $firebaseObject) {
    var ref = new Firebase (firebasePath + '/jobs/' + '-JpDGm0H5A5_algAmqkf');

    $scope.job = $firebaseObject(ref);
  }]);
