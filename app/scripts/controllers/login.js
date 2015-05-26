'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('LoginCtrl', ['$scope', 'firebasePath', function ($scope, firebasePath) {
 	var ref = new Firebase(firebasePath);

 	$scope.login = function() {
 		ref.authWithPassword({
 			email    : $scope.usr.email,
 			password : $scope.usr.password
 		}, function(error, authData) {
 			if (error) {
 				console.log('Login Failed!', error);
 			} else {
 				console.log('Authenticated successfully with payload:', authData);
 			}
 		});
 	};

 }]);
