'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:DeleteCtrl
 * @description
 * # DeleteCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('DeleteCtrl', ['$scope', '$modalInstance', 'toDelete', 'collection', function ($scope, $modalInstance, toDelete, collection) {

 	$scope.toDelete = toDelete;

 	$scope.remove = function() {
 		collection.$remove(toDelete).then(function(ref) {
 			$modalInstance.close(ref);
 		});
 	};

 	$scope.cancel = function () {
 		$modalInstance.dismiss('cancel');
 	};

 }]);

