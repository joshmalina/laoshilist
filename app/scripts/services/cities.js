'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.cities
 * @description
 * # cities
 * Service in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .constant('cities', ['beijing', 'shanghai']
    // AngularJS will instantiate a singleton by calling "new" on this function
  );
