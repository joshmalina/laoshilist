'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.user
 * @description
 * # user
 * Factory in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('User_', ['$firebaseObject', 'firebasePath', function ($firebaseObject, firebasePath) {
    
    var ref = new Firebase (firebasePath + '/users');

  	var User = $firebaseObject.$extend({
  		applyTo: function(jobID) {
  			// add to a list of jobs that this teacher has applied to
  			var jobsRef = ref.child(this.$id).child('appliedTo').child(jobID);
  			jobsRef.set(true);  			
  		}
  	});

    return function(userID) {
      return new User(ref.child(userID));
    }   
  }]);