'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.user
 * @description
 * # user
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('User_', ['$firebaseObject', 'firebasePath', 'Job_', '$q', 'fbMethods', function ($firebaseObject, firebasePath, Job_, $q, fbMethods) {

  var ref = new Firebase (firebasePath + '/users');

  var User = $firebaseObject.$extend({
      applyTo: function(jobID, note) {

        var datum = {
          when: fbMethods.getTime(),
          note: note || null
        };

  			// add to a list of jobs that this teacher has applied to
  			var jobsRef = ref.child(this.$id).child('appliedTo').child(jobID);
  			jobsRef.set(datum, function(error) {
          return error;
        });  		
        	
  		},      
      // wrapped list of jobs applied to
      appliedTo_: function() {
        var p = [];        
        for (var property in this.appliedTo) {
          if(this.appliedTo.hasOwnProperty(property)) {              
            var job = Job_(property);
            p.push(job);             
          };            
        }
        return $q.all(p);
      },
      isAdmin: function() {
        // a non-straightforward way of indicating that the user is an admin
        return Object.keys(this.roles).indexOf('2') > -1;
      },
      getFullestName: function() {
        return this.lastName ? name = this.firstName + ' ' + this.lastName : this.firstName;        
      },
      // bool indicates whether user has already applied to this job
      hasApplied: function(jobID) {
        return Object.keys(this.appliedTo).indexOf(jobID) > -1;
      }
  });

  return function(userID) {
    return new User(ref.child(userID));
  }   
}]);
