'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobviewCtrl
 * @description
 * # JobviewCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('JobviewCtrl', ['jobs__', 'llConstants', 'User_', 'Job_', 'currentAuth', '$routeParams', '$scope', 'firebasePath', '$firebaseArray', '$cookies', '$location', function (jobs__, llConstants, User_, Job_, currentAuth, $routeParams, $scope, firebasePath, $firebaseArray, $cookies, $location) {
    
    // set job
    var jobq = Job_($routeParams.jobid);
    jobq.then(function(job) {
        if (job == null) $location.path('/jobs');
        console.log(job.data[0]);
        $scope.job = job.data[0];
    });

    // // include the client's name -- if there is one
    // $scope.job.then(function(job) {
    //     if(job.clientID) {
    //         var client = User_(job.clientID);
    //         client.$loaded().then(function(client_) {
    //             $scope.job.clientName = client_.getFullestName();
    //         })
    //     }
    // })

    // if logged in
    if(currentAuth) {
        // set user
        $scope.user = User_(currentAuth.uid);  
    // if previously applied without logging in     
    } else if ($cookies.get('applicant_id')) {
        // set user
        $scope.user = User_($cookies.get('applicant_id'));
        // $scope.applicant.name = $scope.user.firstName;
        // $scope.applicant.email = $scope.user.email;        
    }

    // if any kind of user
    if($scope.user) {
        // check to see if admin
        $scope.user.$loaded().then(function() {
            $scope.isAdmin = $scope.user.isAdmin();
        });
    }

    $scope.edit = function() {
        $location.path('/job-edit/' + $routeParams.jobid);
    }


    function alreadyApplied() {

        // if a logged in user already applied
        $scope.user.$loaded.then(function() {
            $scope.alreadyApplied = $scope.user.hasApplied($routeParams.jobid);
        });

        // if a user who is not logged in already applied
    }

    
    

    $scope.status = llConstants.jobstatus();
    $scope.cities = llConstants.cities();
    $scope.ages = llConstants.ages();
    $scope.subjects = llConstants.subjects();

    var jobsq = jobs__.getJobs();
    jobsq.then(function(jobs) {
        $scope.jobs = jobs.data;
    })

 





}]);
