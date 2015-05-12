'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobsCtrl', function ($scope, $firebaseArray, firebasePath, jobStatus, subjects, ages) {

  	var ref = new Firebase('https://' + firebasePath + '.firebaseio.com/jobs');

  	// var jobs = $firebaseArray(ref);
  	// $scope.jobs = jobs;

  	$scope.subjects = subjects;
  	$scope.jobStatuses = jobStatus;
  	$scope.ages = ages;

  	$scope.removeJob = function(job) {
  		jobs.$remove(job).then(function(ref) {
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

  	var jobs = [{  		
		title: 'xizhimen twice a week for three hours',
		longDesc: 'help two young girls with their spoken english, they are intermdiate advanced level',
		age: '0 - 2',		
		numStudents: '3 - 4',
		schedule: 'tuesday afternoons for two hours, start at 3pm',
		pay: '¥225 / hr',
		subjects: {
			english: true
		},
		locationDesc: '5 minutes north of xizhimen subway station',
		lat: '39.221',
		lng: '107.34',
		city: {
			beijing: true
		},
		fee: 'a one time agency fee of 500 yuan',
		contact: 'uniqueUserID',
		applicants: [{
			id: null,
			dateApplied: null
		}],
		status: {
			pendingPayment: true
		},
		comment: 'expect payment on 11/24',
		dateModified: 23432432		
	}];

	$scope.jobs = jobs;
	

  	//f();
  	
    
  	// get jobs from firebase
  	// bind to scope
  	// function to add new job


  });
