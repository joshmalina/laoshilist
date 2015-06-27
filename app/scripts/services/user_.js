'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.user
 * @description
 * # user
 * Factory in the laoshiListApp.
 */
 angular.module('laoshiListApp')
 .factory('User_', ['$firebaseObject', 'firebasePath', 'Job_', '$q', function ($firebaseObject, firebasePath, Job_, $q) {

  var ref = new Firebase (firebasePath + '/users');

  var User = $firebaseObject.$extend({
    applyTo: function(jobID) {
  			// add to a list of jobs that this teacher has applied to
  			var jobsRef = ref.child(this.$id).child('appliedTo').child(jobID);
  			jobsRef.set(true);  			
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
      }
  });

  return function(userID) {
    return new User(ref.child(userID));
  }   
}]);
