'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:jobSnapshot
 * @description
 * # jobSnapshot
 */
angular.module('laoshiListApp')
  .directive('jobSnapshot', ['Job_', 'firebasePath', '$firebaseObject', 'llConstants', function (Job_, firebasePath, $firebaseObject, llConstants) {

  	function link(scope) {
  		var ref = new Firebase (firebasePath + '/jobs/' + scope.job);
  		scope.job = $firebaseObject(ref);
      scope.cities = llConstants.cities();
      scope.status = llConstants.jobstatus();
  	}


    return {
      templateUrl: 'views/templates/jobSnapshot.html',
      restrict: 'E',
      scope: {
      	job: '='
      },
      link: link
    };

  }]);
