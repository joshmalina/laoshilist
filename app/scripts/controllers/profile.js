'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('ProfileCtrl', ['User_', 'llConstants', '$firebaseArray', '$q', '$scope', '$location', '$routeParams', 'firebasePath', '$firebaseObject', function (User_, llConstants, $firebaseArray, $q, $scope, $location, $routeParams, firebasePath, $firebaseObject) {

    // should redirect if username empty in routeparams.username

   var ref = new Firebase (firebasePath + '/users/' + $routeParams.username);

   $scope.user = $firebaseObject(ref);  	

   $scope.cities = llConstants.cities();
   $scope.ethnicities = llConstants.ethnicities(); 
   $scope.countries = llConstants.countries();
   $scope.roles = llConstants.roles();
   $scope.subjects = llConstants.subjects();

   $scope.user.$loaded().then(function(user) {
    $scope.teachesStudies = 0 in Object.keys($scope.user.roles) ? 'Teaches' : 'Studies';
    $scope.notes = $firebaseArray(ref.child('notes'));
  });

   $scope.goToEdit = function() {
    $location.path('/profile_edit/' + $routeParams.username);
  };  

  $scope.user_ = User_($routeParams.username);

  $scope.user_.$loaded().then(function(u) {    
    $scope.user_.appliedTo_().then(function(jobs) {
      $scope.appliedFor = jobs;
    })
  }); 


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
