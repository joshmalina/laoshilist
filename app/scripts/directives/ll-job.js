'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJob
 * @description
 * # llJob
 */
angular.module('laoshiListApp')
  .directive('llJob', function () {
    return {
      templateUrl: 'views/templates/publicJob.html',
      restrict: 'E',
      scope: {
      	job: '='
      }      
    };
  });
