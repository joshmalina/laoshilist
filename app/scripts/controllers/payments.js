'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:BooksCtrl
 * @description
 * # BooksCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('PaymentsCtrl', ['job', '$scope', '$firebaseArray', 'firebasePath', 'fbMethods', 'user', function (job, $scope, $firebaseArray, firebasePath, fbMethods, user) {

  var ref = new Firebase (firebasePath + '/payments');

  $scope.items = $firebaseArray(ref);

  $scope.getJobTitle = function(id) {
    var job = new Job(id);
    return job.title;
  };

  $scope.newItem = function() {
   $scope.items.$add({
    dateAdded: fbMethods.getTime(),
    dateModified: fbMethods.getTime()
  });
 };

 // var twins = {
 //  whenPaid: 1431769367,
 //  whenAdded: fbMethods.getTime(),
 //  whenUpdated: fbMethods.getTime(),
 //  amount: 9000,
 //  currency: 'RMB',
 //  job: '-Jr44sQpOjHshwQfKusR',
 //  paidBy: '-Jr44xUzrQhrg-ASW-Kr',
 //  paidTo: 'simplelogin:28'
 // }

 //$scope.items.$add(twins);



}]);
