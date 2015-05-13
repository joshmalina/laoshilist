'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJobApplicants
 * @description
 * # llJobApplicants
 */
angular.module('laoshiListApp')
  .directive('llJobApplicants', function () {
    return {
      templateUrl: 'views/templates/jobApplicants.html',
      restrict: 'E',
      scope: {
      	job: '='
      }      
    };
  });
