'use strict';

/**
 * @ngdoc function
 * @name laoshiListApp.controller:JobviewCtrl
 * @description
 * # JobviewCtrl
 * Controller of the laoshiListApp
 */
 angular.module('laoshiListApp')
 .controller('JobviewCtrl', ['apply', 'Users_', 'llConstants', 'User_', 'Job_', 'Jobs', 'Upload', 'currentAuth', '$routeParams', '$scope', 'laoshiListApi', 'firebasePath', '$firebaseArray', function (apply, Users_, llConstants, User_, Job_, Jobs, Upload, currentAuth, $routeParams, $scope, laoshiListApi, firebasePath, $firebaseArray) {

    // some message about not being able to find that certain job if nothing is returned from db for that job or id is not present

    if(currentAuth) {
        $scope.user = User_(currentAuth.uid);
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

    $scope.cities = llConstants.cities();
    $scope.ages = llConstants.ages();
    $scope.subjects = llConstants.subjects();

    $scope.applicant = {};

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



function addNewUser () {

    var data = {
        firstName: $scope.applicant.name,
        email: $scope.applicant.email
    }

    return users.$add(data);
}

function uploadCV (id, files) {

    laoshiListApi.uploadCV(files, id).then(function(url) {

        if(!$scope.user) {
            $scope.user = User_(id);
        } 

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

$scope.upload = function (files) {   

    $scope.alerts.push({type: 'info', msg: 'Attempting to upload your CV...'});

    if(!$scope.user) {
        addNewUser().then(function(ref) {
            uploadCV(ref.key(), files)
        });

    } else {      
        uploadCV($scope.user.$id, files);
    }        

};

$scope.doneApplied = 'Submit';

function addApplicant () {

    $scope.alerts.push({type:'success', msg: 'Attempting to submit application...'});

    var coverLetter = null;
    if($scope.applicant.why) {
        coverLetter = {
            text: $scope.applicant.why,
            type: 'text/plain'
        }
        // call laoshilist API, when returns add url to firebase
    }
   

    apply.addApplicant($scope.user.$id, $scope.job.$id, coverLetter).then(
        function(success) {
            console.log(success);
            $scope.alerts.push({type:'success', msg: 'Your job application has been submitted'});
            $scope.doneApplied = 'Thanks for applying!';
        }, function(error) {
            // would like to keep a log of this error, it's informative
            console.log(error);
            // probably also alert the admins of this error
            $scope.alerts.push({type:'warning', msg: 'Unable to submit job applicant'});
        }
    );
}

$scope.apply = function() {

    if(!$scope.user) {
        addNewUser().then(function(ref) {
            var id = ref.key();
            $scope.user = User_(id);
            addApplicant();
        });
    } else {
        addApplicant();
    }
}

}]);
