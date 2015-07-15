'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobviewCtrl
 * @description
 * # JobviewCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('JobviewCtrl', ['jobs_', 'llConstants', 'User_', 'Job_', 'currentAuth', '$routeParams', '$scope', 'firebasePath', '$firebaseArray', '$cookies', '$location', function (jobs_, llConstants, User_, Job_, currentAuth, $routeParams, $scope, firebasePath, $firebaseArray, $cookies, $location) {
    
    // set job
    $scope.job = Job_($routeParams.jobid);

    // include the client's name 
    $scope.job.$loaded().then(function(job) {
        console.log(job);
        var client = User_(job.clientID);
        client.$loaded().then(function(client_) {
            $scope.job.clientName = client_.getFullestName();
        })

    })

    // if job does not exist, redirect
    // better if displayed some error message
    $scope.job.$loaded().then(function(ref) {
        if(ref.$value === null) {
            $location.path('/jobs');
        }
    });    

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
    $scope.jobs = jobs_('Needs Teacher');

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





}]);
