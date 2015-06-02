'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('RegisterCtrl', ['Auth', '$scope', 'firebasePath', 'username', function (Auth, $scope, firebasePath, username) {

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
 			console.log(userData);
 			createDbUser(userData.uid);
 		}).catch(function (error) {
 			$scope.alerts.push({type:'danger', msg:'Registration failed. Please try again.'});
 			console.log(error);
 		});	
 	};

 	// consider implementing this as a transaction so we don't have issues
 	// also consider putting this in a service
	// register user as a DB object, indexed by a username based on the first name
	function createDbUser(uid) {
		var newUserRef = ref.child('users').child(username.new($scope.usr.firstName));
		newUserRef.set({
			email: $scope.usr.email,
			uid: uid,
			firstName: $scope.usr.firstName//,
			// lastName: $scope.usr.lastName,
			//created: Firebase.ServerValue.TIMESTAMP				
		}, function(error) {
			if(error) {
				console.log(error);
			} else {
				console.log('saved to db');
			}
		});
	}
}]);

