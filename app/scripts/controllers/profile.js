'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('ProfileCtrl', ['$scope', '$location', '$routeParams', 'firebasePath', '$firebaseObject', 'cities', 'ethnicities', 'countries', function ($scope, $location, $routeParams, firebasePath, $firebaseObject, cities, ethnicities, countries) {

  	var ref = new Firebase (firebasePath + '/users/' + $routeParams.username);

  	$scope.user = $firebaseObject(ref);  	

  	$scope.cities = cities;
  	$scope.ethnicities = ethnicities; 
  	$scope.countries = countries;

  	$scope.goToEdit = function() {
  		$location.path('/profile_edit/' + $routeParams.username);
  	};

  	 	$scope.firebaseUrl = ref+ '/avatar';




  	// need to do some checking to make sure we got a user, else redirect

  	//$scope.user = $firebaseObject(this_user);
    
  }]);
