'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:notes
 * @description
 * # notes
 */
 angular.module('laoshiListApp')
 .directive('notes', ['Auth', 'fbMethods', function (Auth, fbMethods) {

 	function link(scope) {

 		var authObj = Auth.$getAuth();

 		// takes a new note object
 		// scope.notes should be a $firebaseArray
 		scope.pushNote = function(newNote) {
 			scope.notes.$add({
 				value: newNote,
 				user: authObj.password.email,
 				date: fbMethods.getTime()
 			})
 			scope.newNote = null;
 		};

 	}

 	return {
 		templateUrl: '/views/templates/notes.html',
 		restrict: 'E',
 		scope: {
 			notes: '=',
 			canAdd: '='
 		},
 		link: link
 	};
 }]);
