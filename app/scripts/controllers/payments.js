'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:BooksCtrl
 * @description
 * # BooksCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('PaymentsCtrl', ['$location', 'job', '$scope', '$firebaseArray', 'firebasePath', 'user', 'fbMethods', function ($location, job, $scope, $firebaseArray, firebasePath, user, fbMethods) {

  var ref = new Firebase (firebasePath + '/payments');

  $scope.items = $firebaseArray(ref);

  $scope.getJobTitle = function(id) {
    var job = new Job(id);
    return job.title;
  }; 

  $scope.selectedItems = [];
   $scope.focusinControl = {
    selectedItems: [],
    collection: $scope.items
  }; 

  $scope.addItem = function() {
    console.log('cats');
   $scope.items.$add({
    whenAdded: fbMethods.getTime(),
    whenModified: fbMethods.getTime()
  }).then(function(ref) {
    $location.path('/paymentsEdit/' + ref.key());
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
