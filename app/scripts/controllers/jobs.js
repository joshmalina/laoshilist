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
        $scope.jobs = user.isAdmin() ? jobs_() : jobs_('Needs Teacher');
      });    
    // if not logged in at all  
    } else {
      // definetly only show jobs that need teachers
      $scope.jobs = jobs_('Needs Teacher');
    }


    // pass constants to filter
    $scope.statuses = llConstants.jobstatus();
    $scope.subjects = llConstants.subjects();
    $scope.ages = llConstants.ages();
    $scope.cities = llConstants.cities();  

    // add new job, set default status
  	$scope.addJob = function() {
  		$scope.jobs.$add({
          status:'needDetail', 
          dateModified: fbMethods.getTime()
      });
  	};

  }]);
