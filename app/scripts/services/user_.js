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
  			var jobs = ref.child('jobs').push();
  			jobs.set({jobID:true});  			
  		}
  	});

    return function(userID) {
      return new User(ref.child(userID));
    }   
  }]);
