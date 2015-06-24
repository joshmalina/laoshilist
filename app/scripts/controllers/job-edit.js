'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobEditCtrl
 * @description
 * # JobEditCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobEditCtrl', ['$scope', 'Job_', '$routeParams', '$location', function ($scope, Job_, $routeParams, $location) {

    $scope.job = {
    	$id: $routeParams.jobid
    };

  }]);
