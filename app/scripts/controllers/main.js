'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('MainCtrl', function ($scope, $firebaseArray) {
 	var ref = new Firebase('https://popping-torch-9518.firebaseio.com/messages');

 	$scope.messages = $firebaseArray(ref);

 	$scope.addMessage = function() {
 		$scope.messages.$add({
 			text: 'niggers_die'
 		});
 	};

 	$scope.addMessage();
 	
 });
