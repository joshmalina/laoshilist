'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobviewCtrl
 * @description
 * # JobviewCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('JobviewCtrl', ['$q', '$http', 'Upload', 'currentAuth', 'subjects', 'ages', '$routeParams', '$scope', 'firebasePath', '$firebaseObject', 'cities', '$firebaseArray', 'laoshiListApi', function ($q, $http, Upload, currentAuth, subjects, ages, $routeParams, $scope, firebasePath, $firebaseObject, cities, $firebaseArray, laoshiListApi) {

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

    $scope.showPath = false;

    $scope.upload = function (files) {

        // if(files && files.length) {

        //     var file = files[0];
        //     console.log(file.type);
        //     console.log(file);

        //     $http.get('http://localhost:3000/api/sign?file_name=' + file.name + '&file_type=' + file.type + '&userID=' + $scope.userID).then(function(resp) {
               
        //         $scope.d_completed = $q.defer(); // since I'm working with Angular, I use $q for asynchronous control flow, but it's not mandatory
        //         var xhr = new XMLHttpRequest();
        //         xhr.addEventListener("error", transferFailure, false);
        //         xhr.file = files[0]; // not necessary if you create scopes like this

        //         xhr.onreadystatechange = function(e) {
        //             console.log(this.readyState);
        //             if(this.readyState === 4) {
        //                 // assign path to view
        //                 $scope.path_to_cv = resp.data.url_;        
        //                 // make sure it updates   
        //                 $scope.$apply();
        //             }
        //             if ( 4 == this.readyState ) {

        //                 // done uploading! HURRAY!
        //                 //$scope.showPath = true;
        //                 $scope.d_completed.resolve(resp.data.url_);
        //             }                    
        //         };
        //         //var r = "https://laoshi-list-avatars.s3.amazonaws.com/tits?AWSAccessKeyId=AKIAIS6GSDKG5D6G3CTQ&Expires=1434634512&Signature=4GwljlorTNAJz17V4FrDFaCfh0E%3D&x-amz-acl=public-read";
        //         xhr.open('PUT', resp.data.signed_request, true);

        //         function transferFailure(evt) {
        //             console.log(evt);
        //         }
        //         // either leave this blank of match the content type of the subsequent put
        //         //xhr.setRequestHeader("Content-Type","application/octet-stream");
        //         xhr.send(xhr.file);    

        //     })
        // }

        laoshiListApi.uploadCV(files, $scope.userID).then(function(url) {
            $scope.path_to_cv = url;
        }, function(error) {
            // push an alert
        }, function(update) {
            // push an update
        });

        // (function(url) {
        //     = url;
        //     $scope.$apply();
        // });
    };

}]);
