'use strict';

/**
 * @ngdoc service
 * @name laoshiListApp.user
 * @description
 * # user
 * Service in the laoshiListApp.
 */
angular.module('laoshiListApp')
  .factory('user', ['$location', '$firebaseObject', 'firebasePath', function ($location, $firebaseObject, firebasePath) {
  	

  	var user = function(userID) {
  		this.userID = userID;
  	};

  	user.prototype.getInfo = function() {
  		
  		var self = this;

  		var url = firebasePath + '/users/' + this.userID;

  		var ref = new Firebase (url);

  		var obj = $firebaseObject(ref);

  		obj.$loaded().then(function() {
  			self.firstName = obj.firstName;
  		});
  		
  	}

  	user.prototype.visit = function() { 		
  		$location.path('/profile/' + this.userID);
  	}
  	    
    return user;

  }]);
