'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:jobsAssoc
 * @description
 * # jobsAssoc
 */
angular.module('laoshiListApp')
  .directive('jobsAssoc', function () {
    
  	function link (scope) {

  	}

    return {
      templateUrl: 'views/templates/jobsAssoc.html',
      restrict: 'E',
      scope: {
      	jobs: '='
      },
      link: link
    };
  });

