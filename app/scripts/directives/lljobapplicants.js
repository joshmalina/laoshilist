'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJobApplicants
 * @description
 * # llJobApplicants
 */
angular.module('laoshiListApp')
  .directive('llJobApplicants', ['firebasePath', '$firebaseArray', function (firebasePath, $firebaseArray) {

  	function link (scope) {
  		var ref = new Firebase (firebasePath + '/jobs/' + scope.jobid);
  		//scope.applicants = 

  	}

    return {
      templateUrl: 'views/templates/jobApplicants.html',
      restrict: 'E',
      scope: {
      	jobid: '='
      },
      link: link      
    };
  }]);
