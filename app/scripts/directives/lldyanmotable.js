'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llDyanmoTable
 * @description
 * # llDyanmoTable
 */
angular.module('laoshiListApp')
  .directive('llDyanmoTable', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the llDyanmoTable directive');
      }
    };
  });
