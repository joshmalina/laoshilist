'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:apply
 * @description
 * # apply
 */
 angular.module('laoshiListApp')
 .directive('apply', ['Job_', 'User_', 'laoshiListApi', 'users', 'apply', '$q', function (Job_, User_, laoshiListApi, users, apply, $q) { 	

 	
 	
 	

 	

 	// update the firebase DB with a link to the CV in S3
 	function updateUserCV(id, cvURL) {
 		var user = User_(id);
 		user.cv = cvURL;
 		return user.$save();
 	}

 	// main set of functions
 	function link (scope) {

 		// checks to see if we have a user, and if not, updates userID
	 	// a getter and setter method
	 	function getUserId() {

	 		var defer = $q.defer();

	 		if(scope.userid) {
	 			defer.resolve(scope.userid);
	 		}
	 		
 			users.addNew(scope.applicant.name, scope.applicant.email).then(function(ref) {
 				scope.userid = ref.key();
 				defer.resolve(ref.key());
 			}, function(error) {
 				defer.reject(error);
 				console.log(error);
 			})
	 		

	 		return defer.promise;

	 	}	
 		

 		if(scope.userid) {
 			scope.user = User_(scope.userid);
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

 			getUserId().then(function(userID) {

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


 			})


 			
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

 			getUserId().then(function(userid) {

 				apply.addApplicant(userid, scope.jobid, coverLetter).then(
	 				function(success) {
	 					//$scope.alerts.splice(0,1);
	            		scope.alerts.push({type:'success', msg: 'Your job application has been submitted'});
	            		scope.doneApplied = 'Thanks for applying!';
	 				}, function(error) {
	 					console.log(error);
	 					scope.alerts.push({type:'warning', msg: 'Unable to submit job applicant'});

	 				}
				)

 			});

 			
 		}

 	}

 	return {
 		templateUrl: 'views/templates/apply.html',
 		restrict: 'E',
 		scope: {
 			jobid: '=',
 			userid: '='
 		},
 		link: link
 	}

 }]);






