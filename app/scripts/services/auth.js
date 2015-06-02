'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.Auth
 * @description
 * # Auth
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('Auth', ['$firebaseAuth', 'firebasePath', function ($firebaseAuth, firebasePath) {
    
      var ref = new Firebase (firebasePath);
      return $firebaseAuth(ref);
    
  }]);

