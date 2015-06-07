'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:BooksCtrl
 * @description
 * # BooksCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('BooksCtrl', ['$scope', '$firebaseArray', 'firebasePath', 'fbMethods', function ($scope, $firebaseArray, firebasePath, fbMethods) {
    var ref = new Firebase (firebasePath + '/books');

    $scope.items = $firebaseArray(ref);

    $scope.newItem = function() {
    	$scope.items.$add({
	    	dateAdded: fbMethods.getTime(),
	    	dateModified: fbMethods.getTime()
    	});
	};


   
  }]);
