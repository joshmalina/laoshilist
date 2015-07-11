'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:apply
 * @description
 * # apply
 */
 angular.module('laoshiListApp')
 .directive('apply', ['Job_', 'User_', 'laoshiListApi', 'users', 'apply', function (Job_, User_, laoshiListApi, users, apply) { 	

 	
 	
 	

 	// checks to see if we have a user, and if not, updates userID
 	// a getter and setter method
 	function getUserId() {

 		if(userID === null) {
 			users.addNew(scope.applicant.firstName, scope.applicant.email).then(function(ref) {
 				userID = ref.key();
 				return ref.key();
 			})
 		} else {
 			return userID;
 		}

 	}

 	// update the firebase DB with a link to the CV in S3
 	function updateUserCV(id, cvURL) {
 		var user = User_(id);
 		user.cv = cvURL;
 		return user.$save();
 	}

 	// main set of functions
 	function link (scope) {


 		// the applicant may not be logged in or have an account
 		var userID = scope.userID || null;

 		if(userID) {
 			scope.user = User_(userID);
 		}

 		// all alerts start empty
 		scope.alerts = [];

 		// our original, empty applicant
 		scope.applicant = {};

 		// hold the value of the button, which will change
 		scope.doneApplied = 'Submit';

 		// uploads CVs for all users extant and otherwise
 		scope.uploadCV= function(cv) {

 			if(scope.alerts.length === 0) {
 				scope.alerts.push({type: 'info', msg: 'Attempting to upload your CV...'});
 			}

 			var userID = getUserId();

 			laoshiListApi.uploadCV(cv, userID).then(

 				function(cvURL) {
	 				
	 				updateUserCV(userID, cvURL).then(function() {
	 					scope.alerts.push({type:'success', msg:'Your cv has been uploaded: <a target = "blank_" href="' + cvURL + '">' + cvURL + '</a>'});
	 				}, function(error) {
	 					scope.alerts.push({type:'danger', msg: 'link to cv not saved'});
	 				});

 				}, function(error) {
 					scope.alerts.push({type: 'danger', msg: error});
 				}
			)
		}

 		// calls methods that log the applicant and email him/her
 		scope.apply = function() {

 			scope.alerts.push({type:'success', msg: 'Attempting to submit application...'});   

 			if(scope.applicant.why) {
 				var coverLetter = {
 					text: scope.applicant.why,
 					type: 'text/plain'
 				}
 			}

 			var userID = getUserId();

 			apply.addApplicant(userID, scope.jobID, coverLetter).then(
 				function(success) {
 					//$scope.alerts.splice(0,1);
            		scope.alerts.push({type:'success', msg: 'Your job application has been submitted'});
            		scope.doneApplied = 'Thanks for applying!';
 				}, function(error) {
 					console.log(error);
 					scope.alerts.push({type:'warning', msg: 'Unable to submit job applicant'});

 				}
			)
 		}

 	}

 	return {
 		templateUrl: 'views/templates/apply.html',
 		restrict: 'E',
 		scope: {
 			jobID: '=',
 			userID: '='
 		},
 		link: link
 	}

 }]);






