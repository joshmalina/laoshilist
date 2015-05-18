'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.user
 * @description
 * # user
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('user', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
