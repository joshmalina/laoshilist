'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobviewCtrl
 * @description
 * # JobviewCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('JobviewCtrl', ['User_', 'Job_', 'Jobs', 'Upload', 'currentAuth', 'subjects', 'ages', '$routeParams', '$scope', 'cities', 'laoshiListApi', function (User_, Job_, Jobs, Upload, currentAuth, subjects, ages, $routeParams, $scope, cities, laoshiListApi) {

    // some message about not being able to find that certain job if nothing is returned from db for that job or id is not present

    // some logic if no user is present
    
    $scope.user = User_(currentAuth.uid);
    $scope.job = Job_($routeParams.jobid);

    $scope.job.$loaded().then(function(j) {
        console.log(j);
    });

    // might be able to factor this into a larger object with properties: cities, ages, subjects
    // or a service that gets only the constants you want
    $scope.cities = cities;
    $scope.ages = ages;
    $scope.subjects = subjects;

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

        $scope.alerts.push({type:'info', msg:'Attempting to upload your CV'});        

        laoshiListApi.uploadCV(files, $scope.user.$id).then(function(url) {

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
        
    };

    $scope.apply = function() {

        if($scope.user) {
            
        }
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
