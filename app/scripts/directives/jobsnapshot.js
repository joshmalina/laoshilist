'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:jobSnapshot
 * @description
 * # jobSnapshot
 */
angular.module('laoshiListApp')
  .directive('jobSnapshot', ['Job_', 'cities', 'firebasePath', '$firebaseObject', function (Job_, cities, firebasePath, $firebaseObject) {

  	function link(scope) {
  		var ref = new Firebase (firebasePath + '/jobs/' + scope.job.$id);
  		scope.job = $firebaseObject(ref);
  	}


    return {
      templateUrl: 'views/templates/jobSnapshot.html',
      restrict: 'E',
      scope: {
      	job: '='
      },
      link: link
    };

  }]);
