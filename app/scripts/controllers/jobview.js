'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobviewCtrl
 * @description
 * # JobviewCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('JobviewCtrl', ['jobs_', 'llConstants', 'User_', 'Job_', 'currentAuth', '$routeParams', '$scope', 'firebasePath', '$firebaseArray', 'fbMethods', function (jobs_, llConstants, User_, Job_, currentAuth, $routeParams, $scope, firebasePath, $firebaseArray) {

    // some message about not being able to find that certain job if nothing is returned from db for that job or id is not present

    if(currentAuth) {
        $scope.user = User_(currentAuth.uid);
        $scope.user.$loaded().then(function() {
            $scope.isAdmin = $scope.user.isAdmin();
        });
    } else {
        var ref = new Firebase (firebasePath + '/users');
        var users = $firebaseArray(ref);
    }

    function alreadyApplied() {

        // if a logged in user already applied
        $scope.user.$loaded.then(function() {
            $scope.alreadyApplied = $scope.user.hasApplied($routeParams.jobid);
        });

        // if a user who is not logged in already applied
    }

    
    
    $scope.job = Job_($routeParams.jobid);    

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
