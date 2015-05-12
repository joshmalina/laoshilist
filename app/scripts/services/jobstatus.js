'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.jobStatus
 * @description
 * # jobStatus
 * Constant in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .constant('jobStatus', [
  	'details needed',
  	'teacher needed',
  	'teacher found',
  	'first meeting scheduled',
  	'pending payment',
  	'payment complete',
  	'hold',
  	'will not complete'
]);
