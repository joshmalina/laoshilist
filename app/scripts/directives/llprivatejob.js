'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:llPrivateJob
 * @description
 * # llPrivateJob
 */
angular.module('laoshiListApp')
  .directive('llPrivateJob', function ($firebaseArray, firebasePath) {

  	function link (scope, element, attrs) {

  		var ref = new Firebase('https://' + firebasePath + '.firebaseio.com/jobs');
  		var jbs = $firebaseArray(ref);
  		console.log(jbs);

  		scope.jbs = jbs;

  		// jobs.$load(function(a) { 
  		// 	console.log(a);
  		// });


  		scope.save = function(k) {
  			jbs.$save(k);
  		};
  		// scope.save = function (key) {
  		// 	jobs.$save(key).then(function(ref) {
  		// 		console.log(ref);
  		// 	}).catch(function(e) {
  		// 		console.log(e);
  		// 	});
  		// };

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
