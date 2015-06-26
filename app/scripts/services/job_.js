'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.Job
 * @description
 * # Job
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('Job_', ['$firebaseObject', 'firebasePath', '$firebaseArray', 'fbMethods', function ($firebaseObject, firebasePath, $firebaseArray, fbMethods) {

 	var ref = new Firebase (firebasePath + '/jobs');

 	var Job = $firebaseObject.$extend({
 		addApplicant: function(appID) {
  			// add to list of applicants in job
  			this.applicants[appID] = fbMethods.getTime();
  			this.$save();  			
  		},
  		// return a $firebaseArray of the applicants
  		getApplicants: function() {
  			var applicantsRef = ref.child(this.$id).child('applicants');
  			return $firebaseArray(applicantsRef);
  		}
  	});


 	return function(jobID) {
 		return new Job(ref.child(jobID));
 	}
 }]);
