'use strict';

/**
 * @ngdoc filter
 * @name laoshiListApp.filter:capitalizeFirst
 * @function
 * @description
 * # capitalizeFirst
 * Filter in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .filter('capitalizeFirst', function () {
    return function (input) {
    	if (input != null)
    		input = input.toLowerCase();
    	return input.substring(0,1).toUpperCase()+input.substring(1);
    };
  });
