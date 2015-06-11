'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.job
 * @description
 * # job
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('job', function () {
  

  function Job(jobID) {

    this.id = jobID;

    var ref = new Firebase (firebasePath + '/jobs/' + jobID);

    var jobObj = $firebaseObject(ref);

    var self = this;

    jobObj.$loaded().then(function(jobReturned) {
      self.title = jobReturned.title;
    });

  }

  return Job;

});
