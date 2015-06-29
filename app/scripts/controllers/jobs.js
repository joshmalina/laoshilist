'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobsCtrl', ['llConstants', 'User_', 'currentAuth', 'fbMethods', '$scope', '$firebaseArray', 'firebasePath', function (llConstants, User_, currentAuth, fbMethods, $scope, $firebaseArray, firebasePath) {

    if(currentAuth) {
      var user = User_(currentAuth.uid);
      user.$loaded().then(function() {        
        $scope.isAdmin = user.isAdmin();
      });      
    }
    // pass services to filter
    $scope.statuses = llConstants.jobstatus();
    $scope.subjects = llConstants.subjects();
    $scope.ages = llConstants.ages();
    $scope.cities = llConstants.cities();
   
    // clear all filters
    $scope.clearFilter = function() {
      $scope.filterText = {};
      $scope.filterSearch = null;
    };

    $scope.clear = function() {
      $scope.filterText.city = null;
    };

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
