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

  	$scope.isCollapsed = true;

  	$scope.coll = function() {
  		$scope.isCollapsed = !$scope.isCollapsed;
  	};

  	$scope.subjects = subjects;
  	$scope.jobStatuses = jobStatus;
  	$scope.ages = ages;
  	$scope.cities = cities;

  	$scope.addJob = function() {
  		jobs.$add();
  	};

  	$scope.removeJob = function(job) {
  		console.log('dd');
  		jobs.$remove(job.$id).then(function(ref) {
  			console.log('this job: ');
  			console.log(ref);
  			console.log(' was removed');
  		});
  	};

  	// filters
  	// $scope.filterText = '';
  	// $scope.sortByDate = Newest || Oldest;
  	// $scope.filterByStatus = All || Resolved || Unresolved;

  	// use three way bindings to have views be editable



  });
