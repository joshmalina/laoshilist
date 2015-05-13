'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llPublicJob
 * @description
 * # llPublicJob
 */
angular.module('laoshiListApp')
  .directive('llPublicJob', function () {
    return {
      templateUrl: 'views/templates/publicJob.html',
      restrict: 'E',
      scope: {
      	job: '='
      }      
    };
  });