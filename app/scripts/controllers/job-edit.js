'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobEditCtrl
 * @description
 * # JobEditCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobEditCtrl', ['$scope', 'Job_', '$routeParams', function ($scope, Job_, $routeParams) {

    $scope.job = {
    	$id: $routeParams.jobid
    };

  }]);
