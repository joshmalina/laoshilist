'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('RegisterCtrl', function ($scope, firebasePath) {

 	var ref = new Firebase("https://" + firebasePath + ".firebaseio.com");

 	$scope.register = function() {
 		ref.createUser({
 			email: $scope.usr.email,
 			password: $scope.usr.password
 		}, function (e, userData) {
 			if (e) {
 				console.log("error:", e);
 			} else {
 				console.log("created: ", userData);
 			}
 		});
 	}	


 });
