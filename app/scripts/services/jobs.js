'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.Jobs
 * @description
 * # Jobs
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('Jobs', ['firebasePath', '$firebaseArray', function (firebasePath, $firebaseArray) {
    return function() {
      var ref = new Firebase (firebasePath);
      var jobsRef = ref.child('jobs');
      return $firebaseArray(jobsRef.orderByChild('title'));
    }
  }]);