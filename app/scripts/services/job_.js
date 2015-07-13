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
        // doing it this way as opposed to this.applicants[jobID] ... because if there are no extant applicants it will fail
        ref.child(this.$id).child('applicants').child(appID).set(fbMethods.getTime(), function(error) {
          return error;
        });		
  		},
  		// return a $firebaseArray of the applicants user ids
  		getApplicants: function() {
  			return $firebaseArray(ref.child(this.$id).child('applicants'));
  		},
      // // returns a $firebaseArray of the applicants full user profile
      // getApplicantsLoaded: function() {
      //   return this.getApplicants().$loaded().then(function(list) {
      //     console.log(list);
      //     list.map(function(eachApplicantID) {
      //       console.log(eachApplicantID.$id);
      //       var usersRef = new Firebase (firebasePath + '/users');
      //       var userRef = usersRef.child(eachApplicantID.$id);
      //       // return new list of full user objects
      //       return $firebaseObject(eachApplicantID);
      //     })
      //   });
      // },
      getNotes: function() {
        return $firebaseArray(ref.child(this.$id).child('notes'));
      },
      deleteApplicant: function(appID) {
        ref.child(this.$id).child('applicants').child(appID).set(null);
      }
  	});


 	return function(jobID) {
 		return new Job(ref.child(jobID));
 	}
 }]);
