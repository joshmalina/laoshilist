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
    'Deal Pending',
  	'Needs Details',
  	'Needs Teacher',
  	'Have Teacher',
  	'Meeting Scheduled',
  	'Pending Payment',
  	'Closed - Paid',
  	'Closed - Unpaid',
  	'On Hold'
]);
