'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:jobSnapshot
 * @description
 * # jobSnapshot
 */
angular.module('laoshiListApp')
  .directive('jobSnapshot', ['Job_', 'llConstants', function (Job_, llConstants) {

  	function link(scope) {
      scope.job = Job_(scope.jobid);
      scope.cities = llConstants.cities();
      scope.status = llConstants.jobstatus();
      scope.notes = scope.job.getNotes();
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
