'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.user
 * @description
 * # user
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('User_', ['$firebaseObject', 'firebasePath', function ($firebaseObject, firebasePath) {
    return function(userID) {
      var ref = new Firebase (firebasePath + '/users');
      var userRef = ref.child(userID);
      return $firebaseObject(userRef);
    }   
  }]);
