'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:shareJob
 * @description
 * # shareJob
 */
angular.module('laoshiListApp')
  .directive('shareJob', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the shareJob directive');
      }
    };
  });
