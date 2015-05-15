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

    // pass services to filter
    $scope.statuses = jobStatus;
    $scope.subjects = subjects;
    $scope.ages = ages;
    $scope.cities = cities;
   
    // clear all filters
    $scope.clearFilter = function() {
      $scope.filterText = {};
    };

    // toggle view jobs by newewst / oldest
    $scope.groupBy = '-dateModified';
    $scope.orderedBy = 'Newest';
    $scope.toggleGroupBy = function() {
      if($scope.groupBy == '-dateModified') {
        $scope.groupBy = 'dateModified';
        $scope.orderedBy = 'Oldest';
      } else {
        $scope.groupBy = '-dateModified';
        $scope.orderedBy = 'Newest';
      }
    }

    // get all jobs, pass to view
  	var ref = new Firebase('https://' + firebasePath + '.firebaseio.com/jobs');
  	$scope.jobs = $firebaseArray(ref);

    // add new job, set default status
  	$scope.addJob = function() {
  		$scope.jobs.$add({
          status:'needDetail', 
          dateModified: Firebase.ServerValue.TIMESTAMP
      });
  	};

  });
