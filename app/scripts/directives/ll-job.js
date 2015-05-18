'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llJob
 * @description
 * # llJob
 */
angular.module('laoshiListApp')
  .directive('llJob', function (jobStatus, subjects, cities, ages, $firebaseArray, firebasePath, $firebaseObject) {
  	
  	function link (scope, element, attrs) {

  		// get our job object from firebase
      var ref = new Firebase(firebasePath + '/jobs/' + scope.job.$id);

  		// make available to scope
  		scope.job_ = $firebaseObject(ref);

    	scope.save = function() {
    		scope.job_.dateModified = Firebase.ServerValue.TIMESTAMP;
    		scope.job_.$save().catch(function(error) {
    			console.log('Couldn\'t update', error);
    		});
    	};

  		// make services available to view
  		scope.subjects = subjects;
  		scope.cities = cities;
  		scope.ages = ages;
  		scope.jobStatuses = jobStatus;

  		// config collapsable -- might refactor into a service
  		scope.isCollapsed = true;
  		scope.readMore = 'Read more';
  		scope.coll = function () {
  			scope.isCollapsed = !scope.isCollapsed;
  			scope.readMore = scope.isCollapsed ? 'Read more' : 'Read less';
  		};

  		// remove a job

  	}


    return {
      templateUrl: 'views/templates/job.html',
      restrict: 'E',
      scope: {
      	job: '=',
      	key: '='
      },
      link: link  
    };
  });
