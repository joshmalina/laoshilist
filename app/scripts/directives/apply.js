'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:apply
 * @description
 * # apply
 */
 angular.module('laoshiListApp')
 .directive('apply', ['Job_', 'User_', 'laoshiListApi', 'users', 'apply', '$q', '$cookies', function (Job_, User_, laoshiListApi, users, apply, $q, $cookies) { 	

 	// update the firebase DB with a link to the CV in S3
 	function updateUserCV(id, cvURL) {
 		var user = User_(id);
 		user.cv = cvURL;
 		return user.$save();
 	}

 	// main set of functions
 	function link (scope) {

 		// our original, empty applicant
 		scope.applicant = {};

 		function emailExists(email) {
 			console.log(email);
 			scope.extantID = users.emailExists(email);
 			return scope.extantID;
		};
 		
	 	/*
	 	 * checks to see if we have a user; if so, returns its userid; 
	 	 * if not, creates a new user, returning the userid; would like
	 	 * this to set a cookie so that if they apply to more than one job
	 	 * in the same session without logging in, 
	 	 * 1) we won't be creating multiple user accounts for the same user
	 	 * 2) they won't have to reinput their name, email address and cv (if uploaded)
	 	 */
	 	function getUserId() {

	 		var defer = $q.defer();

	 		// we already have a user
	 		if(scope.userid) {

	 			defer.resolve(scope.userid);

	 		} else {

	 			// of course, this allows people to apply for jobs in someone else's name, as long as they know their email address
	 			// but i think this is probabyl a problem everywhere

	 			// we probably, however, should not set a cookie, because in that case the person would probably have access to the CV of
	 			// whoever's email address the record is attached to

	 			// check if this email has been used before, before doing anything else
	 			users.emailExists(scope.applicant.email).then(function(userid) {
	 				// if it has, use it
	 				defer.resolve(userid);

 				// if it hasn't, we've never seen this guy before
	 			}, function() {

			 		// make a new user
		 			users.addNew(scope.applicant.name, scope.applicant.email).then(function(ref) {
		 				// set to scope for next time this is called
		 				scope.userid = ref.key();
		 				// set a cookie with this information
		 				// consider the length of this cookie -- currently for a single session
		 				$cookies.put('applicant_id', ref.key());
		 				// resolve the promise on the new id
		 				defer.resolve(ref.key());
		 			}, function(error) {
		 				defer.reject(error);
		 			})
	 			})

	 			

	 		}	 			 		
	 		
 			// return the promise 
	 		return defer.promise;

	 	}	
 		

 		if(scope.userid) {
 			scope.user = User_(scope.userid);
 		}

 		// all alerts start empty
 		scope.alerts = [];

 		

 		// hold the value of the button, which will change
 		scope.doneApplied = 'Submit';

 		// uploads CVs for all users extant and otherwise
 		scope.uploadCV = function(cv) {

 			if(cv.length < 1) {
 				return;
 			}

 			if(scope.alerts.length === 0) {
 				scope.alerts.push({type: 'info', msg: 'Attempting to upload your CV...'});
 			}

 			getUserId().then(function(userID) {
 				laoshiListApi.uploadCV(cv, userID).then(function(cvURL) {
 					scope.alerts.push({type:'success', msg:'Your cv has been uploaded: <a target = "blank_" href="' + cvURL + '">' + cvURL + '</a>'});
				}, 
 				function(error) {
 					scope.alerts.push({type:'danger', msg: 'cv not uploaded'});
 				}	
			)})
		}
		
		 				
		//  				updateUserCV(userID, cvURL).then(function() {
		//  					scope.alerts.push({type:'success', msg:'Your cv has been uploaded: <a target = "blank_" href="' + cvURL + '">' + cvURL + '</a>'});
		//  				}, function(error) {
		//  					scope.alerts.push({type:'danger', msg: 'link to cv not saved'});
		//  				});

	 // 				}, function(error) {
	 // 					scope.alerts.push({type: 'danger', msg: error});
	 // 				}
		// 		)


 	// 		})


 			
		// }

 		// calls methods that log the applicant and email him/her
 		scope.apply = function() {

 			scope.alerts.push({type:'success', msg: 'Attempting to submit application...'});   

 			if(scope.applicant.why) {
 				var coverLetter = {
 					text: scope.applicant.why || '',
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






