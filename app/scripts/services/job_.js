'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.Job
 * @description
 * # Job
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('Job_', ['$firebaseObject', 'firebasePath', function ($firebaseObject, firebasePath) {
    return function(jobID) {
      var ref = new Firebase (firebasePath + '/jobs/' + jobID);
      return $firebaseObject(ref);
    }
  }]);
