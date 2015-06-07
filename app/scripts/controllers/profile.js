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

  var theJobs = $firebaseArray(jobsRef.orderByChild("clientID").equalTo($scope.user.$id));

  $scope.jobKeys = [];

  theJobs.$loaded().then(function(jobs) {
    console.log(jobs);
    angular.forEach(jobs, function(value, key) {
      $scope.jobKeys.push(value.$id);
    });
  })

  $scope.jobRef = function(jobKey) {
    return '<a ng-href="/jobView/'+jobKey+'"></a>';
  }



    // .on("value", function(snapshot) {
    //   var jobKeys = Object.keys(snapshot.val());
    //   console.log(jobKeys);
    //   jobKeys = $firebaseObject(snapshot.val());
    //   console.log(jobKeys)
    //   $scope.jobKeys = jobKeys;
    // });




  function a () {

    var jobsPromise = $q.defer();
    var jobs = [];


    jobsRef.orderByChild('clientID').on('value', function(snapshot) {

      snapshot.forEach(function(client) {
        var clientID = client.child('clientID').val();
        if(clientID === $scope.user.$id) {
          console.log(clientID);
          jobs.push(clientID);
        };
      });


    });

    return jobsPromise.resolve(jobs);
  }

  var get_jobs = function() {
    return a();
  }

  $scope.jobs = get_jobs();








  	// need to do some checking to make sure we got a user, else redirect


  }]);
