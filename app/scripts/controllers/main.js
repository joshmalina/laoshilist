'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('MainCtrl', ['Mandrill', '$scope', function (Mandrill, $scope) {
 	// test to see if our local node server is working
 	$scope.sendMail = function() {
 		Mandrill.test('any response', 'any message').then(function(data) {
 			console.log(data);
 		});
 	};
 }]);
