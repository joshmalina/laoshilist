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

    jobs__.getJobs().then(function(jobs) {
      $scope.jj = jobs.data;
    });   

    // important since firebase indices don't seem to be able to be set in ascending order
    $scope.groupBy = '-dateModified';

    // pass constants to filter
    $scope.statuses = llConstants.jobstatus();
    $scope.subjects = llConstants.subjects();
    $scope.ages = llConstants.ages();
    $scope.cities = llConstants.cities();  

    $scope.addJob = function() {
      jobs__.addJob({
        status: 1,
        dateModified: Date.now()
      }).then(function(ref) {
        $location.path('/job-edit/' + ref.data)
      })
    }

  }]);
