'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobviewCtrl
 * @description
 * # JobviewCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobviewCtrl', ['subjects', 'ages', '$routeParams', '$scope', 'firebasePath', '$firebaseObject', 'cities', '$firebaseArray', function (subjects, ages, $routeParams, $scope, firebasePath, $firebaseObject, cities, $firebaseArray) {
    
    // some message about not being able to find that certain job if nothing is returned from db for that job or id is not present

    var ref = new Firebase (firebasePath + '/jobs/' + $routeParams.jobid);

    $scope.job = $firebaseObject(ref);
    $scope.cities = cities;
    $scope.ages = ages;
    $scope.subjects = subjects;

    // this should be limited to ones that 'need teacher'
    // it should not include the current job
    var jobsRef = new Firebase (firebasePath + '/jobs/');

    $scope.jobs = $firebaseArray(jobsRef);



  }]);
