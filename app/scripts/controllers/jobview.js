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

    // might be able to factor this into a larger object with properties: cities, ages, subjects
    // or a service that gets only the constants you want
    $scope.cities = cities;
    $scope.ages = ages;
    $scope.subjects = subjects;

    // this should be limited to ones that 'need teacher'
    $scope.jobs = Jobs();

    $scope.alerts = [];

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

}]);
