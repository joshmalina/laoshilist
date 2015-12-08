'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:jobSnapshot
 * @description
 * # jobSnapshot
 */
angular.module('laoshiListApp')
  .directive('jobSnapshot', ['jobs__', 'Job_', 'llConstants', 'User_', function (jobs__, Job_, llConstants, User_) {

  	function link(scope) {
      var job_q = jobs__.getJob(scope.jobid);

      job_q.then(function(job) {
        scope.job = job.data[0];
        console.log(job.data[0]);
        // if(scope.job.clientID) {
        //   scope.client = User_(scope.job.clientID);
        //   //scope.notes = scope.job.getNotes();
        // }
      })

      scope.cities = llConstants.cities();
      scope.status = llConstants.jobstatus();
      
  	}

    return {
      templateUrl: 'views/templates/jobSnapshot.html',
      restrict: 'E',
      scope: {
      	jobid: '=',
        // a not-great way of exposing / hiding admin only info / options
        admin: '='
      },
      link: link
    };

  }]);
