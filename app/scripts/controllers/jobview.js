'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobviewCtrl
 * @description
 * # JobviewCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('JobviewCtrl', ['User_', 'Job_', 'Jobs', 'Upload', 'currentAuth', 'subjects', 'ages', '$routeParams', '$scope', 'cities', 'laoshiListApi', 'firebasePath', '$firebaseArray', function (User_, Job_, Jobs, Upload, currentAuth, subjects, ages, $routeParams, $scope, cities, laoshiListApi, firebasePath, $firebaseArray) {

    // some message about not being able to find that certain job if nothing is returned from db for that job or id is not present

    // some logic if no user is present

    if(currentAuth) {
        $scope.user = User_(currentAuth.uid);
    }
    
    $scope.job = Job_($routeParams.jobid);

    $scope.job.$loaded().then(function(j) {
        console.log(j);
    });

    // might be able to factor this into a larger object with properties: cities, ages, subjects
    // or a service that gets only the constants you want
    $scope.cities = cities;
    $scope.ages = ages;
    $scope.subjects = subjects;

    // $scope.manipCV = function() {
    //     if($scope.applicant.name && $scope.appicant.email $$ applicationForm.email.$valid) {
    //         return true;
    //     }
    // }

    $scope.applicant = {};

    $scope.y = function() {
        console.log($scope.applicant);
    };

    // this should be limited to ones that 'need teacher'
    $scope.jobs = Jobs();

    $scope.alerts = [];

    $scope.deleteCV = function () {        

        // remove file from s3
        // how to identify it?
        // laoshiListApi.deleteCV(user.cv).then(function(response) {
            // remove reference from firebase
            // $scope.job.cv = null;
            // $scope.job.$save().then(function() {
            //     $scope.alerts.push({type:'success', msg: 'Your cv was succesfully deleted'});
            // })

        //}, function(error) {
        //     $scope.alerts.push({type:'danger', msg: 'Your cv could not be deleted at this time'});

        // }, function(update) {
        //     $scope.alerts.push({type: 'info', msg: 'Attempting to delete your cv'});
        // })
}

$scope.upload = function (files) {

        if(!$scope.user) {

            // if this is a new user, we need to create one first
            var ref = new Firebase (firebasePath + '/users');
            var users = $firebaseArray(ref);

            // need to have write permissions here

            users.$add({
                firstName: $scope.applicant.name,
                email:$scope.applicant.email
            }).then(function(ref) {
                var id = ref.$key();
                // upload CV
                uploadCV(id);

                // send them an email that they have succesffuly uploaded their cv?

            });

        } else {

            uploadCV($scope.user.$id);
        }

        

        function uploadCV (iddd) {

            laoshiListApi.uploadCV(files, id).then(function(url) {

            // store in firebase
            $scope.user.cv = url;
            $scope.user.$save();

            // success
            $scope.alerts.push({type:'success', msg:'Your cv has been uploaded: <a target = "blank_" href="' + url + '">' + url + '</a>'});

            }, function(error) {
                // push an alert
                $scope.alerts.push({type:'danger', msg: error});
                //$scope.path_to_cv = null;
            }, function(update) {
                // push an update
                $scope.alerts.push({type:'info', msg:update});
            });

        }



        // $scope.alerts.push({type:'info', msg:'Attempting to upload your CV'});        

        // laoshiListApi.uploadCV(files, $scope.user.$id).then(function(url) {

        //     // store in firebase
        //     $scope.user.cv = url;
        //     $scope.user.$save();

        //     // success
        //     $scope.alerts.push({type:'success', msg:'Your cv has been uploaded: <a target = "blank_" href="' + url + '">' + url + '</a>'});

        // }, function(error) {
        //     // push an alert
        //     $scope.alerts.push({type:'danger', msg: error});
        //     //$scope.path_to_cv = null;
        // }, function(update) {
        //     // push an update
        //     $scope.alerts.push({type:'info', msg:update});
        // });
        
    };

    $scope.apply = function() {


        // if user
            // already have a first name presumably
            // already have an email address
            // may or may not have a cv

        // !if user
            // maybe ask if they just want to sign in

            // check for first name
            // check for email
            // maybe ask for a password
            // maybe check for cv

            // register the user
            // send a welcome email
            // then add as an applicant
            // try and upload a resume
            // send an email 


        }

    }]);
