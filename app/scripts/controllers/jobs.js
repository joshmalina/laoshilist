'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobsCtrl', ['fbMethods', '$scope', '$firebaseArray', 'firebasePath', 'jobStatus', 'subjects', 'ages', 'cities', function (fbMethods, $scope, $firebaseArray, firebasePath, jobStatus, subjects, ages, cities) {

    // pass services to filter
    $scope.statuses = jobStatus;
    $scope.subjects = subjects;
    $scope.ages = ages;
    $scope.cities = cities;
   
    // clear all filters
    $scope.clearFilter = function() {
      $scope.filterText = {};
    };


    // $scope.filterText = {
    //   age: ['24+', '9-13']
    // };

    // toggle view jobs by newest / oldest
    $scope.groupBy = '-dateModified';
    $scope.orderedBy = 'Newest';
    $scope.toggleGroupBy = function() {
      if($scope.groupBy === '-dateModified') {
        $scope.groupBy = 'dateModified';
        $scope.orderedBy = 'Oldest';
      } else {
        $scope.groupBy = '-dateModified';
        $scope.orderedBy = 'Newest';
      }
    };

    // get all jobs, pass to view
  	var ref = new Firebase(firebasePath + '/jobs');
  	$scope.jobs = $firebaseArray(ref);

    // add new job, set default status
  	$scope.addJob = function() {
  		$scope.jobs.$add({
          status:'needDetail', 
          dateModified: fbMethods.getTime()
      });
  	};

  }]);
