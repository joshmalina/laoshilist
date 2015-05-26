'use strict';

/**
 * @ngdoc directive
 * @name laoshiListApp.directive:contactInfo
 * @description
 * # contactInfo
 */
angular.module('laoshiListApp')
  .directive('contactInfo', ['$firebaseObject', 'firebasePath', function ($firebaseObject, firebasePath) {

  	function link (scope) {
  		var ref = new Firebase (firebasePath + '/users');
  		scope.contact = $firebaseObject(ref.child(scope.user).child('contact').child(scope.pos));  
  		scope.contact.$loaded().then(function() {
  			console.log(scope.contact)
  		});
  	}


    return {
      templateUrl: 'views/templates/contactInfo.html',
      restrict: 'E',
      scope: {
      	user: '@',
      	pos:'@'
      },
      link: link
    };
  }]);
