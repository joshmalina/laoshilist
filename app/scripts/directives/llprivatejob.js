'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llPrivateJob
 * @description
 * # llPrivateJob
 */
angular.module('laoshiListApp')
  .directive('llPrivateJob', function ($firebaseArray, firebasePath) {

  	var jobs = $firebaseArray(new Firebase('https://' + firebasePath + '.firebaseio.com/jobs/'));

  	function link (scope, element, attrs) {

  		scope.removeJob = function (key) {
  			jobs.$remove(key).then(function(ref) {
	  			console.log('this job: ');
	  			console.log(ref);
	  			console.log(' was removed');
  			}).catch(function(error) {
  				console.log(error);
  			});
  		};
  	}

    return {
      templateUrl: 'views/templates/privateJob.html',
      restrict: 'E',
      scope: {
      	job: '=',
      	key: '='
      },
      link: link      
    };
  });
