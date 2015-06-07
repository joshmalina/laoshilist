'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('ProfileCtrl', ['$firebaseArray', '$q', 'subjects', 'roles', '$scope', '$location', '$routeParams', 'firebasePath', '$firebaseObject', 'cities', 'ethnicities', 'countries', function ($firebaseArray, $q, subjects, roles, $scope, $location, $routeParams, firebasePath, $firebaseObject, cities, ethnicities, countries) {

    // should redirect if username empty in routeparams.username

   var ref = new Firebase (firebasePath + '/users/' + $routeParams.username);

   $scope.user = $firebaseObject(ref);  	

   $scope.cities = cities;
   $scope.ethnicities = ethnicities; 
   $scope.countries = countries;
   $scope.roles = roles;
   $scope.subjects = subjects;

   $scope.user.$loaded().then(function(user) {
    $scope.teachesStudies = 0 in Object.keys($scope.user.roles) ? 'Teaches' : 'Studies';
    $scope.notes = $firebaseArray(ref.child('notes'));
  });

   $scope.goToEdit = function() {
    $location.path('/profile_edit/' + $routeParams.username);
  };

  $scope.firebaseUrl = ref+ '/avatar';

  var jobsRef = new Firebase (firebasePath + '/jobs');

  var theJobs = $firebaseArray(jobsRef.orderByChild('clientID').equalTo($scope.user.$id));
  var teacherFor = $firebaseArray(jobsRef.orderByChild('teacherID').equalTo($scope.user.$id));

  $scope.jobKeys = [];
  $scope.teacherFor = [];

  theJobs.$loaded().then(function(jobs) {
    angular.forEach(jobs, function(value, key) {
      $scope.jobKeys.push(value);
    });
  })

  teacherFor.$loaded().then(function(jobs) {
    angular.forEach(jobs, function(value, key) {
        $scope.teacherFor.push(value);
    });
  })






 



  }]);
