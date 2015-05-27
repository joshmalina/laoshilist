'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:profileBox
 * @description
 * # profileBox
 */
angular.module('laoshiListApp')
  .directive('profileBox', function () {

  	function link () {

  	}

    return {
      templateUrl: 'views/templates/profileBox.html',
      restrict: 'E',
      scope: {
      	obj: '=',
      	label: '@'
      },
      link: link
    };
  });
