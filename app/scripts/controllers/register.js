'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('RegisterCtrl', function ($scope, firebasePath, username) {

 	var ref = new Firebase(firebasePath);

 	$scope.register = function() {

 		if(!$scope.registerForm.$valid) {
 			return;
 		}

 		// register user with firebase auth
 		ref.createUser({
 			email: $scope.usr.email,
 			password: $scope.usr.password
 		}, function (error, userData) {
 			if (error) {
 				console.log('error:', error);
 			} else {
 				// create a new user in the DB, indexed by a new username
 				var newUserRef = ref.child("users").child(username.new($scope.usr.firstName));
 				newUserRef.set({
 					email: $scope.usr.email,
 					uid: userData.uid,
 					first_name: $scope.usr.firstName,
 					last_name: $scope.usr.lastName,
 					date_joined: Firebase.ServerValue.TIMESTAMP				
 				}, function(error) {
 					if(error) {
 						console.log(error);
 					} else {
 						console.log("saved");
 					}
 				});

 			}


 		});	

	}
});