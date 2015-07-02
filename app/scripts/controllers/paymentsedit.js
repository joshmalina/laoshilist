'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:PaymentseditCtrl
 * @description
 * # PaymentseditCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('PaymentseditCtrl', ['$firebaseArray', 'users', 'firebasePath', '$firebaseObject', '$scope', '$routeParams', 'Jobs', function ($firebaseArray, users, firebasePath, $firebaseObject, $scope, $routeParams, Jobs) {
    
  	var ref = new Firebase (firebasePath + '/payments/' + $routeParams.paymentID);

  	$scope.payment = $firebaseObject(ref);

  	$scope.users = users.getAllUsers();

  	$scope.notes = $firebaseArray(ref.child('notes'));

  	$scope.jobs = Jobs();

  	$scope.saveDate = function(date_) {
  		ref.child('whenPaid').set(Date.parse(date_));
  	};

  }]);
