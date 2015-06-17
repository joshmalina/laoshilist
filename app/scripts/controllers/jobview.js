'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobviewCtrl
 * @description
 * # JobviewCtrl
 * Controller of the laoshiListApp
 */
angular.module('laoshiListApp')
  .controller('JobviewCtrl', ['$q', '$http', 'Upload', 'currentAuth', 'subjects', 'ages', '$routeParams', '$scope', 'firebasePath', '$firebaseObject', 'cities', '$firebaseArray', function ($q, $http, Upload, currentAuth, subjects, ages, $routeParams, $scope, firebasePath, $firebaseObject, cities, $firebaseArray) {
    
    // some message about not being able to find that certain job if nothing is returned from db for that job or id is not present

    var ref = new Firebase (firebasePath + '/jobs/' + $routeParams.jobid);

    $scope.userID = currentAuth.uid;
    $scope.job = $firebaseObject(ref);
    $scope.cities = cities;
    $scope.ages = ages;
    $scope.subjects = subjects;

    // this should be limited to ones that 'need teacher'
    // it should not include the current job
    var jobsRef = new Firebase (firebasePath + '/jobs/');

    $scope.jobs = $firebaseArray(jobsRef);

    $scope.upload = function (files) {

        if(files && files.length) {



            $http.get('http://localhost:3000/api/sign').then(function(resp) {
            console.log(resp);

            var d_completed = $q.defer(); // since I'm working with Angular, I use $q for asynchronous control flow, but it's not mandatory
            var xhr = new XMLHttpRequest();
            xhr.file = files[0]; // not necessary if you create scopes like this

            xhr.onreadystatechange = function(e) {
              if ( 4 == this.readyState ) {
                // done uploading! HURRAY!
                d_completed.resolve(true);
              }
            };
            xhr.open('PUT', resp.signed_request, true);
            xhr.setRequestHeader("Content-Type","application/octet-stream");
            xhr.send(xhr.file);

        });



        }
        
        // if (files && files.length) {
        //     for (var i = 0; i < files.length; i++) {
        //         var file = files[i];
        //         Upload.upload({
        //             url: 'http://localhost:3000/api/sign',
        //             //fields: {'username': $scope.username},
        //             file: file
        //         }).progress(function (evt) {
        //             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //             console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        //         }).success(function (data, status, headers, config) {
        //             console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        //         });
        //     }
        // }
    };



  }]);
