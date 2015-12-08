'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobsCtrl', ['jobs__', 'jobs_', 'llConstants', 'User_', 'currentAuth', 'fbMethods', '$scope', '$location', function (jobs__, jobs_, llConstants, User_, currentAuth, fbMethods, $scope, $location) {

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

    jobs__().then(function(jobs) {
      console.log(jobs.data);
      $scope.jj = jobs.data;
    })

    


   

    // important since firebase indices don't seem to be able to be set in ascending order
    $scope.groupBy = '-dateModified';

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
      }).then(function(ref) {
        $location.path('/job-edit/' + ref.key());
      });
  	};

  }]);
