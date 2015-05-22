'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('ProfileCtrl', function ($scope, $location, $routeParams, firebasePath, $firebaseObject) {

  	var ref = new Firebase (firebasePath + '/users/' + $routeParams['username']);

  	$scope.user = $firebaseObject(ref);

  	$scope.go_to_edit = function() {
  		$location.path('/profile_edit/' + $routeParams['username']);
  	};



  	// need to do some checking to make sure we got a user, else redirect

  	//$scope.user = $firebaseObject(this_user);
    
  });
