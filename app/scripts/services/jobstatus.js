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
    'Contact Client ',
  	'Needs Details',
  	'Needs Teacher',
  	'Have Teacher',
  	'Meeting Scheduled',
  	'Pending Payment',
  	'Paid',
  	'Unpaid',
  	'On Hold',
    'Won\'t resolve'
]);
