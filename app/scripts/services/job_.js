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
 		 addApplicant: function(appID, note) {

        var datum = {
          when: fbMethods.getTime(),
          why: note || null
        };

        console.log(datum);
  			// add to list of applicants in job
        // doing it this way as opposed to this.applicants[jobID] ... because if there are no extant applicants it will fail
        ref.child(this.$id).child('applicants').child(appID).set(datum);		
  		},
  		// return a $firebaseArray of the applicants
  		getApplicants: function() {
  			return $firebaseArray(ref.child(this.$id).child('applicants'));
  		},
      getNotes: function() {
        return $firebaseArray(ref.child(this.$id).child('notes'));
      }
  	});


 	return function(jobID) {
 		return new Job(ref.child(jobID));
 	}
 }]);
