'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.jobs
 * @description
 * # jobs
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('jobs_', ['firebasePath', '$firebaseArray', 'jobStatus', function (firebasePath, $firebaseArray, jobStatus) {
    
    var ref = new Firebase (firebasePath + '/jobs');

    ref = ref.orderByChild('status');


    var jobs = $firebaseArray.$extend({});

    return function(limitTo) {

      if(limitTo) {
        return new jobs(ref.equalTo(jobStatus.indexOf(limitTo).toString()));
      } else {
        return new jobs(ref);
      }

    }

  }]);
