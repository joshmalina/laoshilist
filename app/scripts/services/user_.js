'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.user
 * @description
 * # user
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('User_', ['$firebaseObject', 'firebasePath', 'Job_', '$q', 'fbMethods', 'apiPath', function ($firebaseObject, firebasePath, Job_, $q, fbMethods, apiPath) {

  var ref = new Firebase (firebasePath + '/users');  

  var User = $firebaseObject.$extend({
      applyTo: function(jobID, note) {

        var datum = {
          when: fbMethods.getTime(),
          note: note.text || null
        };

  			// add to a list of jobs that this teacher has applied to
        // so: job1 { 
        //  appliedTo: {
        //    'some-job-id': {
        //        when: "5 pm on saturday"
        //}       note: "i would be a really good candidate!""
        //}
        //}
  			var jobsRef = ref.child(this.$id).child('appliedTo').child(jobID);
  			jobsRef.set(datum, function(error) {
          return error;
        });  		
        	
  		},
      // mostly for clients
      makeJob: function(jobID) {
        var meRef = ref.child(this.$id).child('jobs').child(jobID);
        meRef.set(fbMethods.getTime());
      },     
      deleteJob: function(jobID) {
        var meRef = ref.child(this.$id).child('jobs').child(jobID);
        meRef.set(null);
      },
      // wrapped list of jobs applied to
      appliedTo_: function() {
        var p = [];        
        for (var property in this.appliedTo) {
          if(this.appliedTo.hasOwnProperty(property)) {              
            var job = new Job_(property);
            p.push(job);             
          }            
        }
        return $q.all(p);
      },
      isAdmin: function() {
        if(!this.roles) {
          return false;
        }
        // a non-straightforward way of indicating that the user is an admin
        return Object.keys(this.roles).indexOf('2') > -1;
      },
      getFullestName: function() {
        return this.lastName ? this.firstName + ' ' + this.lastName : this.firstName;        
      },
      getPathToCV: function() {
        return apiPath + 'resume?userid=' + this.$id + '&extension=' + this.cv;
      },
      // bool indicates whether user has already applied to this job
      hasApplied: function(jobID) {
        return Object.keys(this.appliedTo).indexOf(jobID) > -1;
      },
      dontApply: function(jobID) {
        ref.child(this.$id).child('appliedTo').child(jobID).set(null);
      }
  });

  return function(userID) {

      return new User(ref.child(userID));
    
  };
}]);
