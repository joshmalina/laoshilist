'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobsCtrl', function ($scope, $firebaseArray, firebasePath, jobStatus, subjects, ages, cities) {

  	var ref = new Firebase('https://' + firebasePath + '.firebaseio.com/jobs');
  	var jobs = $firebaseArray(ref);
  	$scope.jobs = jobs;

  	$scope.addJob = function() {
  		jobs.$add(
        {
          status:'needDetail', 
          dateModified: Firebase.ServerValue.TIMESTAMP
        });
  	};

    $scope.update = function() {
        console.log("update");
    };

  	

  	// filters
  	// $scope.filterText = '';
  	// $scope.sortByDate = Newest || Oldest;
  	// $scope.filterByStatus = All || Resolved || Unresolved;

  	// use three way bindings to have views be editable



  });
