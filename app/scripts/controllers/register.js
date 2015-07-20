'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('RegisterCtrl', ['Auth', '$scope', 'firebasePath', 'username', '$location', '$timeout', function (Auth, $scope, firebasePath, username, $location, $timeout) {

 	var ref = new Firebase(firebasePath);

 	$scope.alerts = [];

 	$scope.register = function() {

 		if(!$scope.registerForm.$valid) {
 			return;
 		}

 		// register user with firebase auth
 		Auth.$createUser({
 			email: $scope.usr.email,
 			password: $scope.usr.password
 		}).then(function(userData) {
 			$scope.alerts.push({type:'success', msg:'You have successfully registered. You will now be redirected.'});
 			$timeout(function() {
 				$location.path('/login');
 			}, 2000);
 			createDbUser(userData.uid);
 		}).catch(function (error) {
 			var msg;
 			switch(error.code) {
 				case 'EMAIL_TAKEN':
 					msg = 'That email has already been registered. Please try logging in instead.';
 					break;
				default:
					msg = 'Registration failed. Please try again.';
 			}
 			$scope.alerts.push({type:'danger', msg:msg});
 		});	
 	};

 	// consider implementing this atomically so we don't have issues
 	// also consider putting this in a service
	// register user as a DB object, indexed by a username based on the first name
	function createDbUser(uid) {
		//var newUserRef = ref.child('users').child(username.new($scope.usr.firstName));
		var newUserRef = ref.child('users').child(uid);
		newUserRef.set({
			loginEmail: $scope.usr.email,
			firstName: $scope.usr.firstName,
			dateAdded: Firebase.ServerValue.TIMESTAMP				
		}, function(error) {
			if(error) {
				console.log(error);
			} else {
				//console.log('saved to db');
			}
		});
	}
}]);

