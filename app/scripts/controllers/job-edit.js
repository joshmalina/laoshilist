'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobEditCtrl
 * @description
 * # JobEditCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobEditCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {

    $scope.job = {
    	$id: $routeParams.jobid
    };

  }]);
