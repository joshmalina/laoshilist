'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobsCtrl', ['jobs_', 'llConstants', 'User_', 'currentAuth', 'fbMethods', '$scope', '$firebaseArray', 'firebasePath', function (jobs_, llConstants, User_, currentAuth, fbMethods, $scope, $firebaseArray, firebasePath) {

    if(currentAuth) {
      var user = User_(currentAuth.uid);
      user.$loaded().then(function() {        
        $scope.isAdmin = user.isAdmin();
        // only display jobs that need teachers to non-admins
        $scope.jobs = user.isAdmin() ? jobs_() : jobs_('Needs Teacher') ;
      });      
    } else {
      // if you're not logged in, only show jobs that need teachers
      $scope.jobs = jobs_('Needs Teacher');
    }

    console.log($scope.isAdmin);


 // get all jobs, pass to view
    //var limited = ref.orderByChild('status').equalTo('2');

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

   

    // add new job, set default status
  	$scope.addJob = function() {
  		$scope.jobs.$add({
          status:'needDetail', 
          dateModified: fbMethods.getTime()
      });
  	};

  }]);
