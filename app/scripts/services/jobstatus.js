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
    'dealPending',
  	'needDetail',
  	'needTeacher',
  	'haveTeacher',
  	'meetScheduled',
  	'waitPayment',
  	'closedPaid',
  	'closedUnpaid',
  	'onHold',
  	'dead'
]);
