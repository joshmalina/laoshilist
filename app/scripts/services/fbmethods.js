'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.fbMethods
 * @description
 * # fbMethods
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('fbMethods', function () {
    // Service logic
    // ...
    var addEmpty = function(arrayRef) {
      arrayRef.$add('null');
    };

    // Public API here
    return {
      // adds a temporary placeholder for
      // an array ref; firebase does not
      // allow completely empty objects
      // to exist
      addEmpty: function (arrayRef) {
        return addEmpty(arrayRef);
      }
    };
  });
