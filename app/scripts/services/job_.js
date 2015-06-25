'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.Job
 * @description
 * # Job
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('Job_', ['$firebaseObject', 'firebasePath', 'fbMethods', 'User_', function ($firebaseObject, firebasePath, fbMethods, User_) {

  	var ref = new Firebase (firebasePath + '/jobs');

  	var Job = $firebaseObject.$extend({
  		addApplicant: function(appID) {

  			console.log(this);
  			
  			// add to list of applicants in job
  			this.applicants[appID] = fbMethods.getTime();
  			this.$save();
  			
  		}
  	});


    return function(jobID) {
      return new Job(ref.child(jobID));
    }
  }]);
