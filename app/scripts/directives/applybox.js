'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:applyBox
 * @description
 * # applyBox
 */
angular.module('laoshiListApp')
  .directive('applyBox', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the applyBox directive');
      }
    };
  });
