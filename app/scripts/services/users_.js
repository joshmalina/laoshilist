'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.Users
 * @description
 * # Users
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('Users_', ['$firebaseArray', 'firebasePath', function ($firebaseArray, firebasePath) {
    
    var ref = new Firebase (firebasePath + '/users');

    var Users = $firebaseArray.$extend({

    });

    
    return function() {
      return new Users(ref);
    };

  }]);
