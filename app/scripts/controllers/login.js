'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('LoginCtrl', ['currentAuth', '$scope', 'firebasePath', '$location', 'Auth', function (currentAuth, $scope, firebasePath, $location, Auth) {

 	if(currentAuth) {
 		$location.path('/');
 	}

 	$scope.someInfo = Auth.$getAuth();

 	$scope.alerts = [];

 	$scope.login = function() {
 		$scope.alerts.push({type:'info', msg: 'Attempting to log you in...'});
 		Auth.$authWithPassword({
 			email    : $scope.usr.email,
 			password : $scope.usr.password
 		}).then(function(authData) {
 			$scope.alerts.push({type:'success', msg: authData.password.email + ' has been logged in. You will now be redirected.'});
 			$location.path('/');
 		}).catch(function(error) {
 			$scope.alerts.push({type: 'danger', msg: 'Login failed. Please try again, reset your password, or contact an administrator.'});
 			console.log('Login Failed!', error);
 		}); 		
 	};

 }]);
